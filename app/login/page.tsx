"use client";
import React from "react";
import LoginForm from "../components/loginForm";

export default function page() {
  return (
    <div className="h-screen bg-gray-300 dark:bg-[#121212] pt-6 px-5">
      <LoginForm />
    </div>
  );
}
