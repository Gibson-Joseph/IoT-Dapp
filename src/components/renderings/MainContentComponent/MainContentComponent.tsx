import React from "react";
import ParkComponent from "../../component/ParkComponent/ParkComponent";
import DateRangePicker from "../../component/DateRangePicker/DateRangePicker";
const MainContentComponent = ({ isDataStored }: any) => {
  return (
    <main className="min-h-full flex-grow">
      <div>
        <div className="w-full flex justify-end px-8">
          <DateRangePicker />
        </div>
        <ParkComponent />
      </div>
    </main>
  );
};

export default MainContentComponent;
