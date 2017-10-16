const errorHandler = (error, request, response, next) => {
  console.error(error);
  response.status(500).render('error');
};

const notFound = (req, res) => {
  res.status(404).render('not_found');
};

module.exports = {
  notFound,
  errorHandler,
};
