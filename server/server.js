const app = require("./app");
const config = require("./config/config");
const { dbConfig } = require("./config/dbConfig");

app.listen(config.PORT, () => {
  console.log("Server is running on port", config.PORT);
  dbConfig();
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception", err);
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
  process.exit(1);
});
