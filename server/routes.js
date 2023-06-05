const router = require('express').Router();
const controllers = require('./controllers');
const awsServerlessExpress = require('aws-serverless-express');

// product details
// Retrieves the list of products
router.get('/products', controllers.details.getProduct);
// Returns all product level information for a specified product id
router.get('/products/:product_id', controllers.details.getProductById);
// Returns the all styles available for the given product
router.get('/products/:product_id/styles', controllers.details.getStyles);
// Returns the id's of products related to the product specified
router.get('/products/:product_id/related', controllers.details.getRelated);
// Adds a product to the cart. format: {'sku_id':xxx, 'count':xxx}
router.post('/cart', controllers.details.addCart);
// Retrieves list of products added to the cart by a user
router.get('/cart', controllers.details.getCart);
// Adds an interation to the db
router.post('/interactions', controllers.details.addInteraction);

// //product q_a
router.get('/q_a/getQuestions', controllers.q_a.getQuestions);
router.get('/q_a/getAnswers', controllers.q_a.getAllAnswers);
router.post('/q_a/ask', controllers.q_a.postQuestion);
router.post('/q_a/reply', controllers.q_a.postAnswer);
router.put('/q_a/question/upvote', controllers.q_a.upvoteQuestion);
router.put('/q_a/question/:question_id/report', controllers.q_a.reportQuestion);
router.put('/q_a/answer/:answer_id/upvote', controllers.q_a.upvoteAnswer);
router.put('/q_a/answer/:answer_id/report', controllers.q_a.reportAnswer);


//reviews:Eric
router.get('/reviews', controllers.reviews.getReviews);
router.get('/reviews/meta', controllers.reviews.getProductBreakdown);
router.post('/reviews', controllers.reviews.postReview);
router.put('/reviews/:review_id/helpful', controllers.reviews.putHelpful);
router.put('/reviews/:review_id/report', controllers.reviews.reportReview);
module.exports = router;
