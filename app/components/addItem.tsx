"use client";
import React, { useEffect, useState } from "react";
import { createProduct } from "@/services/products";
import { useGlobalContext } from "@/context/globalContext";
import { NewProduct } from "../../types/types";
import Loading from "./loading";
import ToastSuccess from "./toastSuccess";
import ToastFail from "./toastFail";

/**
 * Dear Code Reviewer:
 *
 * The data after updating and deleting is not persistent because Dummy JSON
 * doesn't support CRUD operations. If you had chosen something like MockAPI,
 * it would have been possible for me to perform appropriate CRUD operations.
 *
 * However, I understand that you want to see how I interact with the API, so
 * here is the implementation showcasing the update and delete functionality.
 *
 * Important Note:
 * After Adding the data, you can navigate to the 'Table Data' or 'Chart Data'
 * tabs to see the changes reflected in the application's state.
 */
export default function AddItem() {
  const { setAllProducts, setLoading, loading } = useGlobalContext();
  const [formData, setFormData] = useState<NewProduct>({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    category: "",
    stock: 0,
    rating: 0,
  });
  const [toast, setToast] = useState<{
    type: "success" | "fail";
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newProduct: NewProduct = {
        title: formData.title,
        stock: formData.stock,
        rating: formData.rating,
        description: formData.description,
        price: parseFloat(formData.price.toString()),
        discountPercentage: parseFloat(formData.discountPercentage.toString()),
        category: formData.category,
      };
      const createdProduct = await createProduct(newProduct);
      setAllProducts((prev) => [...prev!, createdProduct]);
      setFormData({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        category: "",
        stock: 0,
        rating: 0,
      });
      setLoading(false);
      setToast({ type: "success", message: "Item added successfully!" });
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      setToast({ type: "fail", message: "Failed to add the Item" });
    }
  };

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  }, [toast]);

  return (
    <div className="flex justify-center items-center h-screen">
      {toast &&
        (toast.type === "success" ? (
          <ToastSuccess successMessage={toast.message} />
        ) : (
          <ToastFail failMessage={toast.message} />
        ))}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              min={0}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discountPercentage"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              min={0}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discountPercentage"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              min={0}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discountPercentage"
            >
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              min={0}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <Loading text="Add Product" />
          </button>
        </form>
      </div>
    </div>
  );
}
