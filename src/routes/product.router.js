const express = require("express");
const router = express.Router();
const ProductDAO = require("../dao/ProductDAO");
const ProductService = require("../services/productService");
const ProductController = require("../controllers/productController");

const productDAO = new ProductDAO();
const productService = new ProductService(productDAO);
const productController = new ProductController();

productController.productService = productService;

router.get("/", (req, res) => {
  const { limit, page, sort, query } = req.query;
  productController.getProducts(req, res, { limit, page, sort, query });
});

router.get("/:pid", (req, res) => productController.getProductById(req, res));
router.post("/", (req, res) => productController.addProduct(req, res));
router.put("/:pid", (req, res) => productController.updateProduct(req, res));
router.delete("/:pid", (req, res) => productController.deleteProduct(req, res));

module.exports = router;
