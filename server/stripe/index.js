const router = require("express").Router();
const path = require('path');
const stripe = require('stripe')('SECRET_KEY');

//mounted in /stripe
router.post("/", (req, res) => {
  try {
    console.log(req.body)
    res.send('stripe route')
    // stripe.customers
    //   .create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     source: req.body.stripeToken
    //   })
    //   .then(customer =>
    //     stripe.charges.create({
    //       amount: req.body.amount * 100,
    //       currency: "usd",
    //       customer: customer.id
    //     })
    //   )
    //   .then(() => res.send("completed.html"))
    //   .catch(err => console.log(err));
  } catch (err) {
    res.send(err);
  }
});

module.exports = router
