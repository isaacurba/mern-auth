import { create } from "zustand";
import { ProductsAPI } from "@/services/api";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,
    // Modal state for delete confirmation
    productToDelete: null,
    setProductToDelete: (product) => set({ productToDelete: product }),
    clearProductToDelete: () => set({ productToDelete: null }),
    // Modal state for update popup
    productToUpdate: null,
    setProductToUpdate: (product) => set({ productToUpdate: product }),
    clearProductToUpdate: () => set({ productToUpdate: null }),

    // Actions
    createProduct: async (newProduct) => {
        set({ loading: true });
        try {
            // ProductsAPI now returns response.data directly
            const response = await ProductsAPI.create(newProduct);
            const createdProduct = response?.data;
            if (createdProduct && createdProduct._id) {
                set((state) => ({ 
                    products: [createdProduct, ...state.products], 
                    loading: false 
                }));
            } else {
                set({ loading: false });
            }
            return { success: true, message: "Product created successfully" }
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchProducts: async (userId) => {
        set({ loading: true, error: null });
        try {
            // ProductsAPI now returns response.data directly
            const response = await ProductsAPI.list(userId);
            const products = response?.data || [];
            // Filter out any null/undefined entries
            const validProducts = Array.isArray(products) ? products.filter(p => p && p._id) : [];
            set({ products: validProducts, loading: false });
        } catch (err) {
            set({ error: err.message || "Failed to fetch", loading: false });
        }
    },

    updateProduct: async (id, updatedData) => {
        try {
            // ProductsAPI now returns response.data directly
            const response = await ProductsAPI.update(id, updatedData);
            const updated = response?.data;
            if (updated && updated._id) {
                set((state) => ({
                    products: state.products.map((p) => (p._id === id ? updated : p)),
                }));
            }
        } catch (err) {
            set({ error: err.message });
        }
    },    

    deleteProduct: async (id) => {
        try {
            await ProductsAPI.delete(id);

            // update ui immediately without needing a refresh
            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
            }));
        } catch (err) {
            set({ error: err.message });
        }
    },

}));
