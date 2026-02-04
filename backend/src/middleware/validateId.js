import mongoose from "mongoose";

export const validateId = async (req, res, next) =>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }
    next();
};

export default validateId;