const express = require('express');
const router = express.Router();
const albums = require('../../models/db/albums');
const albumRoutes = require('./albums');
const userRoutes = require('./users');
const middlewares = require('../middlewares');

router.get('/', (req, res, next) => {
  albums.getAll()
  .then(albums => {
    console.log(albums);
    res.render('index', { albums });
  })
  .catch(error => next(error))
});

router.use(albumRoutes);
router.use(userRoutes);

router.use(middlewares.errorHandler);
router.use(middlewares.notFound);

module.exports = router;
