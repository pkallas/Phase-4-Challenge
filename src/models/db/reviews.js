const db = require('./db');

const getThreeMostRecent = () => {
  return db.query(`SELECT description, date_written, users.name, albums.title
    FROM reviews JOIN users ON users.id = reviews.user_id
    JOIN albums ON albums.id = reviews.album_id
    ORDER BY date_written DESC`)
    .catch(error => { throw error });
};

module.exports = {
  getThreeMostRecent,
};
