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
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true 
  }));
}

// API
app.post('/api/place-order', (req, res) => {

  console.log('fields', req.body.fields);

  // From old RS code
  // stripe.customers.create({
  //   description: 'Customer for ' + req.body.stripeEmail,
  //   source: req.body.stripeToken,
  //   email: req.body.stripeEmail,
  // }, function(err, customer) {
  //   if (err) console.log(err);
  //   console.log(customer);

  //   stripe.charges.create({
  //     amount: 499,
  //     currency: 'usd',
  //     customer: customer.id,
  //     description: 'Charge for ' + req.body.stripeEmail,
  //   }, function(err, charge) {
  //     console.log('LOOKER HERE>>>>>>>>>>>>');
  //     console.log(err);
  //     console.log(charge);
  //     User.findOne({ '_id':  req.user._id }, function(err, user) {
  //       if (err) throw err;
  //       user.subscription = 'Full';
  //       user.stripeSubId = charge.id;
  //       user.save(function(err) {
  //         if (err) throw err;
  //         console.log('Charge created for ' + req.user._id);
  //         res.sendStatus(200);
  //       });
  //     });
  //   });
  // });

  // Create new Stripe charge
  const newCharge = {
    amount: 1000,
    currency: 'USD',
    source: req.body.token.id,
    description: req.body.description,
    receipt_email: req.body.email,
  };

  stripe.charges.create(newCharge, (err, charge) => {
    if (err) {
      console.log(err);
      res.json({ error: err, charge: false });
    } else {
      console.log('SUCCESS');
      res.json({ error: false, charge: charge });
    }
  });


  // const data = {
  //   recipient: {
  //     name: `${req.body.firstNameShipping} ${req.body.lastNameShipping}`,
  //     address1: req.body.addressShipping,
  //     address2: req.body.address2Shipping,
  //     city: req.body.cityShipping,
  //     state_code: req.body.stateShipping,
  //     country_code: 'US',
  //     zip: req.body.zipShipping
  //   },
  //   items: [{
  //     sync_variant_id: 1796349947,
  //     quantity: 1
  //   }]
  // };

  // console.log(JSON.stringify(data));

  // request({
  //   url: 'https://api.printful.com/orders',
  //   method: 'POST',
  //   headers: { 'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}` },
  //   json: true,
  //   body: data
  // }, (error, response) => {
  //   console.error('error:', error);
  //   console.log('response:', response.body);
  //   res.json({
  //     yo: true
  //   });
  // });


});

// Start server
app.listen(process.env.PORT || 8081, (req, res) => {
  console.log('App listening on port 8081');
});