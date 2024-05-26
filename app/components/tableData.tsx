'use client';
import React, { useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { useGlobalContext } from '@/context/globalContext';
import { SingleProduct } from '../../types/types';
import Image from 'next/image';

/**
 * I did my best in terms of responsiveness, but the table has way too many
    columns to fit in a small or medium screen
 */
export default function TableData() {
  const { allProducts } = useGlobalContext();

  const data: SingleProduct[] = useMemo(() => allProducts || [], [allProducts]);

  const columns: Column<SingleProduct>[] = useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Category', accessor: 'category' },
      { Header: 'Brand', accessor: 'brand' },
      { Header: 'Stock', accessor: 'stock' },
      {
        Header: 'Thumbnail',
        accessor: 'thumbnail',
        Cell: ({ value }: { value: string }) => <Image src={value} alt="thumbnail" width={50} height={50} />,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className='mt-12 px-6 w-max-full'>
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-500 dark:bg-teal-500">
          {headerGroups.map((headerGroup: any, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column: any, i: number) => (
                <th
                key={i}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xs font-medium  text-white uppercase tracking-wider"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white dark:bg-[#121212] divide-y divide-gray-300 dark:divide-yellow-600">
          {rows.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell: any, i: number) => (
                  <td
                  key={i}
                    {...cell.getCellProps()}
                    className="px-2 py-4 text-sm text-gray-500 w-max-[200px] whitespace-normal break-normal"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


