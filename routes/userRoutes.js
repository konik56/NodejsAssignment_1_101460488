const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const router = express.Router();

router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  userController.signup
);

router.post("/login", userController.login);

module.exports = router;
