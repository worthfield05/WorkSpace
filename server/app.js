const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
// const xss = require("xss-clean");
const errorMiddleware = require("./middlewares/error.middleware");
const authRoute = require("./routes/auth.route");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(hpp()); // URL pollution
// app.use(xss());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);

app.use(errorMiddleware);
module.exports = app;
