const express = require('express');
const router = express.Router();
const users = require('../../models/db/users');

router.get('/signin', (req, res) => {
  res.render('signin');
});

// router.post('/signin', (req, res, next) => {
//
// });

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
  };
  const plainTextPassword = req.body.password;
  users.encryptPassword(plainTextPassword)
  .then(encryptedPassword => users.create(user, encryptedPassword))
  .then(newUserId => {
    req.session.userID = newUserId;
    res.redirect(`/users/${newUserID}`);
  })
  .catch(error => next(error));
});

module.exports = router;
