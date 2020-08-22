// Core modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const admin = require('firebase-admin');
const favicon = require('serve-favicon');
const sendOrderSuccessEmail = require('./mailer/send-order-success-email.js'); 
const $ = require('cheerio');

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
app.use(favicon(`${__dirname}/client/public/favicon.ico`));


// Force HTTPS redirect
// Always force "https://www."
if (process.env.PORT) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' || !req.header('host').includes('www.')) {
      res.redirect(301, `https://www.${req.header('host').replace('www.', '')}${req.url}`);
    } else next();
  });
}
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
  if (/^\/api\//.test(req.originalUrl)) next();
  else if (/\/item\//.test(req.originalUrl)) updateMetaTags(req, res);
  else res.sendFile(`${__dirname}/client/dist/index.html`);
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

        // Use https://api.printful.com/orders/{id}/confirm when ready
        if (process.env.PORT) {
          console.log('Confirming Printful order...');

          request({
            url: `https://api.printful.com/orders/${charge.metadata.orderID}/confirm`,
            method: 'POST',
            headers: { 'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}` },
            json: true,
          }, (error, response) => {
            if (error || (response && response.body && response.body.error)) {
              console.log('Printful confirm order error', error || response.body.error);
              return res.json({ error: error || response.body.error.message });
            }
            
            console.log('SUCCESS - Printful order confirmed!');
            sendOrderSuccessEmail(charge.receipt_email, charge.metadata.orderID);
            res.json({ charge });
          });

        } else {
          console.log('SUCCESS - send Printful draft order to fulfillment!');
          res.json({ charge });
        }
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

async function updateMetaTags(req, res) {

  // First get and parse products array from app src
  const productsText = await fs.promises.readFile(`${__dirname}/client/src/model/products.js`, 'utf-8');
  const startPos = productsText.search(/\[/);
  const endPos = productsText.lastIndexOf('];') + 1;
  const trimmedSnippetText = productsText.substring(startPos, endPos);
  const stringifiedProducts = JSON.stringify(eval('(' + trimmedSnippetText + ')'));
  const productsArr = JSON.parse(stringifiedProducts);

  // Retrieve product object that includes the current URL item id
  const productID = req.originalUrl.substring(req.originalUrl.indexOf('/item/')).replace('/item/', '');
  const productObj = productsArr.find(product => product.id == productID);

  // Return base file if requested page is not a PDP
  const baseFile = `${__dirname}/client/dist/index.html`;
  if (!productObj) return res.sendFile(baseFile);

  // Update the meta tag properties in the built bundle
  const baseHTML = await fs.promises.readFile(baseFile, 'utf-8');
  const tempHTML = baseHTML.replace('<html lang=en>', '<article>').replace('</html>', '</article>');
  const $base = $(tempHTML);

  console.log('title', productObj.title);
  console.log('image', productObj.colors[0].colorImage);
  console.log('description', productObj.description);

  $base.find('meta[property=og\\:url]').attr('content', `https://${req.get('host')}${req.originalUrl}`);
  $base.find('meta[property=og\\:title]').attr('content', productObj.title);
  $base.find('meta[property=og\\:image]').attr('content', productObj.ogImage);
  $base.find('meta[property=og\\:description]').attr('content', productObj.description);

  console.log('WHAT IS IT', $base.find('meta[property=og\\:url]').attr('content'));
  console.log('---', $.html($base));

  // Send the modified HTML as the response
  res.send($.html($base));
}