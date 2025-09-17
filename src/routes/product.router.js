const express = require("express");
const router = express.Router();
const path = require("path");
const ProductManager = require("../managers/productManager");
const ProductService = require("../services/productService");
const ProductController = require("../controllers/productController");

const productPath = path.join(__dirname, "../data/products.json");
const productManager = new ProductManager(productPath);
const productService = new ProductService(productManager);
const productController = new ProductController();

productController.productService = productService;

router.get("/", (req, res) => productController.getProducts(req, res));
router.get("/:pid", (req, res) => productController.getProductById(req, res));
router.post("/", (req, res) => productController.addProduct(req, res));
router.put("/:pid", (req, res) => productController.updateProduct(req, res));
router.delete("/:pid", (req, res) => productController.deleteProduct(req, res));

module.exports = router;