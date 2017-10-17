const express = require('express');
const router = express.Router();
const albums = require('../../models/db/albums');
const reviews = require('../../models/db/reviews');

router.get('/albums/:albumID', (req, res, next) => {
  const albumID = req.params.albumID;
  albums.getByID(albumID)
  .then(album => {
    reviews.getAllForOneAlbum(albumID)
    .then(reviews => {
      if (reviews.length > 0) {
        res.render('album', { album, reviews });
      } else {
        res.render('album', { album });
      }
    });
  })
  .catch(error => next(error));
});

router.get('/albums/:albumID/reviews/new', (req, res, next) => {
  const albumID = req.params.albumID;
  albums.getByID(albumID)
  .then(album => {
    if (album) {
      res.render('review', { album });
    } else {
      res.redirect('/');
    }
  })
  .catch(error => next(error));
});

module.exports = router;
