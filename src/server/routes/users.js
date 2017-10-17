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

// router.post('/signup', (req, res, next) => {
//
// });

module.exports = router;
