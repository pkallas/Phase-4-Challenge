const express = require('express');
const router = express.Router();
const users = require('../../models/db/users');
const reviews = require('../../models/db/reviews');

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', (req, res, next) => {
  const userEmail = req.body.email;
  const plainTextPassword = req.body.password;
  users.getAllByEmail(userEmail)
  .then(user => {
    return users.isValidPassword(plainTextPassword, user.encrypted_password)
    .then(isValid => {
      if (isValid) {
        req.session.userID = user.id;
        res.redirect(`users/${user.id}`);
      } else {
        const message = {
          text: 'Wrong email or password, try again',
        };
        res.render('signin', { message });
      }
    });
  })
  .catch(error => next(error));
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
  };
  const plainTextPassword = req.body.password;
  users.isUser(user.email)
  .then(exisitingUser => {
    if (exisitingUser.length > 0) {
      let message = {
        text: 'User already exists, please try a different username or go to login',
      };
      res.render('signup', { message });
    } else {
      users.encryptPassword(plainTextPassword)
      .then(encryptedPassword => {
        users.create(user, encryptedPassword)
        .then(newUserID => {
          req.session.userID = newUserID[0].id;
          res.redirect(`/users/${newUserID[0].id}`);
        })
        .catch(error => next(error));
      })
      .catch(error => next(error));
    }
  })
  .catch(error => next(error));
});

router.get('/users/:userID', (req, res, next) => {
  const userID = req.params.userID;
  let reviewAuthor;
  userID == req.session.userID ? reviewAuthor = true : reviewAuthor = false;
  users.getAllByID(userID)
  .then(user => {
    reviews.getAllForOneUser(userID)
    .then(reviews => {
      if (reviews.length > 0) {
        res.render('user', { user, reviews, reviewAuthor });
      } else {
        res.render('user', { user, reviewAuthor });
      }
    });
  })
  .catch(error => next(error));
});

router.put('/users/:userID', (req, res, next) => {
  const userID = req.params.userID;
  const profilePic = req.body.profilePic;
  users.updateProfilePicture(userID, profilePic)
  .then(() => res.json('Profile Picture Updated'))
  .catch(error => next(error));
});

router.get('/signout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
