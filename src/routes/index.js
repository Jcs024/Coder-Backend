const express = require("express");
const router = express.Router();

router.use("/products", require("./product.router"));
router.use("/carts", require("./cart.router"));

module.exports = router;
