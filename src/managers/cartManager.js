const fs = require("fs/promises");
const path = require("path");
const cartPath = path.join(__dirname, "data", "carts.json");

class CartManager {
  constructor(cartPath) {
    this.cartPath = cartPath;
  }

 async #readFile() {
  try {
    const data = await fs.readFile(this.cartPath, "utf-8");
    const parsedData = JSON.parse(data);
  
    if (!Array.isArray(parsedData)) {
      console.warn("El archivo de carritos no es un array. Corrigiendo...");
      return [];
    }
    
    return parsedData;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    console.error("Error leyendo archivo:", error.message);
    return [];
  }
}
  async #writeFile(carts) {
    try {
      await fs.writeFile(this.cartPath, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.error("Error al escribir el archivo:", error);
    }
  }

  async createCart() {
    try {
      const carts = await this.#readFile();

      const newCart = {
        id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
        products: [],
      };

      carts.push(newCart);
      await this.#writeFile(carts);
      return newCart;
    } catch (error) {
      console.error("Error al crear el carrito:", error.message);
      return null;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.#readFile();
      const cart = carts.find((c) => c.id === id);

      if (!cart) {
        console.error("No se encontró el carrito con id:", id);
        return null;
      }

      return cart;
    } catch (error) {
      console.error("Error al buscar el carrito:", error.message);
      return null;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.#readFile();
      const cart = carts.find((c) => c.id === cartId);

      if (!cart) {
        console.error("No se encontró el carrito con id:", cartId);
        return null;
      }

      const existingProduct = cart.products.find((p) => p.product === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 }); 
      }

      await this.#writeFile(carts);
      return cart;
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      return null;
    }
  }
}


module.exports = CartManager;
