const express = require('express');
const bodyParser = require('body-parser');
const queries = require('../db/index.js');
const app = express();
const PORT = 3030;

app.use(bodyParser.json());

//GET Review lists
app.get('/reviews', (req, res) => {
  queries.retrieveReviews(req.params.product_id, req.params.count)
  .then(reviews => {
      console.log(reviews);
      res.send(reviews);
    })
    .catch(error => {
      console.log('errrrrrorrr');
      res.status(400).send('error, cannot get reviews');
    });
});

//GET Metadata
app.get('/reviews/meta', (req, res) => {
  queries.retrieveMeta(req.params.product_id)
    .then(meta => {
      res.send(meta);
    })
    .catch(error => {
      res.status(400).send('error, cannot get meta');
    });
});

//POST New review
app.post('/reviews', (req, res) => {
  req.body = {
    product_id: req.params.product_id,
    rating: req.params.rating,
    summary: req.params.summary,
    body: req.params.body,
    name: req.params.name,
    email: req.params.email,
    photos: req.params.photos,
    characteristics: req.params.characterisitics

  }
  queries.postReview(req.body)
    .then((res) => {
      res.status(200).send('posted');
    })
    .catch(error => {
      res.status(400).send('error, cannot post review');
    });
});

//PUT Helpfulness
app.put('/reviews/:review_id/helpful', (req, res) => {
  queries.putHelpfulness(req.params.review_id)
    .then((res) => {
      res.status(204).send('updated');
    })
    .catch(error => {
      res.status(404).send('error, cannot update helpfulness');
    });
});

//PUT Reported
app.put(`/reviews/:review_id/report`, (req, res) => {
  queries.putReported(req.params.review_id)
    .then((res) => {
      res.status(204).send('reported');
    })
    .catch(error => {
      res.status(404).send('error, cannot get flag review');
    });
});


//GET TEST
app.get('/', (req, res) => {
  res.status(200).send('stuffs connected!!');
})
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});