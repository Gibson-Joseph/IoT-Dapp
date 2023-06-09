import React from "react";
import ParkComponent from "../../component/ParkComponent/ParkComponent";
import DateRangePicker from "../../component/DateRangePicker/DateRangePicker";
import SidebarComponent from "../../component/SidebarComponent/SidebarComponent";
import { Outlet } from "react-router-dom";
const MainContentComponent = ({ isDataStored }: any) => {
  return (
    <main className="min-h-full flex-grow">
      {/* <div className="min-h-full">
        <SidebarComponent />
      </div> */}
      <div>
        <div className="w-full flex justify-end px-8">
          <DateRangePicker />
        </div>
        <ParkComponent isDataStored={isDataStored} />
        {/* <Outlet /> */}
      </div>
    </main>
  );
};

export default MainContentComponent;
