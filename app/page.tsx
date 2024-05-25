'use client';

import React, { useState, useEffect } from 'react';
import SingleCard from './components/singleCard';
import Link from 'next/link';
import { useGlobalContext } from '@/context/globalContext';
import { useSession } from 'next-auth/react';
import Search from './components/search';
import Filters from './components/filters';

export default function Page() {
  const { data: clientSession } = useSession();
  const { allProducts, loading } = useGlobalContext();
  const [filteredProducts, setFilteredProducts] = useState(allProducts || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', brand: '', custom: '' });

  // Extract unique brands and categories
  const brands = Array.from(new Set(allProducts?.map(product => product.brand)));
  const categories = Array.from(new Set(allProducts?.map(product => product.category)));

  useEffect(() => {
    applyFilters(filters, searchTerm);
  }, [allProducts, searchTerm]);

  const applyFilters = (filters: { category: string; brand: string; custom: string }, searchTerm: string) => {
    let filtered = allProducts || [];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Apply custom filters
    if (filters.custom) {
      switch (filters.custom) {
        case 'asc_price':
          filtered = filtered.sort((a, b) => a.price - b.price);
          break;
        case 'desc_price':
          filtered = filtered.sort((a, b) => b.price - a.price);
          break;
        case 'asc_rating':
          filtered = filtered.sort((a, b) => a.rating - b.rating);
          break;
        case 'desc_rating':
          filtered = filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'asc_discount':
          filtered = filtered.sort((a, b) => a.discountPercentage - b.discountPercentage);
          break;
        case 'desc_discount':
          filtered = filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
          break;
        default:
          break;
      }
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      {loading && (
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping">
          loading
        </h1>
      )}

      {clientSession && (
        <>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} applyFilters={applyFilters} filters={filters} />
          <Filters
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            categories={categories}
            setFilteredProducts={setFilteredProducts}
            searchTerm={searchTerm}
          />
        </>
      )}

      <div className="flex flex-row items-center justify-center flex-wrap p-8 gap-5">
        {!loading &&
          filteredProducts?.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <SingleCard
                title={product.title}
                price={product.price}
                rating={product.rating}
                discountPercentage={product.discountPercentage}
                brand={product.brand}
                category={product.category}
              />
            </Link>
          ))}
      </div>
    </>
  );
}


