'use client';

import React, { useEffect } from 'react';

type SearchProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  applyFilters: (filters: { category: string; brand: string; custom: string }, searchTerm: string) => void;
  filters: { category: string; brand: string; custom: string };
};

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm, applyFilters, filters }) => {
  useEffect(() => {
    applyFilters(filters, searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex flex-row justify-center md:my-4">
      <input
        className="px-4 py-2 border rounded-lg w-1/2 md:w-1/3 outline-none"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
