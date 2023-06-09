import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Water Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
