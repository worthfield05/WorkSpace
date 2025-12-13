const ApiError = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { User } = require("../models/user.model");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) next(ApiError(401, "Authorization Token Missing"));
    const decodeToken = jwt.verify(token, config.JWT_SECRET_KEY);
    if (!decodeToken) next(ApiError(401, "Invalid or expired token "));
    const validUser = await User.findOne({ _id: decodeToken._id });
    if (!validUser) next(ApiError(404, "User not found"));
    const { password, ...rest } = validUser._doc;
    req.user = rest;
    next();
  } catch (error) {
    next(error);
  }
};
