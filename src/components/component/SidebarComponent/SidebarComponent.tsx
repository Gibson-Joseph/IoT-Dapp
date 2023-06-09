import React, { useState } from "react";

const SidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full">
      {/* Button to toggle the sidebar */}
      <button
        className="px-4 py-2 bg-blue-500 text-white"
        onClick={toggleSidebar}
      >
        Toggle Sidebar
      </button>

      {/* Sidebar */}
      <div
        className={`fixed min-h-full left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="py-1 px-2 text-center text-white">Menu</h1>
        <div className="border-b-[1px] border-b-slate-400"></div>
        {/* Sidebar content */}
        <ul className="mt-4">
          <li className="px-4 py-2 text-white">Sidebar Item 1</li>
          <li className="px-4 py-2 text-white">Sidebar Item 2</li>
          <li className="px-4 py-2 text-white">Sidebar Item 3</li>
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
