import axios from "axios";
import toast from "react-hot-toast"; 

// Use the backend proxy in dev and the same-origin /api in prod builds.
// This avoids relying on VITE_API_URL being set in production.
const API = "/api";              

const client = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.response.use(
    (response) => {
        // Automatically toast success for mutations (Create, Update, Delete)
        if (["post", "put", "delete"].includes(response.config.method)) {
            toast.success(response?.data?.message || "Action successful!");
        }
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message); // Global error notification
        return Promise.reject(message);
    }
);

export const ProductsAPI = {
    list : async (userId = null) => {
        // Keep response shape consistent across all API calls
        const response = await client.get("/products", { params: userId ? { userId } : {} });
        return response.data;
    },

    create : async (newProduct) => {
        const response = await client.post("/products", newProduct);
        return response.data;
    },

    update : async (id, updatedProduct) => {
        const response = await client.put(`/products/${id}`, updatedProduct);
        return response.data;
    },

    delete : async (id) => {
        const response = await client.delete(`/products/${id}`);
        return response.data;
    }
};
