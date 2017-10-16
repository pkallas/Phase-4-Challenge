DROP TABLE IF EXISTS albums;
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255),
  date_joined TIMESTAMP
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  album_id INTEGER REFERENCES albums (id) ON DELETE CASCADE,
  date_written TIMESTAMP,
  description TEXT
);
