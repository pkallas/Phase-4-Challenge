const db = require('./db');

const getAll = () => {
  return db.query(`SELECT * FROM albums`);
};

const getByID = (albumID) => {
  return db.query(`SELECT * FROM albums WHERE id = $1`, [albumID])
  .then(album => album[0]);
};

module.exports = {
  getAll,
  getByID,
};
