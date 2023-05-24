const router = require("express").Router();

const categoriesController = require("../controllers/categories");

router.get("/categories", categoriesController.getCategories);

module.exports = router;
