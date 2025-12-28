const { Router } = require("express");
const {
  signup,
  login,
  getMe,
  logout,
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const router = Router();
router.route("/login").post(validate(loginSchema), login);
router.route("/signup").post(validate(registerSchema), signup);
router.route("/logout").post(logout);
router.route("/getme").get(isAuthenticated, getMe);
module.exports = router;
