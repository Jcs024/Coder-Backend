const express = require("express");
const router = express.Router();
const path = require("path");
const ProductManager = require("../managers/productManager");

const productPath = path.join(__dirname, "../data/products.json");
const productManager = new ProductManager(productPath);

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    console.log("Productos obtenidos para home:", products.length);
    res.render("pages/home", { 
      products,
      title: "Home - Productos" 
    });
  } catch (error) {
    console.error("Error en home:", error);
    res.render("pages/home", { 
      products: [],
      title: "Home - Productos" 
    });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    console.log("Productos obtenidos para realtime:", products.length);
    res.render("pages/realTimeProducts", { 
      products,
      title: "Productos en Tiempo Real",
      useSocket: true
    });
  } catch (error) {
    console.error("Error en realtime:", error);
    res.render("pages/realTimeProducts", { 
      products: [],
      title: "Productos en Tiempo Real",
      useSocket: true
    });
  }
});

module.exports = router;