const setDefaultResponseLocals = (request, response, next) => {
  response.locals.reviews = undefined;
  response.locals.reviewAuthor = undefined;
  if (request.session) {
    response.locals.session = true;
    response.locals.userID = request.session.userID;
    next();
  } else {
    response.locals.session = false;
    response.locals.userID = undefined;
    next();
  };
};

const errorHandler = (error, request, response, next) => {
  console.error(error);
  response.status(500).render('error');
};

const notFound = (req, res) => {
  res.status(404).render('not_found');
};

module.exports = {
  setDefaultResponseLocals,
  notFound,
  errorHandler,
};
