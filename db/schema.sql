DROP DATABASE IF EXISTS blogs_cms;
CREATE DATABASE blogs_cms;

USE blogs_cms;

CREATE TABLE user(
  id INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  username VARCHAR(40) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL
);

CREATE TABLE post(
  id INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  text VARCHAR(2000) NOT NULL,
  owner INTEGER NOT NULL,
  created_at timestamp,
  updated_at timestamp
);

CREATE TABLE post_comment(
  id INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  text VARCHAR(200) NOT NULL,
  owner INTEGER NOT NULL,
  related_post VARCHAR(500) NOT NULL,
  created_at timestamp,
  updated_at timestamp
);