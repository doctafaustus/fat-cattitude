// Core modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const admin = require('firebase-admin');

// Globals
const STRIPE_SECRET_KEY = process.env.PORT ? process.env.STRIPE_SECRET_KEY : fs.readFileSync(`${__dirname}/private/stripe_secret_key.txt`).toString();
const PRINTFUL_API_KEY = process.env.PORT ? process.env.PRINTFUL_API_KEY : fs.readFileSync(`${__dirname}/private/printful_api_key.txt`).toString();
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Cloudstore config
let serviceAccount = process.env.SERVICE_ACCOUNT_KEY;
if (!process.env.PORT) {
  serviceAccount = require('./private/serviceAccountKey.json');
} else {
  serviceAccount = JSON.parse(serviceAccount);
}
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Express app / Middleware
const app = express();
app.use(express.static(`${__dirname}/client/dist`));
app.use(bodyParser.json({ limit: '1mb' }));


// Allow CORS requests locally
if (!process.env.PORT) {
  app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    methods: ['GET', 'POST'],
    credentials: true 
  }));
}

// Keep paths using the index.html file on direct route hits
app.use('/*', (req, res, next) => {
  if (/^\/api\//.test(req.originalUrl)) {
    next();
  } else {
    res.sendFile(`${__dirname}/client/dist/index.html`);
  }
});


// API
app.post('/api/estimate-costs', (req, res) => {
  console.log('/api/estimate-costs');

  request({
    url: 'https://api.printful.com/orders/estimate-costs',
    method: 'POST',
    headers: { 'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}` },
    json: true,
    body: {
      recipient: {
        name: `${req.body.fields.firstNameShipping} ${req.body.fields.lastNameShipping}`,
        address1: req.body.fields.address1Shipping,
        address2: req.body.fields.address2Shipping,
        city: req.body.fields.cityShipping,
        state_code: req.body.fields.stateShipping,
        country_code: 'US',
        zip: req.body.fields.zipShipping
      },
      items: req.body.items
    }
  }, (error, response) => {
    if (error || (response && response.body && response.body.error)) {
      return res.json({ error: error || response.body.error.message });
    }
    return res.json(response.body);
  });
});


app.post('/api/place-order', (req, res) => {
  console.log('/api/place-order');

  const sameAddress = req.body.sameAddress;

  // Create draft Printful order
  request({
    url: 'https://api.printful.com/orders',
    method: 'POST',
    headers: { 'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}` },
    json: true,
    body: {
      recipient: {
        email: req.body.fields.email,
        name: `${req.body.fields.firstNameShipping} ${req.body.fields.lastNameShipping}`,
        address1: req.body.fields.address1Shipping,
        address2: req.body.fields.address2Shipping,
        city: req.body.fields.cityShipping,
        state_code: req.body.fields.stateShipping,
        country_code: 'US',
        zip: req.body.fields.zipShipping
      },
      items: req.body.items
    }
  }, (error, response) => {
    if (error || (response && response.body && response.body.error)) {
      console.log('Prinful order error', error || response.body.error);
      return res.json({ error: error || response.body.error.message });
    }

    sendToStripe(response.body.result, sameAddress, req.body.fields);
  });


  function sendToStripe(printfulRes, sameAddress, fields) {

    let name;
    let address;

    if (sameAddress) {
      name = `${fields.firstNameShipping} ${fields.lastNameShipping}`;
      address = {
        line1: fields.address1Shipping,
        line2: fields.address2Shipping,
        city: fields.cityShipping,
        state: fields.stateShipping,
        postal_code: fields.zipShipping,
        country: 'US'
      };
    } else {
      name = `${fields.firstNameBilling} ${fields.lastNameBilling}`;
      address = {
        line1: fields.address1Billing,
        line2: fields.address2Billing,
        city: fields.cityBilling,
        state: fields.stateBilling,
        postal_code: fields.zipBilling,
        country: 'US'
      };
    }

    // Create Stripe customer
    stripe.customers.create({
      name,
      address,
      description: `Customer - ${fields.email}`,
      source: req.body.token.id,
      email: fields.email
    }, (error, customer) => {
      if (error) {
        console.log('Stripe customer error', error);
        return res.json({ error });
      }

      // Create new Stripe charge
      stripe.charges.create({
        description: `Charge - ${req.body.fields.email}`,
        metadata: { 
          orderID: printfulRes.id,
          shippingMethod: printfulRes.shipping,
          orderURL: printfulRes.dashboard_url,
          subtotalCharge: printfulRes.retail_costs.subtotal,
          shippingCharge: printfulRes.costs.shipping,
          taxCharge: printfulRes.costs.tax,
          total: printfulRes.retail_costs.total,
          name: customer.name,
          address1: customer.address.line1,
          address2: customer.address.line2,
          city: customer.address.city,
          state: customer.address.state,
          zip: customer.address.postal_code
        },
        amount: Math.ceil((printfulRes.retail_costs.total) * 100),
        currency: 'USD',
        customer: customer.id,
        receipt_email: req.body.fields.email
      }, (error, charge) => {
        if (error) {
          console.log('Stripe charge error', error);
          return res.json({ error });
        } 

        console.log('SUCCESS - send Printfuldraft order to fulfillment!');
        // Use https://api.printful.com/orders/{id}/confirm when ready

        res.json({ charge });
      });
    });
  }
});


app.get('/api/order-confirmation', (req, res) => {
  console.log('/api/order-confirmation');

  const { orderID, chargeID } = req.query;

  request({
    url: `https://api.printful.com/orders/${orderID}`,
    method: 'GET',
    headers: { 'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}` },
    json: true,
  }, (error, response) => {
    if (error || (response && response.body && response.body.error)) {
      console.log('Prinful order error', error || response.body.error);
      return res.json({ error: error || response.body.error.message });
    }

    stripe.charges.retrieve(chargeID, (err, charge) => {
      res.json({ charge, order: response.body.result });
    });
  });
});


app.post('/api/newsletter', (req, res) => {
  console.log('/api/newsletter');

  const { email } = req.body;
  
  db.collection('newsletter').doc(email).set({ email })
  .then(() => {
    res.json({ success: true });
  })
  .catch(e => {
    console.log('Error writing document:', e);
    res.json({ error: true });
  });
});

// Start server
app.listen(process.env.PORT || 8081, () => {
  console.log('App listening on port 8081');
});