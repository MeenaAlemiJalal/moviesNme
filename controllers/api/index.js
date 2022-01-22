const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./movies-routes');

router.use('/users', userRoutes);
router.use('/', postRoutes);

module.exports = router;