const router = require("express").Router();
const {
  models: { Product: Products }
} = require("../db");

//GET /products - returns all the products
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll({
      attributes: ["name", "description", "price", "imageUrl"]
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    if(!isNaN(parseInt(req.params.id))) { //make sure the ID is a number
      const product = await Products.findByPk(req.params.id, {
        attributes: ["name", "description", "price", "imageUrl"]
      });
      if(product) {
        res.send(product);
      }
      else {
        next(); //send to 404 if this product doesn't exist
      }
    }
    else {
      throw err('Bad product Id');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;