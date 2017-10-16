const db = require('./db');

const getAll = () => {
  return db.query(`SELECT * FROM albums`);
};

const getByID = (albumID) => {
  return db.query(`SELECT * FROM albums WHERE id = $1`, [albumID]);
};

module.exports = {
  getAll,
  getByID,
};
