const router = require("express").Router();
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-Auth");

router.get("/profile", isAuth, authController.getUserProfile);

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Invalid Name"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),
    body("password", "Invalid Password")
      .trim()
      .isAlphanumeric()
      .isLength({ min: 5, max: 15 }),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("password", "Invalid Password")
      .trim()
      .isAlphanumeric()
      .isLength({ min: 5, max: 15 }),
  ],
  authController.login
);

router.post("/forgot", authController.forgotPassword);

router.post("/password/reset/:token", authController.passwordReset);

module.exports = router;
