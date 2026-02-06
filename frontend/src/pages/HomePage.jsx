import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product.js"
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    fetchProducts,
    products,
    deleteProduct,
    productToDelete,
    setProductToDelete,
    clearProductToDelete,
    updateProduct,
    productToUpdate,
    setProductToUpdate,
    clearProductToUpdate,
  } = useProductStore();
  // Local form state for the update modal inputs
  const [updateForm, setUpdateForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(()=>{
    fetchProducts();
  }, [fetchProducts])

  // When a product is selected for update, preload the form fields
  useEffect(() => {
    if (!productToUpdate) return;
    setUpdateForm({
      name: productToUpdate.name || "",
      price: productToUpdate.price || "",
      image: productToUpdate.image || "",
    });
  }, [productToUpdate]);

  // Save updated product (id comes from the selected product)
  const handleUpdate = async () => {
    if (!productToUpdate) return;
    await updateProduct(productToUpdate._id, {
      name: updateForm.name,
      price: updateForm.price,
      image: updateForm.image,
    });
    clearProductToUpdate();
  };

  // Confirm delete action (wired to store delete + close modal)
  const handleDelete = async () => {
    if (!productToDelete) return;
    await deleteProduct(productToDelete._id);
    // Close the modal after delete
    clearProductToDelete();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="w-full px-4 sm:px-6 lg:px-16 py-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col gap-6">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <span className="text-xl font-bold">+</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900">No available products</h2>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Create your first product to see it appear here. This space will automatically update
                  when you add items.
                </p>
                <button
                onClick={()=> navigate("/create")}
                className="mt-6 rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  Create Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => {
                  if (!product || !product._id) return null;
                  return (
                  <div
                    key={product._id}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={product.image || ""}
                        alt={product.name || "Product"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                        Featured
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                          <p className="text-sm text-slate-500">Premium selection</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                          ${product.price}
                        </span>
                      </div>
                      <div className="mt-auto flex gap-3">
                        {/* Open update modal instead of updating immediately */}
                        <button
                          onClick={() => setProductToUpdate(product)}
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        {/* Open confirmation modal instead of deleting immediately */}
                        <button 
                          onClick={()=> setProductToDelete(product)}
                          className="flex-1 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal (zustand-controlled) */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Delete product?</h3>
            <p className="mt-2 text-sm text-slate-500">
              This action cannot be undone. Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">{productToDelete.name}</span>?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={clearProductToDelete}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={()=> handleDelete()}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update modal (opens when you click Update) */}
      {productToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Update product</h3>
            <p className="mt-2 text-sm text-slate-500">
              Edit the fields below, then save your changes.
            </p>

            {/* Controlled inputs so we can update the product */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
                placeholder="Product name"
                value={updateForm.name}
                onChange={(e) => setUpdateForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
                placeholder="Price"
                value={updateForm.price}
                onChange={(e) => setUpdateForm((prev) => ({ ...prev, price: e.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
                placeholder="Image URL"
                value={updateForm.image}
                onChange={(e) => setUpdateForm((prev) => ({ ...prev, image: e.target.value }))}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={clearProductToUpdate}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={()=> handleUpdate()}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
