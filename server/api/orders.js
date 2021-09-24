const router = require("express").Router();
const {
  models: { User, Product, Cart }
} = require("../db");
const { requireTokenMiddleware, isAdminMiddleware } = require("../auth-middleware");

const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));

//GET /orders - returns the fulfilled orders with products
router.get("/", requireTokenMiddleware, async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({
      where: {
        status: "FULFILLED"
      },
      include: {
        model: Product
      }
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
