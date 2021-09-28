const router = require("express").Router();
const path = require('path');
const stripe = require('stripe')('sk_test_51JeNOmJCEzosvIpqKVCJcixnkjtGffehY9nOn2b7ILzWlSr3N640KVSBZVrJwWHYj7ybDwWtx8UKmQ1FH1nJoGMZ007M08R1Gl');

//mounted on charge
router.post("/create-checkout-session", async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    //create products

    //create prices

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1JeQCHJCEzosvIpqXeN8B1z8',
          quantity: 1,
        },
      ],
      payment_method_types: [
        'card',
      ],
      mode: 'payment',
      success_url: `http://localhost:8080/thankyou/`,
      cancel_url: `https://character-spot.herokuapp.com/`,
    });

    res.send(session.url)
  } catch (err) {
    res.send(err);
  }
});

module.exports = router
