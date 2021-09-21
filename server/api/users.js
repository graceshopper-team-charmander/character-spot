const router = require("express").Router();
const {
  models: { User }
} = require("../db");
const { requireTokenMiddleware, isAdminMiddleware } = require("./auth-middleware");

router.get("/", requireTokenMiddleware, async (req, res, next) => {
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
