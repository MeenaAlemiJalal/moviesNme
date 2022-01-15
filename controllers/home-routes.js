const router = require('express').Router();

// home page route that returns all movies
router.get('/', async (req, res) => {
  res.render('home', {data:{user: false, text: 'Featured movie here'}});
});

// registration route that registers a user
router.get('/register', async(req, res) => {
  res.render('register', {user: true})
})


// Login route
router.get('/login', async(req, res)=>{
  res.render('login', {user: false})
})


module.exports = router;
