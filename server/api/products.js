const router = require("express").Router();
const {
  models: { Product, ProductCategory, categoryFilter }
} = require("../db");
const { idSchema } = require("./validationSchemas");
const { productSort, paginate, productSearch } = require("../db/models/Product");
const { DEFAULT_PAGESIZE } = require("../../constants");

//GET /products - returns all the products
router.get("/", async (req, res, next) => {
  try {
    const { rows: products, count: totalItems } = await Product.findAndCountAll({
      attributes: ["id", "name", "description", "price", "imageUrl", "quantity"],
      include: [
        {
          model: ProductCategory,
          as: "categories",
          ...categoryFilter(req.query)
        }
      ],
      ...productSort(req.query),
      ...paginate(req.query, DEFAULT_PAGESIZE),
      ...productSearch("product", "name", req.query),
      distinct: true
    });

    res.json({ products, totalItems });
  } catch (err) {
    next(err);
  }
});



//GET /products/categories - returns all categories
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll({
      attributes: ["id", "name", "code"]
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

//GET /products/:id - returns a single product, specified by ID
router.get("/:id", async (req, res, next) => {
  try {
    //make sure the ID is a number
    await idSchema.validate(req.params);
    const product = await Product.findByPk(req.params.id, {
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
