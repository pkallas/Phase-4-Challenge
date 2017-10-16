const express = require('express');
const router = express.Router();
const albums = require('../../models/db/albums');

router.get('/albums/:albumID', (req, res, next) => {
  const albumID = request.params.albumID;
  albums.getByID(albumID)
  .then(album => {
    console.log(album);
    response.render('album', { album });
  })
  .catch(error => next(error));
});

module.exports = router;
