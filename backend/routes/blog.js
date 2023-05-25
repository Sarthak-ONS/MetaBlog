const { check, body } = require("express-validator");

const router = require("express").Router();

const blogControllers = require("../controllers/blog");

const isAuth = require("../middleware/is-Auth");

router.get("/categories", blogControllers.getCategories);

router.get("/:blogId", isAuth, blogControllers.getSingleBlog);

router.post(
  "/new",
  isAuth,
  [
    body("title", "Invalid Title").trim().isLength({ min: 10, max: 30 }),
    body("content", "Invalid Content").trim().isLength({ min: 20 }),
    body("tags").trim().isLength({ min: 2 }).withMessage("Invalid Tags"),
    body("category")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Invalid Categories"),
  ],
  blogControllers.createNewBlog
);

router.delete("/:blogId", isAuth, blogControllers.deleteSingleBlog);

module.exports = router;
