const Product = require("../models/Product");

class ProductDAO {
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {

      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        lean: true,
        leanWithId: false,
      };

      if (sort === "asc" || sort === "desc") {
        options.sort = { price: sort === "asc" ? 1 : -1 };
      }

      let filter = {};
      if (query) {
        if (
          ["electronics", "clothing", "home", "sports", "books"].includes(
            query.toLowerCase()
          )
        ) {
          filter.category = { $regex: query, $options: "i" };
        }
        else if (query === "available") {
          filter.status = true;
          filter.stock = { $gt: 0 };
        }
        else {
          filter.title = { $regex: query, $options: "i" };
        }
      }

      const result = await Product.paginate(filter, options);

      const buildLink = (pageNum) => {
        const params = new URLSearchParams();
        if (limit !== 10) params.append("limit", limit);
        if (query) params.append("query", query);
        if (sort) params.append("sort", sort);
        params.append("page", pageNum);

        return `/products?${params.toString()}`;
      };

      const response = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage || null,
        nextPage: result.nextPage || null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
        nextLink: result.hasNextPage ? buildLink(result.nextPage) : null,
      };

      return response;
    } catch (error) {
      console.error("❌ Error en getProducts:", error);
      throw new Error(`Error obteniendo productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      throw new Error(`Error obteniendo producto: ${error.message}`);
    }
  }

  async addProduct(productData) {
    try {
      const product = new Product(productData);
      const savedProduct = await product.save();
      return savedProduct;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("El código del producto ya existe");
      }
      throw new Error(`Error creando producto: ${error.message}`);
    }
  }

  async updateProduct(id, productData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        throw new Error("Producto no encontrado");
      }

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error actualizando producto: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        throw new Error("Producto no encontrado");
      }

      return deletedProduct;
    } catch (error) {
      throw new Error(`Error eliminando producto: ${error.message}`);
    }
  }
}

module.exports = ProductDAO;
