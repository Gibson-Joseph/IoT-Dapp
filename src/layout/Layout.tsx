import React, { useState } from "react";
import HeaderComponent from "../components/renderings/HeaderComponent/HeaderComponent";
import SidebarComponent from "../components/component/SidebarComponent/SidebarComponent";
import { Outlet } from "react-router-dom";
import FooterComponent from "../components/renderings/FooterComponent/FooterComponent";
import requireAuth from "../hoc/Hoc";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderComponent isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-grow">
        <div>
          <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <Outlet />
      </div>
      <FooterComponent />
    </>
  );
};

export default requireAuth(Layout);
