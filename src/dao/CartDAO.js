const Cart = require("../models/Cart");
const Product = require("../models/Product");

class CartDAO {
  async createCart() {
    try {
      const cart = new Cart({ products: [] });
      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw new Error(`Error creando carrito: ${error.message}`);
    }
  }

  async getCartById(id) {
    try {
      const cart = await Cart.findById(id)
        .populate("products.product", "title description price category stock")
        .lean();

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      return cart;
    } catch (error) {
      throw new Error(`Error obteniendo carrito: ${error.message}`);
    }
  }

  async getAllCarts() {
    try {
      const carts = await Cart.find()
        .populate("products.product", "title description price category stock")
        .lean();
      return carts;
    } catch (error) {
      throw new Error(`Error obteniendo carritos: ${error.message}`);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      const product = await Product.findById(productId);
      if (!product) throw new Error("Producto no encontrado");

      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: 1,
        });
      }

      const updatedCart = await cart.save();
      const populatedCart = await Cart.findById(updatedCart._id)
        .populate("products.product", "title description price category stock")
        .lean();

      return populatedCart;
    } catch (error) {
      throw new Error(`Error agregando producto al carrito: ${error.message}`);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      const initialLength = cart.products.length;
      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );

      if (cart.products.length === initialLength) {
        throw new Error("Producto no encontrado en el carrito");
      }

      const updatedCart = await cart.save();
      const populatedCart = await Cart.findById(updatedCart._id)
        .populate("products.product", "title description price category stock")
        .lean();

      return populatedCart;
    } catch (error) {
      throw new Error(
        `Error eliminando producto del carrito: ${error.message}`
      );
    }
  }

  async updateCartProducts(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Producto ${item.product} no encontrado`);
      }

      cart.products = products;
      const updatedCart = await cart.save();
      const populatedCart = await Cart.findById(updatedCart._id)
        .populate("products.product", "title description price category stock")
        .lean();

      return populatedCart;
    } catch (error) {
      throw new Error(`Error actualizando carrito: ${error.message}`);
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      if (quantity < 1) {
        throw new Error("La cantidad debe ser al menos 1");
      }

      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      const productItem = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (!productItem) throw new Error("Producto no encontrado en el carrito");

      productItem.quantity = quantity;
      const updatedCart = await cart.save();
      const populatedCart = await Cart.findById(updatedCart._id)
        .populate("products.product", "title description price category stock")
        .lean();

      return populatedCart;
    } catch (error) {
      throw new Error(`Error actualizando cantidad: ${error.message}`);
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      cart.products = [];
      const updatedCart = await cart.save();
      const populatedCart = await Cart.findById(updatedCart._id)
        .populate("products.product", "title description price category stock")
        .lean();

      return populatedCart;
    } catch (error) {
      throw new Error(`Error vaciando carrito: ${error.message}`);
    }
  }
}

module.exports = CartDAO;
