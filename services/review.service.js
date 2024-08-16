const Review = require("../models/review.model");
const UserService = require("./user.service");
const ApiError = require("../exceptions/api.error");

exports.getReviews = async (user) => {
  return await Review.find({ user: user.id });
};

exports.getReview = async (id) => {
  return await Review.findOne({ _id: id });
};

exports.createReview = async (user, review) => {
  return await Review.create({ ...review, user: user.id });
};

exports.deleteReview = async (id) => {
  const review = await Review.findOneAndDelete({ _id: id });
  if (!review) {
    throw ApiError.BadRequest("No such review to delete");
  }
  return review;
};

exports.updateReview = async (review) => {
  const reviewToUpdate = await Review.findOneAndUpdate(
    { _id: review.id },
    { ...review },
    { new: true }
  );
  if (!review) {
    throw ApiError.BadRequest("No such review to update");
  }
  return reviewToUpdate;
};
