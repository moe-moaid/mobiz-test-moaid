"use client";
import { useState } from "react";
import ProtectedRoute from "../components/protectRoute";
import RenderTabs from "../components/renderTabs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("table");
  return (
    <ProtectedRoute roles={["admin"]}>
      <div className="pt-12">
        <div className="flex flex-row justify-center items-center gap-4 md:space-x-9">
          <button
            className={`${activeTab === 'table' ? 'bg-blue-500 text-white dark:bg-violet-500' : ''} border border-gray-200 dark:border-none rounded-lg px-2 py-1 shadow-xl text-[12px] md:text-[16px]`}
            onClick={() => {
              setActiveTab("table");
            }}
          >
            Table Data
          </button>
          <button
            className={`${activeTab === 'chart' ? 'bg-blue-500 text-white dark:bg-violet-500' : ''} border border-gray-200 dark:border-none rounded-lg px-2 py-1 shadow-xl text-[12px] md:text-[16px]`}
            onClick={() => {
              setActiveTab("chart");
            }}
          >
            Chart Data
          </button>
          <button
            className={`${activeTab === 'matrix' ? 'bg-blue-500 text-white dark:bg-violet-500' : ''} border border-gray-200 dark:border-none rounded-lg px-2 py-1 shadow-xl text-[12px] md:text-[16px]`}
            onClick={() => {
              setActiveTab("matrix");
            }}
          >
            Matrix Data
          </button>
          <button
            className={`${activeTab === 'crud' ? 'bg-blue-500 text-white dark:bg-violet-500' : ''} border border-gray-200 dark:border-none rounded-lg px-2 py-1 shadow-xl text-[12px] md:text-[16px]`}
            onClick={() => {
              setActiveTab("crud");
            }}
          >
            Edit Data
          </button>
          <button
            className={`${activeTab === 'add' ? 'bg-blue-500 text-white dark:bg-violet-500' : ''} border border-gray-200 dark:border-none rounded-lg px-2 py-1 shadow-xl text-[12px] md:text-[16px]`}
            onClick={() => {
              setActiveTab("add");
            }}
          >
            Add an Item
          </button>
        </div>
        <RenderTabs activeTab={activeTab} />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
