const router = require("express").Router();
const {
  models: { Product: Product }
} = require("../db");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));
const { requireTokenMiddleware, isAdminMiddleware } = require("../auth-middleware");
const { productSchema, idSchema } = require("./validationSchemas");

//all routes under /api/admin require a user to be logged in and have admin privileges
router.use(requireTokenMiddleware, isAdminMiddleware, (req, res, next) => {
  next();
});

//GET /api/admin/products - returns all the products for admins
router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "imageUrl", "quantity"]
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//POST /api/admin/products - add a new product
router.post("/products", async (req, res, next) => {
  try {
    await productSchema.validate(req.body);
    const { name, price, imageUrl, quantity, description } = req.body;
    const product = await Product.create({ name, price, imageUrl, quantity, description });
    res.json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//DELETE /api/admin/products/:id - delete a product with the specified id
router.delete("/products/:id", async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    const rowsDeleted = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (rowsDeleted) {
      res.sendStatus(200);
    } else {
      throw { status: 401, message: "Product Not Found!" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//PUT /api/admin/products/:id - update a product with the given id
router.put("/products/:id", async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    await productSchema.validate(req.body);
    const { name, price, imageUrl, quantity, description } = req.body;
    const [rowsUpdated, products] = await Product.update(
      { name, price, imageUrl, quantity, description },
      {
        where: {
          id: req.params.id
        },
        returning: true
      }
    );
    if (rowsUpdated) {
      res.json(products[0]);
    } else {
      throw { status: 401, message: "Product Not Found!" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

/*
token=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTYzMjI2Nzg3N30.gFwmWcK_Mr9dE9YQ2b7hN58NLPmohAWB2gXvwKbRuNQ.2nKP8XPVucZ84SFO6b9Qxb1j5qC%2Fss6bvDnTnYSchwk; Path=/; HttpOnly;
 */
