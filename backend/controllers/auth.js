const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array()[0] });
    }

    // if (!req.files) {
    //   return res
    //     .status(400)
    //     .json({ status: "ERROR", message: "No image Uploaded" });
    // }

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("User Already Exists");
      error.httpStatusCode = 422;
      return next(error);
    }

    // let result;

    // let file = req.files.image;

    // result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    //   folder: "blogs",
    //   unique_filename: true,
    //   transformation: [
    //     { width: 400, height: 250, gravity: "face", crop: "fill" },
    //   ],
    // });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: {
        id: "image id",
        secure_url: "secure url def",
      },
    });

    await newUser.save();
    return res.status(200).json({ message: "User Created Successfully!" });
  } catch (err) {
    console.log(err);
    const error = new Error("Please try again later!");
    error.httpStatusCode = 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Login Logic
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array()[0] });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return next(error);
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      const error = new Error("Invalid Credentials");
      error.message = "Incorrect Password";
      error.httpStatusCode = 401;
      return next(error);
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, userId: user._id.toString() });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(err);
  }
};
