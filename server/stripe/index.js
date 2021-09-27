const router = require("express").Router();
const path = require('path');
const stripe = require('stripe')('sk_test_51JeNOmJCEzosvIpqKVCJcixnkjtGffehY9nOn2b7ILzWlSr3N640KVSBZVrJwWHYj7ybDwWtx8UKmQ1FH1nJoGMZ007M08R1Gl');

//mounted on charge
router.post("/create-checkout-session", async (req, res) => {
  try {
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
      success_url: `https://character-spot.herokuapp.com/thankyou`,
      cancel_url: `https://character-spot.herokuapp.com/`,
    });

    res.redirect(303, session.url)
  } catch (err) {
    res.send(err);
  }
});

module.exports = router
