import axios from "axios";

const API =
  import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/api";              

const client = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Handle errors globally
client.interceptors.response.use(
    (response) => response,
    (error) => {
        // This extracts the "message" from your backend's res.status(400).json(...)
        const message = error.response?.data?.message || "Something went wrong";
        return Promise.reject(message);
    }
);

export const ProductsAPI = {
    list : async (userId = null) => {
        const response = await client.get("/products", { params: userId ? { userId: userId } : {} })
        return response.data;
    },

    create : async (newProduct) => {
        const response = await client.post("/products", newProduct)
        return response.data;
    },

    update : async (id, updatedProduct) => {
        const response = await client.put(`/products/${id}`, updatedProduct)
        return response.data;
    },
    delete : async (id) => {
        const response = await client.delete(`/products/${id}`)
        return response.data;
    }
}