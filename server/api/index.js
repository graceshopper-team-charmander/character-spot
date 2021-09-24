const router = require("express").Router();
module.exports = router;

//Error Handler for /api
router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/admin", require("./admin"));
// router.use("/orders", require("./orders"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
