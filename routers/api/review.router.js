const { Router } = require("express");
const ReviewController = require("../../controllers/review.controller");
const tokenValidator = require("../../middleware/token-validator");

const router = new Router();

router.get("/", ReviewController.getReviews);
router.post("/", ReviewController.createReview);
// router.get("/", UserController.getAllUsers);
// router.get("/:id", UserController.getUser);
// router.post("/", UserController.createUser);
// router.post("/login", UserController.loginUser);
// router.post("/logout", tokenValidator, UserController.logoutUser);
// router.delete("/:id", tokenValidator, UserController.deleteUser);
// router.put("/:id", tokenValidator, UserController.updateUser);

module.exports = router;
