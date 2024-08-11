const { Router } = require("express");
const UserController = require("../../controllers/user.controller");
const tokenValidator = require("../../middleware/token-validator");

const router = new Router();

router.get("/refresh", UserController.refresh);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/logout", tokenValidator, UserController.logoutUser);
router.delete("/:id", tokenValidator, UserController.deleteUser);
router.put("/:id", tokenValidator, UserController.updateUser);

module.exports = router;
