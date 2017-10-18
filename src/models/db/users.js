const db = require('./db');
const bcrypt = require('bcrypt');

const create = (user, encryptedPassword) => {
  return db.query(`INSERT INTO users (name, email, encrypted_password, date_joined)
  VALUES ($1, $2, $3, current_timestamp) RETURNING id`,
  [user.name, user.email, encryptedPassword])
  .catch(error => { throw error });
};

const getAllByEmail = (userEmail) => {
  return db.query(`SELECT * FROM users WHERE email = $1`, [userEmail])
  .then(user => user[0])
  .catch(error => { throw error });
};

const encryptPassword = (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, 10)
  .then(encryptedPassword => encryptedPassword)
  .catch(error => { throw error });
};

const isValidPassword = (plainTextPassword, encryptPassword) => {
  return bcrypt.compare(plainTextPassword, encryptPassword)
  .catch(error => { throw error });
};

const getAllByID = (userID) => {
  return db.query(`SELECT * FROM users WHERE id = $1`, [userID])
  .then(user => user[0])
  .catch(error => { throw error });
};

const isUser = (email) => {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email])
  .catch(error => { throw error });
};

module.exports = {
  create,
  getAllByEmail,
  encryptPassword,
  isValidPassword,
  getAllByID,
  isUser,
};
