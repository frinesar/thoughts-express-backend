const Review = require("../models/review.model");
const UserService = require("./user.service");

exports.getReviews = async () => {
  return await Review.find();
};

exports.createReview = async (user, review) => {
  const userInDB = await UserService.getUser(user.id);
  return await Review.create({ ...review, user: user.id });
};

exports.deleteReview = async (id) => {
  return await Review.findOneAndDelete({ _id: id });
};
