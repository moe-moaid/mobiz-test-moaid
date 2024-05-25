import { NewProduct, ApiResponse, SingleProduct } from "@/types/types";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";

// Create a new product
// Create a new product
export const createProduct = async (product: NewProduct): Promise<SingleProduct> => {
  const response = await axios.post(`${API_URL}/add`, product);
  return response.data;
};

// Fetch all products
export const fetchProducts = async (): Promise<SingleProduct[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    const products = response.data.products.map((product) => ({
      id: product.id,
      title: product.title,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.price,
      rating: product.rating,
      discountPercentage: product.discountPercentage,
      stock:product.stock,
      thumbnail:product.thumbnail,
    }));
    return products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

// Fetch a product
export const fetchProduct = async (id: number): Promise<SingleProduct> => {
  try {
    const response = await axios.get<SingleProduct>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

// Update a product
export const updateProduct = async (
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      title,
      description,
      price,
      discountPercentage
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating product");
  }
};

// Delete a product
export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting product");
  }
};
