var pgp = require('pg-promise')();
var db = pgp('postgres://postgres:password@localhost:5432/ratingsReviews');


//GET review lists
const retrieveReviews = async (prodId = 1, limit = 5) => {
  console.log('db line 8', prodId);
  try {
    let res = await db.query(`SELECT * FROM reviews WHERE reviews.product_id = ${prodId} LIMIT ${limit}`)
    // console.log('db line 11', res);
    return res;
  }
  catch (err) {
    console.log('error db cannot retrieve', err);
  }
}

// //GET metadata
// const retrieveMeta = async (prodId = 1) => {
//   try {
//     let ratings = await db.query(`SELECT * FROM meta WHERE meta.product_id = ${prodId}`);
//     let recommend = await db.query('')
//     return { ratings };
//   }
//   catch (err) {
//     console.log('error db cannot retrieve', err)
//   }
// }

//POST new review
const postReview = async (review) => {
  let values = [
    review.product_id,
    review.rating,
    review.summary,
    review.body,
    review.recommend,
    review.name,
    review.email,
    review.photos,
    review.characterisitics
  ]
  try {
    let res = await db.query('INSERT INTO reviews (product_id, rating, summary, body, recommend, name, email, photos, characteristics) VALUES ($1)', values)
  }
  catch (err) {
    console.log('error db cannot post', err)
  }
}

//PUT helpfulness
const putHelpfulness = async (review_id) => {
  try {
    let res = await db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE reviews.review_id = ${review_id}`);
    return res;
  }
  catch (err) {
    console.log('error db cannot retrieve', err)
  }
}

//PUT report
const putReported = async (review_id) => {
  try {
    let res = await db.query(`UPDATE reviews SET reported = reported + 1 WHERE reviews.review_id = ${review_id}`);
    return res;
  }
  catch (err) {
    console.log('error db cannot retrieve', err)
  }
}

module.exports = {
  retrieveReviews,
  // retrieveMeta,
  postReview,
  putHelpfulness,
  putReported
};