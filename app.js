const express = require("express");
const manager = require("./primerProyecto.js");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send('<h1 style="color:blue">Hola Mundo!!!</h1>');
});

app.get("/products", (req, res) => {
  const products = manager.getProducts();
  res.status(200).send({ products });
});

app.post("/products", (req, res) => {
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

app.put("/products/:id", (req, res) => {
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

app.delete("/products/:id", (req, res) => {
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

app.listen(8080, () => console.log("Server Up"));
