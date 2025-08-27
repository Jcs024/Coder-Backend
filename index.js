const express = require('express');
const path = require("path");
const ProductManager = require("./src/managers/productManager");
const CartManager = require("./src/managers/cartManager");
const cartPath = path.join(__dirname, "src", "data", "carts.json");
const cartManager = new CartManager(cartPath);

const app = express();
const port = 8080;

app.use(express.json());

const productPath = path.join(__dirname, "src", "data", "products.json");
const productManager = new ProductManager(productPath);

app.get("/api/products", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

app.get("/api/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
});

app.post("/api/products", async (req, res) => {
  try {
    console.log("Body recibido:", req.body);
    const data = req.body;
    const newProduct = await productManager.addProduct(data);
    
    if (!newProduct) {
      return res.status(400).json({ error: "No se pudo crear el producto" });
    }
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error en POST /api/products:", error.message);
    res.status(400).json({ error: error.message }); 
  }
});

app.put("/api/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const data = req.body;
  const updated = await productManager.updateProduct(id, data);
  if (!updated) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(updated);
});

app.delete("/api/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const deleted = await productManager.deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(deleted);
});




app.post("/api/carts", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

app.get("/api/carts/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(id);
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  res.json(cart);
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const product = await productManager.getProductById(productId);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const updatedCart = await cartManager.addProductToCart(cartId, productId);
  if (!updatedCart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(updatedCart);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
