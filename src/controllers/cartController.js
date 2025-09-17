class CartController {
  constructor() {
    this.cartService = null;
  }

  getAllCarts = async (req, res) => {
    try {
      const carts = await this.cartService.getAllCarts();
      res.json({
        success: true,
        count: carts.length,
        carts: carts
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }

  createCart = async (req, res) => {
    try {
      const newCart = await this.cartService.createCart();
      res.status(201).json({
        success: true,
        message: "Carrito creado exitosamente",
        cart: newCart
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }

  getCartById = async (req, res) => {
    try {
      const id = parseInt(req.params.cid);
      const cart = await this.cartService.getCartById(id);
      
      if (!cart) {
        return res.status(404).json({ 
          success: false,
          error: "Carrito no encontrado" 
        });
      }
      
      res.json({
        success: true,
        cart: cart
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }

  addProductToCart = async (req, res) => {
    try {
      const cartId = parseInt(req.params.cid);
      const productId = parseInt(req.params.pid);
      
      const updatedCart = await this.cartService.addProductToCart(cartId, productId);
      
      if (!updatedCart) {
        return res.status(404).json({ 
          success: false,
          error: "Carrito no encontrado" 
        });
      }
      
      res.json({
        success: true,
        message: "Producto agregado al carrito",
        cart: updatedCart
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }
}

module.exports = CartController;