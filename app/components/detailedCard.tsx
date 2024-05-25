"use client";
import { useGlobalContext } from "@/context/globalContext";
import { fetchProduct } from "@/services/products";
import { SingleProduct } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  productId: number;
};

export default function DetailedCard({ productId }: Props) {
  const { allProducts, setLoading, loading } = useGlobalContext();
  const [product, setProduct] = useState<SingleProduct>();

  //   const getProduct = allProducts?.find((p) => p.id == productId);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const singleProduct = await fetchProduct(productId);
        setProduct(singleProduct);
      } catch (error) {
        let errorMessage = "Failed to fetch products";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  console.log(loading);

  return (
    <>
      {loading && (
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping">
          Loading
        </h1>
      )}
      {!loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%]">
          <div className="flex flex-col justify-center items-center bg-gray-200 w-1/3 mx-auto p-4 rounded-lg shadow-lg">
            {product?.images?.[0] && (
              <Image
                className="border border-gray-400 rounded-lg"
                src={product.images[0]}
                width={300}
                height={300}
                alt="Product Picture"
              />
            )}
            <div className="flex flex-row justify-between w-full mt-8 mb-4 items-center">
              <h1 className="font-semibold">{product?.title}</h1>
              <p className="bg-red-400 px-2 py-1 rounded-full text-white font-semi-bold">
                Save {product?.discountPercentage}%
              </p>
            </div>
            <p>{product?.description}</p>
            <p>Get it @ only ${product?.price}</p>
          </div>
        </div>
      )}
    </>
  );
}
