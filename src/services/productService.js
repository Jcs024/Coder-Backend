class ProductService {
  constructor(productManager) {
    this.productManager = productManager;
  }

  async getProducts() {
    return await this.productManager.getProducts();
  }

  async getProductById(id) {
    return await this.productManager.getProductById(id);
  }

  async addProduct(productData) {
    const requiredFields = ['title', 'description', 'price', 'code', 'stock', 'category'];
    const missingFields = requiredFields.filter(field => !productData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }

    return await this.productManager.addProduct(productData);
  }

  async updateProduct(id, productData) {
    return await this.productManager.updateProduct(id, productData);
  }

  async deleteProduct(id) {
    return await this.productManager.deleteProduct(id);
  }
}

module.exports = ProductService;