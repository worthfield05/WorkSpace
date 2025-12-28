const { User } = require("../models/user.model");
const ApiError = require("../utils/errorHandler");

exports.authService = {
  signup: async (obj) => {
    const user = new User({
      email: obj.email,
      password: obj.password,
    });
    await user.save();
    return user;
  },
  login: async (obj) => {
    const validEmail = await User.findOne({ email: obj.email });
    if (!validEmail || !(await validEmail.matchPassword(obj.password))) {
      throw new ApiError(400, "Invalid email or password");
    }
    return validEmail;
  },
};
