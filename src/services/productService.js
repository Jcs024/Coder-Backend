class ProductService {
  constructor(productDAO) {
    this.productDAO = productDAO;
  }

  async getProducts(options = {}) {
    return await this.productDAO.getProducts(options);
  }

  async getProductById(id) {
    return await this.productDAO.getProductById(id);
  }

  async addProduct(productData) {
    const requiredFields = [
      "title",
      "description",
      "price",
      "code",
      "stock",
      "category",
    ];
    const missingFields = requiredFields.filter((field) => !productData[field]);

    if (missingFields.length > 0) {
      throw new Error(
        `Campos requeridos faltantes: ${missingFields.join(", ")}`
      );
    }
    return await this.productDAO.addProduct(productData);
  }

  async updateProduct(id, productData) {
    return await this.productDAO.updateProduct(id, productData);
  }

  async deleteProduct(id) {
    return await this.productDAO.deleteProduct(id);
  }
}

module.exports = ProductService;
