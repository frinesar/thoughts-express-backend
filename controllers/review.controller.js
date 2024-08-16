const ApiError = require("../exceptions/api.error");
const ReviewService = require("../services/review.service");
const ReviewDto = require("../dto/review.dto");

exports.getReviews = async (req, res) => {
  const reviews = await ReviewService.getReviews(req.user);
  res.status(200).json(reviews);
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await ReviewService.createReview(req.user, req.body);
    res.status(201).json({ ...new ReviewDto(newReview) });
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewInDB = await ReviewService.getReview(id);
    if (reviewInDB.user.toString() !== req.user.id) {
      throw ApiError.Forbidden("No rights on updating this review");
    }
    const updatedReview = await ReviewService.updateReview({ ...req.body, id });
    res.status(200).json({ ...new ReviewDto(updatedReview) });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewInDB = await ReviewService.getReview(id);
    if (reviewInDB.user.toString() !== req.user.id) {
      throw ApiError.Forbidden("No rights on deleting this review");
    }
    const deletedReview = await ReviewService.deleteReview(id);
    res.status(200).json({ ...new ReviewDto(deletedReview) });
  } catch (error) {
    next(error);
  }
};
