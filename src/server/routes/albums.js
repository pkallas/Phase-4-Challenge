const express = require('express');
const router = express.Router();
const albums = require('../../models/db/albums');

router.get('/albums/:albumID', (req, res, next) => {
  const albumID = req.params.albumID;
  albums.getByID(albumID)
  .then(album => {
    res.render('album', { album });
  })
  .catch(error => next(error));
});

router.get('/albums/:albumID/reviews/new', (req, res, next) => {
  const albumID = request.params.albumID;
  albums.getByID(albumID)
  .then(album => {
    if (album.length > 0) {
      res.render('review', { album });
    } else {
      res.redirect('/');
    }
  })
  .catch(error => next(error));
});

module.exports = router;
