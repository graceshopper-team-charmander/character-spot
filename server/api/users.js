const router = require("express").Router();
const {
  models: { User }
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

module.exports = router;
