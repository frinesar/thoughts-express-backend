module.exports = class ReviewDto {
  id;
  titleEng;
  titleRus;
  rating;
  review;
  isViewed;
  releaseDate;
  reviewDate;

  constructor(review) {
    this.id = review._id;
    this.titleEng = review.titleEng;
    this.titleRus = review.titleRus;
    this.rating = review.rating;
    this.review = review.review;
    this.isViewed = review.isViewed;
    this.releaseDate = review.releaseDate;
    this.reviewDate = review.reviewDate;
  }
};
