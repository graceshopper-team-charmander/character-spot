const router = require("express").Router();
const {
  models: { User, Product, Cart }
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"]
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
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/cart/:productId", async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const product = await Product.findByPk(req.params.productId);
    if(product) {
      user.addProduct(product)
    }
    res.send(product)
  } catch (err) {
    next(err)
  }
})
