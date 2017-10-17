const setDefaultResponseLocals = (req, res, next) => {
  res.locals.reviews = undefined;
  res.locals.reviewAuthor = undefined;
  if (req.session) {
    res.locals.session = true;
    res.locals.userID = req.session.userID;
    next();
  } else {
    res.locals.session = false;
    res.locals.userID = undefined;
    next();
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
