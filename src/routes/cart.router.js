const express = require("express");
const router = express.Router();
const CartDAO = require("../dao/CartDAO");
const CartService = require("../services/cartService");
const CartController = require("../controllers/cartController");

const cartDAO = new CartDAO();
const cartService = new CartService(cartDAO);
const cartController = new CartController(cartService);

router.delete("/:cid/products/:pid", (req, res) =>
  cartController.deleteProductFromCart(req, res)
);

router.put("/:cid/products/:pid", (req, res) =>
  cartController.updateProductQuantity(req, res)
);

router.post("/:cid/products/:pid", (req, res) =>
  cartController.addProductToCart(req, res)
);

router.get("/", (req, res) => cartController.getAllCarts(req, res));
router.post("/", (req, res) => cartController.createCart(req, res));
router.get("/:cid", (req, res) => cartController.getCartById(req, res));
router.put("/:cid", (req, res) => cartController.updateCartProducts(req, res));
router.delete("/:cid", (req, res) => cartController.clearCart(req, res));

module.exports = router;
