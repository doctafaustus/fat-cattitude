// Core modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

// Globals
const PRINTFUL_API_KEY = process.env.PORT ? process.env.PRINTFUL_API_KEY : fs.readFileSync(`${__dirname}/private/printful-api-key.txt`).toString();

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

  const data = {
    recipient: {
      name: `${req.body.firstNameShipping} ${req.body.lastNameShipping}`,
      address1: req.body.addressShipping,
      address2: req.body.address2Shipping,
      city: req.body.cityShipping,
      state_code: req.body.stateShipping,
      country_code: 'US',
      zip: req.body.zipShipping
    },
    items: [{
      sync_variant_id: 1796349947,
      quantity: 1
    }]
  };

  console.log(JSON.stringify(data));

  request({
    url: 'https://api.printful.com/orders',
    method: 'POST',
    headers: { 'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}` },
    json: true,
    body: data
  }, (error, response) => {
    console.error('error:', error);
    console.log('response:', response.body);
    res.json({
      yo: true
    });
  });


});

// Start server
app.listen(process.env.PORT || 8081, (req, res) => {
  console.log('App listening on port 8081');
});