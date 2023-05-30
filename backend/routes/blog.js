const { check, body } = require("express-validator");

const router = require("express").Router();

const blogControllers = require("../controllers/blog");

const isAuth = require("../middleware/is-Auth");

router.get("/", blogControllers.getBlogs);

// GET all Categories
router.get("/categories", blogControllers.getCategories);

// GET Single Blog
router.get("/:blogId", blogControllers.getSingleBlog);

// POST create new Blog
router.post(
  "/new",
  isAuth,
  [
    body("title", "Invalid Title").trim().isLength({ min: 10 }),
    body("subtitle", "Invalid Subtitle").trim().isLength({ min: 10 }),
    body("content", "Invalid Content").trim().isLength({ min: 20 }),
    body("tags").trim().isLength({ min: 2 }).withMessage("Invalid Tags"),
    body("category")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Invalid Categories"),
  ],
  blogControllers.createNewBlog
);

// UPDATE update your blog
router.put("/:blogId", isAuth, blogControllers.updateBlog);

// DEL Delete Single Blog
router.delete("/:blogId", isAuth, blogControllers.deleteSingleBlog);

router.get("/:blogId/bookmark", isAuth, blogControllers.bookMark);
router.get("/:blogId/bookmark/check", isAuth, blogControllers.checkbookMark);

module.exports = router;
