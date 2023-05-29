const crypto = require("crypto");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    resetToken: String,
    resetTokenExpiration: Date,
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.getForgotPasswordToken = function () {
  const forgotToken = crypto.randomBytes(30).toString("hex");
  this.resetToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  this.resetTokenExpiration = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

module.exports = mongoose.model("User", userSchema);
