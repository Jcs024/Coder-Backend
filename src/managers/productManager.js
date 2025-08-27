const fs = require("fs/promises");
const path = require("path");
const productPath = path.join(__dirname, "data", "products.json");

class ProductManager{
  constructor(productPath){
    this.productPath = productPath;
  }
  async #readFile(){
  try {
    const data = await fs.readFile(this.productPath, "utf-8");
    const parsedData = JSON.parse(data);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    if(error.code === "ENOENT") return [];
    console.error("Error leyendo archivo:", error.message);
    return [];
  }
}
  async #writeFile(products){
    try {
      await fs.writeFile(this.productPath, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error("Error al escribir el archivo:", error);
    }
  }
async addProduct({ title, description, price, thumbnail, code, stock, status = true, category }) {
  try {
    console.log("Datos recibidos:", { title, description, price, code, stock, category });
    
    const products = await this.#readFile();
    console.log("Productos leídos:", products);

    // VALIDACIÓN MEJORADA
    const requiredFields = { title, description, price, code, stock, category };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === "") {
        throw new Error(`Campo obligatorio faltante: ${field}`);
      }
    }

    // Validar que price y stock sean números
    if (typeof price !== 'number' || typeof stock !== 'number') {
      throw new Error("Price y stock deben ser números");
    }

    // Resto del código igual...
    if (products.some((p) => p.code === code)) {
      throw new Error(`Ya existe un producto con el código ${code}`);
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      title,
      description,
      price,
      thumbnail: thumbnail || null,
      code,
      stock,
      status,
      category,
    };

    products.push(newProduct);
    await this.#writeFile(products);
    console.log("Producto creado exitosamente:", newProduct);
    return newProduct;
    
  } catch (error) {
    console.error("Error DETAILED en addProduct:", error.message);
    throw error;
  }
}


  async getProducts(){
    try {
        const products = await this.#readFile();
        if(!products){
            console.error("No se encontraron productos",error)
        }
        return products;
    } catch (error) {
      console.error("Error al traer los productos:",error);   
    }
  }

  async getProductById(id){
    try {
        const products = await this.#readFile();
        const product = products.find((p) => p.id === id);
        if(!product){
            console.error("No se encontro el producto",error);
        }
        return (product);
    } catch (error) {
        console.error("Error al encontrar el producto",error);
    }
  }

  async updateProduct(id, dataUpdateUser) {
  try {
    const products = await this.#readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...dataUpdateUser, 
    };

    await this.#writeFile(products);
    return products[index];
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    return null;
  }
}

  async deleteProduct(id) {
  try {
    const products = await this.#readFile();
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.error("No se encontró el producto con id:", id);
      return null;
    }
    const updatedProducts = products.filter((p) => p.id !== id);
    await this.#writeFile(updatedProducts);
    return product;

  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
}
}
module.exports = ProductManager;