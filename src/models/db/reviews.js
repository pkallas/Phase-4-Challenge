const db = require('./db');

const getThreeMostRecent = () => {
  return db.query(`SELECT description, date_written, users.name, albums.title
    FROM reviews JOIN users ON users.id = reviews.user_id
    JOIN albums ON albums.id = reviews.album_id
    ORDER BY date_written DESC
    LIMIT 3`)
  .catch(error => { throw error });
};

const getAllForOneAlbum = (albumID) => {
  return db.query(`SELECT description, date_written, users.name, albums.title
    FROM reviews JOIN users ON users.id = reviews.user_id
    JOIN albums ON albums.id = reviews.album_id
    WHERE reviews.album_id = $1
    ORDER BY date_written DESC`, [albumID])
  .catch(error => { throw error });
};

const getAllForOneUser = (userID) => {
  return db.query(`SELECT description, date_written, albums.title
    FROM reviews JOIN users ON users.id = reviews.user_id
    JOIN albums ON albums.id = reviews.album_id
    WHERE reviews.user_id = $1
    ORDER BY date_written DESC`, [userID])
  .catch(error => { throw error });
};

module.exports = {
  getThreeMostRecent,
  getAllForOneAlbum,
  getAllForOneUser,
};
