const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/auth", authRoutes);

app.use("/blogs", categoriesRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    status: "ERROR",
    errorMessage: error.message,
    errorStatusCode: error.httpStatusCode,
  });
});

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
