const router = require("express").Router();
const {
  models: { Cart, User, Order, Product }
} = require("../db");

const { requireTokenMiddleware } = require("../auth-middleware");
const { refactorCartItems } = require("../db/models/Cart");
const { idSchema } = require("./validationSchemas");

//GET /api/user/wishlist - return items on a users wishlist
router.get("/", requireTokenMiddleware, async (req, res, next) => {
  try {
    res.json(await req.user.getWishlistItems());
  } catch (err) {
    next(err);
  }
});

//POST /api/user/wishlist/:id - add item with the given id the to wishlist
router.post("/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    //check if exists, if so, if not, then add
    await idSchema.validate(req.params);
    const item = await req.user.addWishlistItem(req.params.id);
    if(item) {
      const product = await Product.findByPk(req.params.id);
      res.json(product);
    }
    else {
      next(); //send to 404 - item not found
    }
  } catch (err) {
    next(err);
  }
});

//DELETE /api/user/wishlist/:productId - delete item with the given id from the wishlist
router.delete("/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    const temp = await req.user.removeWishlistItem(req.params.id);
    if(temp)
      res.sendStatus(200);
    else {
      next(); //send to 404 - item not found to delete
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
