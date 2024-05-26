"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginBtn from "./loginBtn";
import Link from "next/link";
import { useTheme } from "next-themes";
function Header() {
  const path = usePathname();
  const { data: session, status } = useSession();

  function GetLinkClass(path: string){
    return path === usePathname() ? "bg-blue-500 text-white" : "";
  };
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const existTheme = localStorage.getItem('theme');
    if (existTheme === 'dark') setTheme('dark');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <div className="">
      <div className="flex flex-row justify-center items-center space-x-4 bg-transparent py-5">
        <Link href={"/"}>
          <button
            className={`border border-gray-300 rounded-lg px-3 py-2 ${GetLinkClass(
              "/"
            )}`}
          >
            Home
          </button>
        </Link>
        <LoginBtn />
        {/* Conditionally render the new button based on the user's role */}
        {session &&
          session.user &&
          (session.user.role === "viewer" ? (
            <button className="border border-gray-300 rounded-lg px-3 py-2">
              {session.user.name}
            </button>
          ) : (
            <Link href={`/${session.user.role}`}>
              <button
                className={`border border-gray-300 rounded-lg px-3 py-2 ${GetLinkClass(
                  `/${session.user.role}`
                )}`}
              >
                Dashboard
              </button>
            </Link>
          ))}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="#9333ea"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#9333ea"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
