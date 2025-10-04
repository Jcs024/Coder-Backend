class CartController {
  constructor(cartService = null) {
    this.cartService = cartService;
  }

  checkService() {
    if (!this.cartService) {
      throw new Error("CartService no está disponible");
    }
  }

  getAllCarts = async (req, res) => {
    try {
      this.checkService();
      const carts = await this.cartService.getAllCarts();
      res.json({
        success: true,
        count: carts.length,
        carts: carts,
      });
    } catch (error) {
      console.error("Error en getAllCarts:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  createCart = async (req, res) => {
    try {
      this.checkService();
      const newCart = await this.cartService.createCart();
      res.status(201).json({
        success: true,
        message: "Carrito creado exitosamente",
        cart: newCart,
      });
    } catch (error) {
      console.error("Error en createCart:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  getCartById = async (req, res) => {
    try {
      const cart = await this.cartService.getCartById(req.params.cid);
      res.json({
        success: true,
        cart: cart,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await this.cartService.addProductToCart(cid, pid);

      res.json({
        success: true,
        message: "Producto agregado al carrito",
        cart: updatedCart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  deleteProductFromCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await this.cartService.deleteProductFromCart(
        cid,
        pid
      );
      res.json({
        success: true,
        message: "Producto eliminado del carrito",
        cart: updatedCart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  updateCartProducts = async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      if (!Array.isArray(products)) {
        return res.status(400).json({
          success: false,
          error: "El cuerpo debe contener un array de productos",
        });
      }

      const updatedCart = await this.cartService.updateCartProducts(
        cid,
        products
      );
      res.json({
        success: true,
        message: "Carrito actualizado",
        cart: updatedCart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  updateProductQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          error: "La cantidad debe ser un número mayor a 0",
        });
      }

      const updatedCart = await this.cartService.updateProductQuantity(
        cid,
        pid,
        quantity
      );
      res.json({
        success: true,
        message: "Cantidad actualizada",
        cart: updatedCart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  clearCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const updatedCart = await this.cartService.clearCart(cid);
      res.json({
        success: true,
        message: "Carrito vaciado",
        cart: updatedCart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
}

module.exports = CartController;
