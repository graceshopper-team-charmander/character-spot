const router = require("express").Router();
const {
  models: { Product, User }
} = require("../db");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));
const { requireTokenMiddleware, isAdminMiddleware } = require("../auth-middleware");
const { productSchema, idSchema } = require("./validationSchemas");
const { productSort, paginate, productSearch } = require("../db/models/Product");
const { DEFAULT_PAGESIZE } = require("../../constants");
const { userSort } = require("../db/models/User");

//all routes under /api/admin require a user to be logged in and have admin privileges
router.use(requireTokenMiddleware, isAdminMiddleware, (req, res, next) => {
  next();
});

//GET /api/admin/users - returns a list of all users
router.get("/users", async (req, res, next) => {
  try {
    const { rows: users, count: totalUsers } = await User.findAndCountAll({
      attributes: ["id", "email", "firstName", "lastName", "isAdmin"],
      ...userSort(req.query),
      ...paginate(req.query, DEFAULT_PAGESIZE),
      distinct: true,
    });
    res.json({ users, totalUsers});
  } catch (err) {
    next(err);
  }
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

//PUT /api/admin/users/:id - update a user with the given id
router.put("/users/:id", async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    //@todo: userSchema.validate()
    const { firstName, lastName, email, isAdmin } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(
        { firstName, lastName, email, isAdmin },
        {
          attributes: ["firstName", "lastName", "email", "isAdmin"]
        }
      );
      res.json(user);
    } else {
      throw { status: 401, message: "User Not Found!" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
