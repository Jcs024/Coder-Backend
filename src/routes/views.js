const express = require("express");
const router = express.Router();
const ProductDAO = require("../dao/ProductDAO");
const CartDAO = require("../dao/CartDAO");

const productDAO = new ProductDAO();
const cartDAO = new CartDAO();


router.get("/", async (req, res) => {
  try {
    const products = await productDAO.getProducts({ limit: 10, page: 1 });
    res.render("pages/home", {
      products: products.payload,  
      title: "Home - Productos",
    });
  } catch (error) {
    console.error('Error en home:', error);
    res.render("pages/home", {
      products: [],
      title: "Home - Productos",
    });
  }
});
router.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const products = await productDAO.getProducts({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query,
    });

    res.render("pages/products", {
      ...products,
      query: req.query,
      title: "Productos",
    });
  } catch (error) {
    res.render("pages/products", {
      status: "error",
      payload: [],
      totalPages: 0,
      page: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevLink: null,
      nextLink: null,
      title: "Productos",
    });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const product = await productDAO.getProductById(req.params.pid);
    
    const productData = product ? product.toObject ? product.toObject() : product : null;
    
    res.render("pages/productDetail", {
      product: productData,
      title: productData ? productData.title : "Producto No Encontrado",
    });
  } catch (error) {
    console.error('Error en product detail:', error);
    res.status(404).render("pages/404", {
      title: "Producto No Encontrado",
      message: "El producto que buscas no existe",
    });
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartDAO.getCartById(req.params.cid);
    res.render("pages/cart", {
      cart: cart,
      title: "Mi Carrito",
    });
  } catch (error) {
    res.status(404).render("pages/404", {
      title: "Carrito No Encontrado",
      message: "El carrito que buscas no existe",
    });
  }
});


router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productDAO.getProducts({ limit: 100, page: 1 });
    
    res.render("pages/realTimeProducts", {
      products: products.payload,
      title: "Productos en Tiempo Real",
      useSocket: true,  
    });
  } catch (error) {
    console.error('Error cargando realtimeproducts:', error);
    res.render("pages/realTimeProducts", {
      products: [],
      title: "Productos en Tiempo Real",
      useSocket: true,  
    });
  }
});

module.exports = router;
