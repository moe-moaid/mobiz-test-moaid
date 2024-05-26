import Link from 'next/link';
import React from 'react'
import Loading from './loading';

interface Props {
    title: string;
    price: number;
    rating: number;
    discountPercentage: number;
    brand: string;
    category: string;
}

export default function SingleCard({title, price, rating, discountPercentage, brand, category}: Props){ 
  return (
      <div className='w-80  border rounded-lg px-2 py-1 dark:bg-teal-500 dark:border-teal-700 bg-gray-200 shadow-lg hover:cursor-pointer'>
          <div className="flex flex-row items-center justify-between mb-3">
            <p className='font-semibold'>{title}</p>
            <p className='text-white bg-red-300 dark:bg-violet-700 px-2 py-1 rounded-full font-semibold'>{discountPercentage}%</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>${price}</p>
            <p>Rating: {rating}</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>{brand}</p>
            <p>{category}</p>
          </div>
      <button className='bg-blue-400 dark:bg-violet-700 px-4 py-2 text-white font-semibold rounded-full mt-4 w-full'>
        <Loading text='Have a Look!' />
      </button>
        </div>
  )
}