import React from 'react'
import TableData from './tableData';
import ChartData from './chartData';
import MatrixData from './matrixData';
import EditData from './editData';
import AddItem from './addItem';
type Props = {
    activeTab: string;
}

export default function RenderTabs({ activeTab }: Props) {
  return (
    <div className='px-5'>
        {activeTab === 'table' && <TableData />}
        {activeTab === 'chart' && <ChartData />}
        {activeTab === 'matrix' && <MatrixData />}
        {activeTab === 'crud' && <EditData />}
        {activeTab === 'add' && <AddItem />}

    </div>
  )
}
