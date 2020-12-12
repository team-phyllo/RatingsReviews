CREATE DATABASE ratingsReviews;

\c ratingsReviews

CREATE TABLE reviewPhotos (
  photo_id serial PRIMARY KEY,
  review_id INTEGER DEFAULT NULL,
  photo_src VARCHAR DEFAULT NULL
);

CREATE TABLE reviews (
  review_id serial PRIMARY KEY,
  product_id INTEGER NOT NULL,
  date DATE,
  rating INTEGER NOT NULL,
  summary VARCHAR DEFAULT NULL,
  body VARCHAR NOT NULL,
  recommend BOOLEAN NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  photos INTEGER DEFAULT NULL,
  characteristics INTEGER DEFAULT NULL,
  response VARCHAR DEFAULT NULL,
  helpfulness INTEGER DEFAULT NULL,
  reported BOOLEAN DEFAULT NULL,
  FOREIGN KEY (photos) REFERENCES reviewPhotos(photo_id)
);


CREATE TABLE characteristics_reviews (
  id serial PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  name VARCHAR NOT NULL
);

 CREATE TABLE ratings AS SELECT rating, product_id FROM reviews;

CREATE TABLE meta (
  product_id serial PRIMARY KEY,
  helpfulness INTEGER NOT NULL,
  star5 INTEGER NOT NULL,
  star4 INTEGER NOT NULL,
  star3 INTEGER NOT NULL,
  star2 INTEGER NOT NULL,
  star1 INTEGER NOT NULL
);
