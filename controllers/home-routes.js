const router = require('express').Router();


// Get all dishes
router.get('/', async (req, res) => {
  res.render('home', {data:"featured-movie here"});
});



module.exports = router;
