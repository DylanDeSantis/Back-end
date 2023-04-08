class ProductManager {
  #products;

  constructor() {
    this.#products = [];
  }

  #generateId = () => {
    let id;
    if (this.#products.length === 0) id = 1;
    else id = this.#products[this.#products.length - 1].id + 1;
    return id;
  };

  getProducts = () => {
    return this.#products;
  };

  addProduct = (title, description, price, ImageRute, stock) => {
    if (!title || !description || !price || !ImageRute || !stock) {
      console.error("Datos incompletos");
      return;
    }

    let id = this.#generateId();
    let newProduct = {
      id,
      title,
      description,
      price,
      ImageRute,
      stock,
    };
    this.#products.push(newProduct);
  };

  getProductById = (id) => {
    let productFound = this.#products.find((product) => product.id === id);
    if (!productFound) {
      console.error("Producto no encontrado");
      return;
    }
    return productFound;
  };

  updateProduct = (id, updates) => {
    const index = this.#products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.#products[index] = { ...this.#products[index], ...updates };
      return console.log("Producto actualizado");
    }

    return console.log("Error al actualizar");
  };

  deleteProduct = (id) => {
    const index = this.#products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.#products.splice(index, 1);
      return console.log("Producto eliminado");
    }

    return console.log("Error al eliminar el producto");
  };
}

const productManager = new ProductManager();
productManager.addProduct(
  "Pelota",
  "pelota redonda para Perro/Gato",
  200,
  "rutaImagen1",
  10
);
productManager.addProduct(
  "Bong Chico",
  "El mejor Bong para tu perro de raza chica",
  500,
  "rutaImagen2",
  6
);
productManager.addProduct(
  "Bong Mediano",
  "El mejor Bong para tu perro de raza mediana",
  700,
  "rutaImagen3",
  8
);
productManager.addProduct(
  "Bong Grande",
  "El mejor Bong para tu perro de raza grande",
  900,
  "rutaImagen4",
  4
);
productManager.addProduct(
  "Laser",
  "Trampa mortal para tu michi",
  550,
  "rutaImagen5",
  3
);

// console.log(productManager.getProducts());
// productManager.updateProduct(1, { price: 10000, stock: 6 });
// console.log(productManager.deleteProduct(2));
console.log(productManager.getProducts());
// console.log(productManager.addProduct());
// console.log(productManager.getProductById(2));
// console.log(productManager.getProductById(10));

module.exports = productManager;
