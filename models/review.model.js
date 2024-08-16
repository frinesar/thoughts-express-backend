const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  titleEng: { type: String, required: true },
  titleRus: { type: String },
  isViewed: { type: Boolean, default: false },
  rating: { type: Number },
  review: { type: String },
  reviewDate: { type: Date, default: Date.now },
  releaseDate: { type: Date },
  user: { type: Schema.ObjectId, ref: "User", required: true },
});

module.exports = model("Review", ReviewSchema, "Reviews");
