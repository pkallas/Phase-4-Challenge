const express = require('express');
const router = express.Router();
const albums = require('../../models/db/albums');
const reviews = require('../../models/db/reviews');
const albumRoutes = require('./albums');
const userRoutes = require('./users');
const middlewares = require('../middlewares');

router.get('/', (req, res, next) => {
  albums.getAll()
  .then(albums => {
    reviews.getThreeMostRecent()
    .then(reviews => {
      if (reviews.length > 0) {
        res.render('index', { albums, reviews });
      } else {
        res.render('index', { albums });
      }
    });
  })
  .catch(error => next(error));
});

router.use(albumRoutes);
router.use(userRoutes);

router.use(middlewares.errorHandler);
router.use(middlewares.notFound);

module.exports = router;
