import Product from "../models/product.model.js";

//CREATE
export const createProduct = async (req, res) => { 
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    try {
        const newProduct = new Product(product)
        await newProduct.save();
        return res.status(201).json({success: true, message: "Product created successfully", data: newProduct});
        
    } catch (error) {
        console.error("Error in creating Product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    };
};

//READ
export const getAllProducts = async (req, res) => {

    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    try {
        const products = await Product.find(filter).sort({ createdAt: -1 })
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.error("Error getting all products:", error.message)
        res.status(500).json({success: false, message: "server error"})
    }
}

export const getProductsById = async (req, res) => { 
    const { id } = req.params;
    try {
        const product = await Product.findById(id)
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.error("Error getting product:", error.message)
        res.status(500).json({success: false, message: "server error"})
    }
}

//UPDATE
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

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//DELETE
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error.message)
        res.status(500).json({success: false, message: "server error"})
    }
}
