const router = require("express").Router();
const {
  models: { Product: Products }
} = require("../db");

//GET /products - returns all the products
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll({
      attributes: ["id", "name", "description", "price", "imageUrl"]
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});

//GET /products/:id - returns a single product, specified by ID
router.get("/:id", async (req, res, next) => {
  try {
    if (!isNaN(parseInt(req.params.id))) {
      //make sure the ID is a number
      const product = await Products.findByPk(req.params.id, {
        attributes: ["id", "name", "description", "price", "imageUrl"]
      });
      if (product) {
        res.send(product);
      } else {
        throw { status: 404, message: "No such product!" };
      }
    } else {
      throw { message: "Bad product id!" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
