const reviews = require('../models/db/reviews');

const setDefaultResponseLocals = (req, res, next) => {
  res.locals.reviews = undefined;
  res.locals.reviewAuthor = undefined;
  res.locals.message = undefined;
  if (req.session.userID) {
    res.locals.session = true;
    res.locals.userID = req.session.userID;
    reviews.setAuthorFalse()
    .then(() => next());
  } else {
    res.locals.session = false;
    res.locals.userID = undefined;
    reviews.setAuthorFalse()
    .then(() => next());
  };
};

const errorHandler = (error, req, res, next) => {
  console.error(error);
  res.status(500).render('error');
};

const notFound = (req, res) => {
  res.status(404).render('not_found');
};

module.exports = {
  setDefaultResponseLocals,
  notFound,
  errorHandler,
};
