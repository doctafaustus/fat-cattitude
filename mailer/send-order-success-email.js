const transporter = require('./transporter');

module.exports = function sendOrderSuccessEmail(email, orderID) {
  transporter.sendMail(
    {
      from: '"Fat Cattitude Orders" <orders@fatcattitude.com>',
      to: email,
      subject: 'Order Received!',
      html: `
        <div style="font-family:'Montserrat','Roboto',Helvetica;border:solid 1px #eee;text-align:center;padding:40px;width:600px;box-sizing:border-box;margin: 0 auto;font-size:15px;">
        <a href="https://www.fatcattitude.com" target="_blank" alt="Fat Cattitude Logo"><img src="https://res.cloudinary.com/dormh2fvt/image/upload/v1597983140/Fat%20Cattitude/Fat_Cattitude_Professional_Logo_50_1_1-c_scale_w_500_1.png" style="width:200px;display:block;margin:0 auto;"></a>
        <div style="font-size:24px;font-style:normal;font-weight:bold;letter-spacing:-.5px;margin:20px 0 40px 0;text-align:center;">Your order has been submitted!</div>
      
        <div style="font-weight: bold;margin-bottom:14px;text-align:left;">Hi there,</div>
        <div style="text-align:left;line-height:21px;">Your Fat Cattitude order has begun processing! Please allow 2 - 7 business days for fulfillment prior to shipping. Please use the link below to check your order status.</div>
        
        <a href="https://www.fatcattitude.com/order-confirmation?orderID=${orderID}" target="_blank" style="margin:40px 0; display:inline-block;text-decoration:none;padding:12px 45px;background-color:#6805fb;color:#fff;border-radius:5px;font-size:16px;">Order Status</a>
        
        <div style="text-align:left;line-height:21px;margin-bottom:40px;">If you have any questions, send us an email at meow@fatcattitude.com. We're happy to help.</div>
        
        <div style="text-align:left;">Thanks!</div>
        <div style="text-align:left;">Fat Cattitude</div>
      </div>
      `,
    }, 
    (error, response) => { 
      if (error) {
        console.log('Order success email failure:', error);
      } else {
        console.log('Order success email sent to', email);
      }
    }
  );
}