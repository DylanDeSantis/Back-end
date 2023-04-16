const express = require("express");
const app = express();
const productsRouter = require("./src/routes/products.router.js");

app.use("/products", productsRouter);

app.listen(8080, () => console.log("server up"));
