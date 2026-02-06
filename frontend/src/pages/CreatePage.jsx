import { useState } from 'react'
import { useProductStore } from "../store/product.js"
import { useNavigate } from "react-router-dom"

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  })
  const navigate = useNavigate()
  const { createProduct, loading } = useProductStore()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateProduct =async (e) => {
    e.preventDefault()
    try {
      const { success, message } = await createProduct(formData)
      console.log('success:', success)
      console.log('message:', message)
      setFormData({ name: '', image: '', price: '' })
      navigate('/')
    } catch (error) {
      console.error("Error creating product:", error)
    }

  }

  return (
    <div className="w-full py-4 px-4 sm:px-6 lg:px-16">
      <div className="w-full lg:max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Product</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">          
          <form onSubmit={handleCreateProduct} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Product Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Product Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;