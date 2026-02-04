import express from "express";
import { createProduct, deleteProduct, updateProduct, getAllProducts } from "../productController/productController.js";
import validateId from "../middleware/validateId.js";

const productRoute = express.Router();

productRoute.post("/", createProduct);
productRoute.get("/", getAllProducts);
productRoute.put("/:id", validateId, updateProduct);
productRoute.delete("/:id", validateId, deleteProduct);


export default productRoute;