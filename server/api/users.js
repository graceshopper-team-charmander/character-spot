const router = require("express").Router();
const {
  models: { User, Product }
} = require("../db");
const { requireTokenMiddleware, isAdminMiddleware } = require("../auth-middleware");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));

//GET /api/users - returns a list of all users
router.get("/", requireTokenMiddleware, isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "firstName", "lastName"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/cart", async (req, res, next) => {
  try {
    // need to validate userId with middleware
    const user = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Product,
          attributes: ["id", "name", "description", "price", "imageUrl"],
          through: {
            attributes: ["quantity"]
          }
        }
      ]
    });
    res.send(user.products);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/cart/:productId", async (req, res, next) => {
  try {
    // need to validate userId with middleware
    const productId = req.params.productId;
    const userId = req.params.userId;
    const newQuantity = req.body.quantity;
    const cartProduct = await Cart.findAll({
      where: {
        userId: userId,
        productId: productId
      }
    });
    const updatedCartProduct = await cartProduct[0].update({ quantity: newQuantity });
    const cart = await Cart.findAll({
      where: {
        userId: userId
      }
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/cart/:productId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const product = await Product.findByPk(req.params.productId);
    if (product) {
      user.addProduct(product);
    }
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/cart/:productId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const product = await Product.findByPk(req.params.productId);
    if (product) {
      user.removeProduct(product);
    }
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
