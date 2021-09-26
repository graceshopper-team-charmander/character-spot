const nodemailer = require('nodemailer');
var body = require('./emailBody')
var item = require('./item')

function emailBody(name, order) {
  const items = order.reduce( (acc, product) => acc + item(product), "")
  const email = body(name, items)
  return email

}

async function sendEmail({to, html}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'charactershop2108@gmail.com',
        pass: 'ember!!!'
    }
  });
  await transporter.sendMail({
    from: 'charactershop2108@gmail.com',
    to: to,
    subject: 'Thanks For Your Order!',
    html: html
  }, (err, info) => {
    if(err) {
      console.log('error', err)
    }
    console.log('message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}


module.exports = { sendEmail, emailBody };
