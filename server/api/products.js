const router = require("express").Router();
const {
  models: { Product: Products }
} = require("../db");
const { idSchema } = require("./validationSchemas");

//GET /products - returns all the products
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll({
      attributes: ["id", "name", "description", "price", "imageUrl", "quantity"]
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});

//GET /products/:id - returns a single product, specified by ID
router.get("/:id", async (req, res, next) => {
  try {
    //make sure the ID is a number
    await idSchema.validate(req.params);
    const product = await Products.findByPk(req.params.id, {
      attributes: ["id", "name", "description", "price", "imageUrl"]
    });
    if (product) {
      res.send(product);
    } else {
      throw { status: 404, message: "No such product!" };
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
