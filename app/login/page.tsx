"use client";
import { fetchProducts } from "@/services/products";
import { SingleProduct } from "@/types/types";
import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginForm";
import { ThemeProvider } from "next-themes";

export default function page() {
  const [allProducts, setAllProducts] = useState<SingleProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setAllProducts(products);
      } catch (error) {
        let errorMessage = "Failed to do fetch products";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-gray-300 dark:bg-[#121212] pt-6 px-5">
      <LoginForm />
      {/* {allProducts.map((product, i) => (
        <div>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))} */}
    </div>
  );
}
