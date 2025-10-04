class CartService {
  constructor(cartDAO) {
    this.cartDAO = cartDAO;
  }

  async createCart() {
    return await this.cartDAO.createCart();
  }

  async getCartById(id) {
    return await this.cartDAO.getCartById(id);
  }

  async getAllCarts() {
    return await this.cartDAO.getAllCarts();
  }

  async addProductToCart(cartId, productId) {
    return await this.cartDAO.addProductToCart(cartId, productId);
  }

  async deleteProductFromCart(cartId, productId) {
    return await this.cartDAO.deleteProductFromCart(cartId, productId);
  }

  async updateCartProducts(cartId, products) {
    return await this.cartDAO.updateCartProducts(cartId, products);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return await this.cartDAO.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
  }

  async clearCart(cartId) {
    return await this.cartDAO.clearCart(cartId);
  }
}

module.exports = CartService;
