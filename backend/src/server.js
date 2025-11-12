import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectedDB from '../src/config/db.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
))

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.listen(PORT, ()=>{
    connectedDB().then(() => {
        console.log(`Server listening on port http://localhost:${PORT}`);
    });
})