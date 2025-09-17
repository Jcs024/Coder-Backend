class CartService {
  constructor(cartManager) {
    this.cartManager = cartManager;
  }

  async getAllCarts() {
    return await this.cartManager.getAllCarts();
  }

  async createCart() {
    return await this.cartManager.createCart();
  }

  async getCartById(id) {
    return await this.cartManager.getCartById(id);
  }

  async addProductToCart(cartId, productId) {
    if (!cartId || !productId) {
      throw new Error("Campos requeridos faltantes: cartId, productId");
    }
    return await this.cartManager.addProductToCart(cartId, productId);
  }
}

module.exports = CartService;