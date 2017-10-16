const express = require('express');
const router = express.Router();
const albums = require('../../models/db/albums');
const albumRoutes = require('./albums');
const userRoutes = require('./users');
const middlewares = require('../middlewares');

router.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      res.render('index', {albums})
    }
  })
});

router.use(albumRoutes);
router.use(userRoutes);

router.use(middlewares.errorHandler);
router.use(middlewares.notFound);

module.exports = router;
