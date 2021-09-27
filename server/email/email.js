const nodemailer = require('nodemailer');
var body = require('./emailBody')
var item = require('./item')
var total = require('./total')
var shippingInfo = require('./shipping')
var orderInfo = require('./orderInfo')

function emailBody(name, order, orderNumber, date) {
  //html for each item
  const items = order.map( (product) => item(product))
  const allItems = items.join(`<tr style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif; color:#777777;background-color: #000000'">
  <td> &nbsp;  </td>
  </tr>`)

  //subtotal for items and shipping in pennies
  const subtotal = order.reduce( (acc, product) => acc + (product.cart.cartQuantity * product.price), 0)
  const shipping = 500

  //cost and order summary
  const costSummary = total(subtotal, shipping)
  const orderSummary = orderInfo(date, orderNumber)

  //final email
  const email = body(name, allItems, costSummary, shippingInfo, orderSummary)

  return email

}

//need to look into Oauth tomorrow
async function sendConfirmEmail({to, html}) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: "charactershop2108",
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
      accessToken: process.env.accessToken
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
  });
}


module.exports = { sendConfirmEmail, emailBody };
