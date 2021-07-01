import CategoryController from "../controllers/CategoryController";
const express = require("express");
const router = express.Router();

router.get("/", CategoryController.getAllCategories);

router.get(
  "/subcategories/:categoryId",
  CategoryController.getSubcategoriesByCategoryId
);

router.get("/:categoryId", CategoryController.getCategoryById);

router.get(
  "/subcategory/:subcategoryId",
  CategoryController.getSubcategoryById
);

module.exports = router;
