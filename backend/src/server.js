import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectedDB from './config/db.js'; 
import productRoute from './productRoute/product.route.js'; 

dotenv.config({ path: path.resolve("backend/.env") });
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoute);
if (process.env.NODE_ENV === 'production') {
    // Serve the Vite build output when running `npm run start`
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*splat', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get("/", (req, res) => res.send("Server is running..."));
}

// Connect DB then start server
connectedDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}).catch(err => console.log("DB Connection Error:", err));
