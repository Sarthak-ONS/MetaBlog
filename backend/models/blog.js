const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readTime: {
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
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
