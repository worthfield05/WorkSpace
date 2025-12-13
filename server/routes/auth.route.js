const { Router } = require("express");
const {
  signup,
  login,
  getMe,
  logout,
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const router = Router();
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);
router.route("/getme").get(isAuthenticated, getMe);
module.exports = router;
