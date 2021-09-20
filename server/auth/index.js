const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body)
    res.cookie( 'token', token,
    {
      sameSite: 'strict',
      httpOnly: true,
      signed: true
    }).status(200).json({
      loggedIn: true,
      message: "Successfully Logged In" })
  }
  catch (err) {
  res.status(401).send({
    loggedIn: false,
    message: "Unauthorized"
  })
  }
})

//logout function that uses cookies
router.get('/logout', (req, res, next) => {
  // We just clear the token cookie to log the user out.
  console.log('router logout')
  res.clearCookie('token', {
    sameSite: 'strict',
    httpOnly: true,
    signed: true
  }).send('WE HAVE LOGGED OUT!!!')

  // {
  //   loggedIn: false,
  //   message: 'Logged Out'
  // }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  }
  catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    }
    else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const token = req.signedCookies.token
    res.send(await User.findByToken(token))
  }
  catch (ex) {
    next(ex)
  }
})
