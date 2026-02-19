import express from "express";
import { createProduct, deleteProduct, updateProduct, getAllProducts, getProductsById } from "../controller/productController.js";
import validateId from "../middleware/validateId.js";

const productRoute = express.Router();

productRoute.post("/", createProduct);
productRoute.get("/", getAllProducts);
productRoute.get("/:id", validateId, getProductsById);
productRoute.put("/:id", validateId, updateProduct);
productRoute.delete("/:id", validateId, deleteProduct);


export default productRoute;