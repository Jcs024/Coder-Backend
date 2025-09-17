const path = require("path");
const ProductManager = require("../managers/productManager");

const productPath = path.join(__dirname, "../data/products.json");
const productManager = new ProductManager(productPath);

module.exports = (io) => {
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");
    
    try {
      const products = await productManager.getProducts();
      socket.emit("updateProducts", products);
    } catch (error) {
      console.error("Error enviando productos:", error);
      socket.emit("updateProducts", []);
    }
    
    socket.on("newProduct", async (productData) => {
      try {
        console.log("Nuevo producto recibido:", productData);
        
        const newProduct = await productManager.addProduct({
          title: productData.title,
          description: productData.description,
          price: parseFloat(productData.price),
          code: productData.code,
          stock: parseInt(productData.stock),
          category: productData.category,
          status: true,
          thumbnail: null
        });
        
        if (newProduct) {
          console.log("Producto creado exitosamente:", newProduct);
          const updatedProducts = await productManager.getProducts();
          io.emit("updateProducts", updatedProducts);
          socket.emit("productSuccess", "Producto agregado correctamente");
        } else {
          socket.emit("productError", "No se pudo crear el producto");
        }
      } catch (error) {
        console.error("Error agregando producto:", error);
        socket.emit("productError", error.message);
      }
    });
    
    socket.on("deleteProduct", async (productId) => {
      try {
        console.log("Eliminando producto ID:", productId);
        
        const deleted = await productManager.deleteProduct(parseInt(productId));
        if (deleted) {
          console.log("Producto eliminado:", deleted);
          const updatedProducts = await productManager.getProducts();
          io.emit("updateProducts", updatedProducts);
          socket.emit("productSuccess", "Producto eliminado correctamente");
        } else {
          socket.emit("productError", "No se pudo eliminar el producto");
        }
      } catch (error) {
        console.error("Error eliminando producto:", error);
        socket.emit("productError", error.message);
      }
    });
    
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};