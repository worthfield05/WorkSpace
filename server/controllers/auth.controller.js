const { authService } = require("../services/auth.service");
const ApiError = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      next(ApiError(400, "All fields are required"));
    }
    const data = await authService.signup({ email, password });
    const token = jwt.sign({ _id: data._id }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    const { password: pass, ...rest } = data._doc;
    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === "production",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body || {};
    if (!email && !password) {
      return next(ApiError(400, "All fields are required."));
    }
    const data = await authService.login({ email, password });
    const token = jwt.sign({ _id: data._id }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    const { password: pass, ...rest } = data?._doc;
    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === "production",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    next(error);
  }
};
const getMe = async (req, res, next) => {
  return res.status(200).json(req.user);
};

module.exports = {
  signup,
  login,
  getMe,
  logout,
};
