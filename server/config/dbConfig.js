const mongoose = require("mongoose");
const config = require("./config");
exports.dbConfig = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
