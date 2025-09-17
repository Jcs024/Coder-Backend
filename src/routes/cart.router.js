const express = require("express");
const router = express.Router();
const path = require("path");
const CartManager = require("../managers/cartManager");
const CartService = require("../services/cartService");
const CartController = require("../controllers/cartController");

const cartPath = path.join(__dirname, "../data/carts.json");
const cartManager = new CartManager(cartPath);
const cartService = new CartService(cartManager);
const cartController = new CartController();

cartController.cartService = cartService;

router.get("/", (req, res) => cartController.getAllCarts(req, res));
router.post("/", (req, res) => cartController.createCart(req, res));
router.get("/:cid", (req, res) => cartController.getCartById(req, res));
router.post("/:cid/product/:pid", (req, res) => cartController.addProductToCart(req, res));

module.exports = router;