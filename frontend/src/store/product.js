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
            const response = await ProductsAPI.create(newProduct);
            // Optimistic update: Add the new product to the current list
            set((state) => ({ 
                products: [response.data, ...state.products], 
                loading: false 
            }));
            return { success: true, message: "Product created successfully" }
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchProducts: async (userId) => {
        set({ loading: true, error: null });
        try {
            const response = await ProductsAPI.list(userId);
            set({ products: response.data, loading: false });
        } catch (err) {
            set({ error: err.message || "Failed to fetch", loading: false });
        }
    },

    updateProduct: async (id, updatedData) => {
        try {
            const response = await ProductsAPI.update(id, updatedData);
            set((state) => ({
                products: state.products.map((p) => (p._id === id ? response.data : p)),
            }));
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
