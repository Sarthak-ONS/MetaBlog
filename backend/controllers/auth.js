const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");

const User = require("../models/user");
const { default: sendMail } = require("../utils/email-util");

let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "herculesproject7@outlook.com",
    pass: "hercules7@7",
  },
});

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

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  console.log(email);

  const user = await User.findOne({ email });
  try {
    if (!user) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return next(error);
    }

    const forgotToken = user.getForgotPasswordToken();
    await user.save();
    const myUrl = `${req.protocol}://localhost:3000/auth/password/reset/${forgotToken}`;

    const options = {
      email: email,
      subject: "Forgot Password",
      html: `

      Hey there, Please click on the link below to reset your password.

      ${myUrl}

      `,
    };

    transporter.sendMail(
      {
        from: "herculesproject7@outlook.com",
        to: options.email,
        subject: options.subject,
        html: options.html,
      },
      (err, inf) => {
        if (err) {
          console.log("EMAIL SENT FAILED");
        }
        console.log("EMAIL SENT SUCCESSFULLY");
      }
    );

    res.status(200).json({ status: "SUCCESS", message: "Email is sent" });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    const err = new Error("Could not validate Forgot Password Reqesut.");
    err.httpStatusCode = 400;
    return next(err);
  }
};

exports.passwordReset = async (req, res, next) => {
  const { token } = req.params;

  console.log(token, "THis is the token");

  try {
    const encryptedtoken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    console.log(encryptedtoken);

    const user = await User.findOne({
      resetToken: encryptedtoken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      const err = new Error("Invalid Token or token is expired");
      err.httpStatusCode = 400;
      return next(err);
    }
    if (!req.body.password) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Password is Required" });
    }
    console.log(user);

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    const options = {
      email: user.email,
      subject: "Password Changed Successfully",
      html: `
      Hey there, You have recently changed your password.
      `,
    };

    transporter.sendMail(
      {
        from: "herculesproject7@outlook.com",
        to: options.email,
        subject: options.subject,
        html: options.html,
      },
      (err, inf) => {
        if (err) {
          console.log("EMAIL SENT FAILED");
        }
        console.log("EMAIL SENT SUCCESSFULLY");
      }
    );

    res.status(200).json({ status: "SUCCESS", message: "Email is sent" });
  } catch (error) {
    console.log(error);
    const err = new Error("Password Changed request failed");
    err.httpStatusCode = 500;
    return next(err);
  }
};
