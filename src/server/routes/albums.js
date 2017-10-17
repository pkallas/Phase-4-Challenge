const express = require('express');
const router = express.Router();
const albums = require('../../models/db/albums');
const reviews = require('../../models/db/reviews');

router.get('/albums/:albumID', (req, res, next) => {
  const albumID = req.params.albumID;
  const userID = req.session.userID;
  albums.getByID(albumID)
  .then(album => {
    reviews.getAllForOneAlbum(albumID)
    .then(reviews => {
      if (reviews.length > 0) {
        if (userID) {
          reviews.forEach(review => {
            if (review.user_id === userID) {
              reviews.setAuthorTrue(userID, albumID)
              .then(() => console.log('review updated'));
            }
          });
          res.render('album', { album, reviews });
        }
      } else {
        res.render('album', { album });
      }
    });
  })
  .catch(error => next(error));
});

router.get('/albums/:albumID/reviews/new', (req, res, next) => {
  if (req.session) {
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
  } else {
    res.redirect('/');
  }
});

router.post('/albums/:albumID/reviews', (req, res, next) => {
  if (req.session) {
    const albumID = req.params.albumID;
    const userID = req.session.userID;
    reviews.create(userID, albumID, req.body.reviewDescription)
    .then(newReview => res.redirect(`/albums/${albumID}`))
    .catch(error => next(error));
  } else {
    res.redirect('/');
  }
});

module.exports = router;
