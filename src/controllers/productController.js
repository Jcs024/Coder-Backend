class ProductController {
  constructor() {
    this.productService = null;
  }

  getProducts = async (req, res, options = {}) => {
    try {
      const { limit, page, sort, query } = options;
      const result = await this.productService.getProducts({
        limit: parseInt(limit),
        page: parseInt(page),
        sort,
        query,
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  getProductById = async (req, res) => {
    try {
      const id = parseInt(req.params.pid);
      const product = await this.productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  addProduct = async (req, res) => {
    try {
      const data = req.body;
      const newProduct = await this.productService.addProduct(data);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const id = parseInt(req.params.pid);
      const data = req.body;
      const updated = await this.productService.updateProduct(id, data);
      if (!updated) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const id = parseInt(req.params.pid);
      const deleted = await this.productService.deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(deleted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ProductController;
