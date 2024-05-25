'use client';

import React, { useEffect } from 'react';
import { useGlobalContext } from '@/context/globalContext';

type FiltersProps = {
  filters: { category: string; brand: string; custom: string };
  setFilters: React.Dispatch<React.SetStateAction<{ category: string; brand: string; custom: string }>>;
  brands: string[];
  categories: string[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<any[]>>;
  searchTerm: string;
};

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, brands, categories, setFilteredProducts, searchTerm }) => {
  const { allProducts } = useGlobalContext();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };

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

  useEffect(() => {
    applyFilters(filters, searchTerm);
  }, [allProducts, filters, searchTerm]);

  return (
    <div className="flex justify-center my-4 space-x-4">
      <select name="category" value={filters.category} onChange={handleFilterChange} className="px-4 py-2 border rounded-lg">
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select name="brand" value={filters.brand} onChange={handleFilterChange} className="px-4 py-2 border rounded-lg">
        <option value="">All Brands</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>

      <select name="custom" value={filters.custom} onChange={handleFilterChange} className="px-4 py-2 border rounded-lg">
        <option value="">Custom Filters</option>
        <option value="asc_price">Price: Low to High</option>
        <option value="desc_price">Price: High to Low</option>
        <option value="asc_rating">Rating: Low to High</option>
        <option value="desc_rating">Rating: High to Low</option>
        <option value="asc_discount">Discount: Low to High</option>
        <option value="desc_discount">Discount: High to Low</option>
      </select>
    </div>
  );
};

export default Filters;

