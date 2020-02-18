const fs = require('fs');
const request = require('request');

const PRINTFUL_API_KEY = process.env.PORT ? process.env.PRINTFUL_API_KEY : fs.readFileSync(`${__dirname}/private/printful-api-key.txt`).toString();


console.log(Buffer.from("Hello World").toString('base64'));

request(
  {
    url: 'https://api.printful.com/store',
    headers: {
      'Authorization': `Basic ${Buffer.from(PRINTFUL_API_KEY).toString('base64')}`
    }
  },
  (error, response) => {
  console.error('error:', error);
  console.log('response:', response.body);
});
