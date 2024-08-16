const ReviewService = require("../services/review.service");
const ApiError = require("../exceptions/api.error");

exports.getReviews = async (req, res) => {
  const reviews = await ReviewService.getReviews();
  res.status(200).json(reviews);
};

exports.createReview = async (req, res, next) => {
  const newReview = await ReviewService.createReview(
    { id: "66b8a6e7678499dfcef96f51" },
    req.body
  );
  res.status(200).json(newReview);
};
