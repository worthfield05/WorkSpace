const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password must be at least 6 character"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("workflows", {
  ref: "Workflow",
  localField: "_id",
  foreignField: "userId",
});

userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id;
  await mongoose.model("Workflow").deleteMany({ userId });
  next();
});

userSchema.methods.encryptPassword = function (plainText) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainText, salt);
  return hash;
};
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = this.encryptPassword(this.password);
  return;
});

exports.User = mongoose.model("User", userSchema);
