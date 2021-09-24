const router = require("express").Router();
const {
  models: { User }
} = require("../db");
const { requireTokenMiddleware } = require("../auth-middleware");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateToken();
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true
    });
    res.send({
      loggedIn: true,
      firstName: user.firstName
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

//authenticates that the user is who they say they are
router.get("/whoAmI", requireTokenMiddleware, async (req, res, next) => {
  try {
    res.send({ loggedIn: true, firstName: req.user.firstName });
  } catch (ex) {
    next(ex);
  }
});

//get info of user
router.get("/info", requireTokenMiddleware, async (req, res, next) => {
  try {
    res.send({user: req.user});
  } catch (ex) {
    next(ex);
  }
});

//change info (first name, last name, email) of user
router.put("/update", requireTokenMiddleware, async (req, res, next) => {
  try {
    const user = await req.user.update(req.body)
    res.send({user});
  } catch (ex) {
    next(ex);
  }
});

//log the user in, generate a token and set it as a cookie
router.post("/login", async (req, res, next) => {
  try {
    const { user, token } = await User.authenticate(req.body);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true
    });
    res.send({
      loggedIn: true,
      firstName: user.firstName
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true
    });
    res.json({
      loggedIn: false
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
