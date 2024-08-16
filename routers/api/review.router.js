const { Router } = require("express");
const ReviewController = require("../../controllers/review.controller");

const router = new Router();

router.get("/", ReviewController.getReviews);
router.post("/", ReviewController.createReview);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

module.exports = router;
