// Core modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

// Globals
const STRIPE_SECRET_KEY = process.env.PORT ? process.env.STRIPE_SECRET_KEY : fs.readFileSync(`${__dirname}/private/stripe_secret_key.txt`).toString();
const PRINTFUL_API_KEY = process.env.PORT ? process.env.PRINTFUL_API_KEY : fs.readFileSync(`${__dirname}/private/printful_api_key.txt`).toString();
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Express app / Middleware
const app = express();
app.use(express.static(`${__dirname}/client/build`));
app.use(bodyParser.json({ limit: '1mb' }));


// Allow CORS requests locally
if (!process.env.PORT) {
  app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    methods: ['GET', 'POST'],
    credentials: true 
  }));
}

// API
app.post('/api/shipping-rate', (req, res) => {
  request({
    url: 'https://api.printful.com/shipping/rates',
    method: 'POST',
    headers: { 'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}` },
    json: true,
    body: {
      recipient: {
        address1: req.body.recipient.address1Shipping,
        city: req.body.recipient.cityShipping,
        country_code: 'US',
        state_code: req.body.recipient.stateShipping,
        zip: req.body.recipient.zipShipping
      },
      items: req.body.items
    }, 
  }, (error, response) => {
    if (error || (response && response.body && response.body.error)) {
      console.log('Prinful order error', error || response.body.error);
      return res.json({ error: error || response.body.error.message });
    }

    console.log('response', response.body.result);
    return res.json(response.body);
  });
});

app.post('/api/place-order', (req, res) => {

  // Create draft Printful order
  request({
    url: 'https://api.printful.com/orders',
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
      items: [{
        sync_variant_id: 1796349947,
        quantity: 1
      }]
    }
  }, (error, response) => {
    if (error || (response && response.body && response.body.error)) {
      console.log('Prinful order error', error || response.body.error);
      return res.json({ error: error || response.body.error.message });
    }

    console.log('response:', response.body.result);
    sendToStripe(response.body.result);
  });


  function sendToStripe(printfulRes) {

    // Create Stripe customer
    stripe.customers.create({
      description: `Customer - ${req.body.fields.email}`,
      source: req.body.token.id,
      name: `${req.body.fields.firstNameShipping} ${req.body.fields.lastNameShipping}`,
      email: req.body.fields.email,
      address: {
        line1: req.body.fields.address1Shipping,
        line2: req.body.fields.address2Shipping,
        city: req.body.fields.cityShipping,
        state: req.body.fields.stateShipping,
        postal_code: req.body.fields.zipShipping,
        country: 'US'
      }
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
          subtotalCharge: printfulRes.costs.subtotal,
          shippingCharge: printfulRes.costs.shipping,
          taxCharge: printfulRes.costs.tax
        },
        amount: Math.ceil((printfulRes.costs.total) * 100),
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

// Start server
app.listen(process.env.PORT || 8081, () => {
  console.log('App listening on port 8081');
});