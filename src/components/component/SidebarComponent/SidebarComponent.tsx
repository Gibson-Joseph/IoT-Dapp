import React, { useState } from "react";
import menu from "../../../assets/menu.png";
import { ReactComponent as Industry } from "../../../assets/industry.svg";
import { ReactComponent as Dashboard } from "../../../assets/dashboard.svg";
import { ReactComponent as ParkUsers } from "../../../assets/parkUsers.svg";
const SidebarComponent = ({ isOpen, setIsOpen }: any) => {
  // const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`fixed min-h-full top-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="py-2 px-2 text-center text-white">SIPCOT Menu</h1>
          <button className="px-4 py-2 text-white" onClick={toggleSidebar}>
            <img src={menu} alt="menu" className="h-[20px] bg-white" />
          </button>
        </div>
        <div className="border-b-[1px] border-b-slate-400"></div>
        {/* Sidebar content */}
        <ul className="mt-4">
          <li className="px-4 py-3 text-white cursor-pointer hover:bg-slate-600 font-normal text-[16px] flex">
            <Dashboard fill="#fff" className="h-6 w-6" />
            <span className="ml-2">Dashboard</span>
          </li>
          <li className="px-4 py-3 text-white cursor-pointer hover:bg-slate-600 font-normal text-[16px] flex">
            <Industry fill="#fff" className="h-6 w-6" />
            <span className="ml-2">Industry</span>
          </li>
          <li className="px-4 py-3 text-white cursor-pointer hover:bg-slate-600 font-normal text-[16px] flex">
            <ParkUsers fill="#fff" className="h-6 w-6" />
            <span className="ml-2">Park Users</span>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed min-h-full inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default SidebarComponent;
