const router = require("express").Router();
const path = require('path');
const stripe = require('stripe')('sk_test_51JeNOmJCEzosvIpqKVCJcixnkjtGffehY9nOn2b7ILzWlSr3N640KVSBZVrJwWHYj7ybDwWtx8UKmQ1FH1nJoGMZ007M08R1Gl');

//mounted on charge
router.post("/create-checkout-session", async (req, res) => {
  const cart = req.body.cart
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true)

    let stripeProduct = []
    for(let i = 0 ; i < cart.length; i++){
      let product = await stripe.products.create({name: `${cart[i].name}`})
      stripeProduct.push( {
        product,
        quantity: cart[i].cartQuantity,
        price: cart[i].price})
    }
    const lineItems = []
    for(let j = 0; j < stripeProduct.length; j++){
      let stripePrice = await stripe.prices.create({
        product: stripeProduct[j].product.id,
        unit_amount: stripeProduct[j].price,
        currency: 'usd',
      });
      lineItems.push({
        price: stripePrice.id,
        quantity: stripeProduct[j].quantity
      })
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_method_types: [
        'card',
      ],
      mode: 'payment',
      success_url: `https://character-spot.herokuapp.com/thankyou/`,
      cancel_url: `https://character-spot.herokuapp.com/`,
    });

    res.send(session.url)
  } catch (err) {
    res.send(err);
  }
});

module.exports = router
