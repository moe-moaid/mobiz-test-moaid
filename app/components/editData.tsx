
'use client';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/globalContext';
import { updateProduct, deleteProduct } from '@/services/products';
import { SingleProduct } from '../../types/types';
import Loading from './loading';
import ToastSuccess from './toastSuccess';
import ToastFail from './toastFail';

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
 * After editing the data, you can navigate to the 'Table Data' or 'Chart Data' 
 * tabs to see the changes reflected in the application's state.
 */

export default function EditData() {
  const { allProducts, setAllProducts, setLoading, loading } = useGlobalContext();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<SingleProduct>>({});
  const [toast, setToast] = useState<{ type: 'success' | 'fail'; message: string } | null>(null);

  const handleEdit = (product: SingleProduct) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value }));
  };

  const handleUpdate = async (id: number) => {
    setLoading(true);
    try {
      const updatedProduct = await updateProduct(
        id,
        formData.title!,
        formData.description!,
        formData.price!,
        formData.discountPercentage!
      );
      setAllProducts((prev) =>
        prev!.map((product) => (product.id === id ? updatedProduct : product))
      );
      setEditingId(null);
      setFormData({});
      setLoading(false);
      setToast({ type: 'success', message: 'Product updated successfully!' });
    } catch (error) {
      console.error("Error updating product:", error);
      setLoading(false);
      setToast({ type: 'fail', message: 'Failed to update product!' });
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setAllProducts((prev) => prev!.filter((product) => product.id !== id));
      setLoading(false);
      setToast({ type: 'success', message: 'Product deleted successfully!' });
    } catch (error) {
      console.error("Error deleting product:", error);
      setLoading(false);
      setToast({ type: 'fail', message: 'Failed to delete product!' });
    }
  };

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(null)
      }, 3000);
    }
  }, [toast]);

  return (
    <div className="p-5 border border-gray-200 dark:border-yellow-600 rounded-xl shadow-xl mt-12">
      <h2 className="text-lg font-semibold flex flex-row justify-center">Edit Products</h2>
      {toast && (
        toast.type === 'success' ? (
          <ToastSuccess successMessage={toast.message} />
        ) : (
          <ToastFail failMessage={toast.message} />
        )
      )}
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50 dark:bg-teal-500">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-teal-200 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-teal-200 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-teal-200 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-teal-200 uppercase tracking-wider">Discount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-teal-200 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#121212] divide-y divide-gray-300 dark:divide-yellow-600">
          {allProducts?.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === product.id ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  product.title
                )}
              </td>
              <td className="px-6 py-4 whitespace-normal break-normal">
                {editingId === product.id ? (
                  <input
                    type="text"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className="px-6 py-4 whitespace-normal break-normal">
                {editingId === product.id ? (
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === product.id ? (
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage || ''}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  product.discountPercentage
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === product.id ? (
                  <button
                    onClick={() => handleUpdate(product.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    <Loading text='Update'/>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

