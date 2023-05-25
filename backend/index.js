const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", "vars", ".env") });

const mongoose = require("mongoose");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

const app = express();

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    abortOnLimit: true,
    safeFileNames: true,
    limitHandler: (req, res, next) => {
      const err = new Error("File too large, max 1MB is expected");
      err.httpStatusCode = 413;
      return next(err);
    },
  })
);

app.use((req, res, next) => {
  if (req.files) {
    const file = req.files.image;
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      return next();
    }
    const err = new Error("Invalid File. PNG, JPG, JPEG are allowed strictly.");
    err.httpStatusCode = 500;
    return next(err);
  }
  next();
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

app.use((error, req, res, next) => {
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
      console.log("DATABASE CONNECTED");
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
