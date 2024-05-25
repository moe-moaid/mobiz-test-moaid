"use client";
import { useState } from "react";
import ProtectedRoute from "../components/protectRoute";
import RenderTabs from "../components/renderTabs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("table");
  return (
    <ProtectedRoute roles={["admin"]}>
      <div>
        <div className="flex flex-row justify-center items-center space-x-9">
          <button
            className="border border-gray-200 rounded-lg px-2 py-1 shadow-xl"
            onClick={() => {
              setActiveTab("table");
            }}
          >
            Table Dtata
          </button>
          <button
            className="border border-gray-200 rounded-lg px-2 py-1 shadow-xl"
            onClick={() => {
              setActiveTab("chart");
            }}
          >
            Chart Dtata
          </button>
          <button
            className="border border-gray-200 rounded-lg px-2 py-1 shadow-xl"
            onClick={() => {
              setActiveTab("matrix");
            }}
          >
            Matrix Dtata
          </button>
          <button
            className="border border-gray-200 rounded-lg px-2 py-1 shadow-xl"
            onClick={() => {
              setActiveTab("crud");
            }}
          >
            Edit Data
          </button>
          <button
            className="border border-gray-200 rounded-lg px-2 py-1 shadow-xl"
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
