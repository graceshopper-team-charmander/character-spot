const nodemailer = require('nodemailer');

function emailBody(order) {
  console.log('----email body----')
  let products = []
  for(let i = 0; i < order.length; i++){
    products.push([order[i].name, order[i].imageUrl, order[i].price])
  }
  return products.map( (product) => `<h1>${product[0]}</h1> <p>$${product[2]/100}</p><img src = ${product[1]}/>`).join('')
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
