'use client';
import React, { useMemo } from 'react';
import { useGlobalContext } from '@/context/globalContext';

export default function MatrixData() {
  const { allProducts } = useGlobalContext();

  const averageRating = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return 0;

    const validRatings = allProducts
      .map(product => parseFloat(product.rating.toString()))
      .filter(rating => !isNaN(rating) && rating >= 0);

    if (validRatings.length === 0) return 0;

    const totalRating = validRatings.reduce((acc, rating) => acc + rating, 0);
    return (totalRating / validRatings.length).toFixed(2);
  }, [allProducts]);

  return (
    <div className="p-5 border border-gray-200 rounded-xl shadow-xl mt-12 w-full md:w-[40%] lg:w-[25%] mx-auto">
      <h2 className="text-lg font-semibold">Key Metrics</h2>
      <div className="mt-4">
        <p className="text-md">Average Rating of all Products:</p>
        <p className="text-2xl font-bold">{averageRating}</p>
      </div>
    </div>
  );
}
