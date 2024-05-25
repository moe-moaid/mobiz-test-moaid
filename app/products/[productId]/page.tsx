'use client';
import DetailedCard from '@/app/components/detailedCard';
import { useGlobalContext } from '@/context/globalContext';
import React from 'react'

type Props = {
  params: {
    productId: number;
  };
};

export default function Indivisual({params: { productId }}: Props) {
  const { loading } = useGlobalContext();
  
  return (
    <div>
      {loading && (
        <h1 className='animate-ping'>Loading</h1>
      )}
      <DetailedCard productId={ productId } />
    </div>
  )
}
