const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary");
const Blog = require("../models/blog");

const categories = [
  { index: 1, name: "Food" },
  { index: 2, name: "Travel" },
  { index: 3, name: "Health and fitness" },
  { index: 4, name: "Lifestyle" },
  { index: 5, name: "Photography" },
  { index: 6, name: "Business" },
  { index: 7, name: "Movie" },
  { index: 8, name: "Political" },
  { index: 9, name: "Religion" },
  { index: 10, name: "Book writing" },
  { index: 11, name: "Web Development" },
  { index: 12, name: "App Development" },
  { index: 13, name: "Flutter" },
  { index: 14, name: "ReactJS" },
  { index: 15, name: "NodeJS" },
];

exports.getCategories = async (req, res, next) => {
  res.status(200).json({ status: "SUCCESS", categories });
};

exports.getSingleBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId)
      .populate("author", ["name", "email", "image"])
      .exec();

    if (!blog) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Blog Not found" });
    }
    return res.status(200).json({
      status: "SUCCESS",
      blog,
    });
  } catch (error) {
    const err = new Error();
    err.message = "Failed to Fetch Blog";
    err.httpStatusCode = 422;
    return next(err);
  }
};

exports.createNewBlog = async (req, res, next) => {
  const { title, content, category, tags } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ status: "ERROR", errors: errors.array()[0] });
  }

  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "No image Uploaded" });
    }

    let result;

    let file = req.files.image;

    result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "blogs",
      unique_filename: true,
      transformation: {
        responsive: true,
        width: "auto",
        crop: "crop",
        aspect_ratio: 16 / 9,
      },
    });

    console.log(req.userId, "////////*********");

    const blog = new Blog({
      title,
      content,
      category: [category],
      tags: [tags],
      image: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
      author: req.userId,
    });

    await blog.save();

    res.status(200).json({
      status: "SUCCESS",
      blogId: blog._id,
      message: "Blog created Successfully!",
    });
  } catch (error) {
    const err = new Error("Failed to create a new Blog");
    err.httpStatusCode = 422;
    return next(err);
  }
};

exports.deleteSingleBlog = async (req, res, next) => {
  const { blogId } = req.body;
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      const err = new Error("Blog not found");
      err.httpStatusCode = 404;
      return next(err);
    }
    if (blog.author.toString() !== req.userId) {
      const err = new Error("You are not authorized to delete this blog");
      err.httpStatusCode = 401;
      return next(err);
    }

    await blog.remove();
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Successfully deleted blog." });
  } catch (error) {
    const err = new Error("Failed to delete blog");
    err.httpStatusCode = 422;
    return next(err);
  }
};
