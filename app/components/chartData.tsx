'use client';
import { useGlobalContext } from '@/context/globalContext';
import React, { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import styles from './ChartData.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function ChartData() {
  const { allProducts } = useGlobalContext();

  // Process data for the bar chart
  const chartData = useMemo(() => {
    const categoryCount: { [key: string]: number } = {};

    if (allProducts) {
      allProducts.forEach(product => {
        if (categoryCount[product.category]) {
          categoryCount[product.category]++;
        } else {
          categoryCount[product.category] = 1;
        }
      });
    }

    return {
      labels: Object.keys(categoryCount),
      datasets: [
        {
          label: 'Product Count by Category',
          data: Object.values(categoryCount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [allProducts]);

  // Process data for the pie chart
  const pieData = useMemo(() => {
    const categoryCount: { [key: string]: number } = {};

    if (allProducts) {
      allProducts.forEach(product => {
        if (categoryCount[product.category]) {
          categoryCount[product.category]++;
        } else {
          categoryCount[product.category] = 1;
        }
      });
    }

    return {
      labels: Object.keys(categoryCount),
      datasets: [
        {
          data: Object.values(categoryCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [allProducts]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This is important for custom sizes
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Product Count by Category',
      },
    },
  };

  return (
    <div>
      <h2 className='flex flex-row justify-center mt-7'>Visual Data</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-5'>
        {allProducts ? (
          <>
            <div className='border border-gray-200 rounded-xl shadow-xl p-5'>
              <div className='h-64'>
                <Bar data={chartData} options={options} />
              </div>
            </div>
            <div className='border border-gray-200 rounded-xl shadow-xl p-5'>
              <div className='h-64'>
                <Pie data={pieData} options={options} />
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
