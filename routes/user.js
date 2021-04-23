const express = require("express");
const router = express.Router();
const authValidator = require("../middleware/authValidators");
const userController = require("../controllers/user");

router.post(
  "/register",
  authValidator.authValidator,
  userController.userRegister
);

router.post(
  "/login",
  authValidator.authValidator,
  userController.userLogin
);

module.exports = router;
