import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectedDB from './config/db.js'; 
import productRoute from './productRoute/product.route.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/products", productRoute); 

// Connect DB then start server
connectedDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}).catch(err => console.log("DB Connection Error:", err));
