const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./movies-routes');

router.use('/', userRoutes);
router.use('/', postRoutes);

module.exports = router;