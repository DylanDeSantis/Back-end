const manager = require("../../primerProyecto");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.status(200).send('<h1 style="color:blue">Hola Mundo!!!</h1>');
});

router.get("/products", (req, res) => {
  const limit = req.query.limit || 5;
  const products = manager.getProducts().slice(0, limit);
  res.status(200).send({ products });
});

router.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = manager.getProducts().find((item) => item.id === id);
  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado" });
  }
  res.status(200).send({ product });
});

router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = manager.getProducts().find((item) => item.id === id);
  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado" });
  }
  res.status(200).send({ product });
});

router.post("/products", (req, res) => {
  const productTitle = req.body.title;
  const productDescription = req.body.description;
  const productPrice = req.body.price;
  const productImageRute = req.body.imageRute;
  const productStock = req.body.stock;
  const newProduct = manager.addProduct(
    productTitle,
    productDescription,
    productPrice,
    productImageRute,
    productStock
  );
  res.status(201).send({ mensaje: "Producto creado", newProduct });
});

router.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = manager
    .getProducts()
    .findIndex((item) => item.id === id);
  if (productIndex < 0) {
    return res.status(404).send({ message: "Producto no encontrado" });
  }
  const updatedProduct = {
    ...manager.getProducts()[productIndex],
    ...req.body,
    id: manager.getProducts()[productIndex].id,
  };
  manager.getProducts()[productIndex] = updatedProduct;
  res.status(202).send({ message: "Producto actualizado" });
});

router.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = manager
    .getProducts()
    .findIndex((item) => item.id === id);
  if (productIndex < 0) {
    return res.status(404).send({ message: "Producto no encontrado" });
  }
  manager.getProducts().splice(productIndex, 1);
  res.status(204).send({ message: "Producto eliminado" });
});

module.exports = router;
