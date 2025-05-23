// controllers/reviewController.js
const getDb = require("../models/db");


  exports.getAllReviews= async (req, res) => {
    const { reviewCollection } = getDb();
    const result = await reviewCollection.find().toArray();
    res.send(result);
  },

  exports.getReviewCount= async (req, res) => {
    const { reviewCollection } = getDb();
    const count = await reviewCollection.estimatedDocumentCount();
    res.send({ reviewCount: count });
  },

  exports.addReview= async (req, res) => {
    const { reviewCollection } = getDb();
    const review = req.body;
    const result = await reviewCollection.insertOne(review);
    res.send(result);
  }
