import Product from "../models/product.model.js";
import mongoose from "mongoose";

// /api/products  
export const createProduct = async (req, res) => { 
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    try {
        const newProduct = new Product(product)
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in creating Product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    };
};


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.error("Error getting all products:", error.message)
        res.status(500).json({success: false, message: "server error"})
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; 

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { $set: updateData }, 
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete({_id: id});
        res.status(200).json({success: true, message: "product deleted successfully"})
    } catch (error) {
        console.error("Error deleting product:", error.message)
        res.status(500).json({success: false, message: "server error"})
    }
}
