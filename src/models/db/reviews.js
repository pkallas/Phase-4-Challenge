const db = require('./db');

const getThreeMostRecent = () => {
  return db.query(`SELECT * FROM reviews
    JOIN users ON users.id = reviews.user_id
    JOIN albums ON albums.id = reviews.album_id
    ORDER BY date_written DESC
    LIMIT 3`)
  .catch(error => { throw error });
};

const getAllForOneAlbum = (albumID) => {
  return db.query(`SELECT * FROM reviews
    JOIN users ON users.id = reviews.user_id
    JOIN albums ON albums.id = reviews.album_id
    WHERE reviews.album_id = $1
    ORDER BY date_written DESC`, [albumID])
  .catch(error => { throw error });
};

const getAllForOneUser = (userID) => {
  return db.query(`SELECT * FROM reviews
    JOIN users ON users.id = reviews.user_id
    JOIN albums ON albums.id = reviews.album_id
    WHERE reviews.user_id = $1
    ORDER BY date_written DESC`, [userID])
  .catch(error => { throw error });
};

const create = (userID, albumID, description) => {
  return db.query(`INSERT INTO reviews (user_id, album_id, date_written, description)
  VALUES ($1, $2, current_timestamp, $3)`, [userID, albumID, description])
  .catch(error => { throw error });
};

module.exports = {
  getThreeMostRecent,
  getAllForOneAlbum,
  getAllForOneUser,
  create,
};
