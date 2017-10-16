const db = require('./db');
const bcrypt = require('bcyrpt');

const create = (newUser, encryptedPassword) => {
  return db.query(`INSERT INTO users (name, email, encrypted_password, date_joined)
  VALUES ($1, $2, $3, current_timestamp) RETURNING id`,
  [newUser.name, newUser.email, encryptedPassword])
  .catch(error => { throw error });
};

const getAll = (userEmail) => {
  return db.query(`SELECT * FROM users WHERE email = $1`, [userEmail])
  .catch(error => { throw error });
};

const encryptPassword = (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, 10)
  .then(encryptedPassword => encryptPassword)
  .catch(error => { throw error });
};

const isValidPassword = (plainTextPassword, encryptPassword) => {
  return bcrypt.compare(plainTextPassword, encryptPassword)
  .catch(error => { throw error });
};

module.exports = {
  create,
  getAll,
  encryptPassword,
  isValidPassword,
};
