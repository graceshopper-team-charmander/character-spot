const nodemailer = require('nodemailer');
var path = require('path')
var fs = require('fs')

function emailBody(order) {
  // let products = []
  // for(let i = 0; i < order.length; i++){
  //   products.push([order[i].name, order[i].imageUrl, order[i].price])
  // }
  // const header = "<h1>Thank you for your order from the Character Shop! </h1> <br>"

  const file = fs.readFileSync('server/email/emailBody.html', function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
    return content
  });
  console.log('file, ', file)
  return file
  // return products.map( (product) => `
  // <h3>${product[0]}</h3>
  // <p>$${product[2]/100}</p>
  // <img src = "${product[1]}"/>`).join('')
  // return file
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
