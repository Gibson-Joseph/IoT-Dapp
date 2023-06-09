import React, { useState } from "react";
import "./dateRangePicker.css";
import axios from "axios";
import { useSelector } from "react-redux";
const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<any>(Date.now());
  const [endDate, setEndDate] = useState<any>(Date.now());
  const state = useSelector((state: any) => state.login);

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);

    // Make API call with selected end date
    if (startDate) {
      makeAPICall(startDate, selectedEndDate);
    }
  };
  const makeAPICall = async (start: any, end: any) => {
    console.log("API call with start date:", start);
    console.log("API call with end date:", end);
    await axios
      .get(
        "https://sipcot.api.codingtown.com/v1/panel_tables/time_range_consumption",
        {
          data: { park_id: 2, start_date: start, end_date: end },
          headers: {
            Authorization: state.authorization,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log("data pick err", err));
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-indigo-600">Date Range:</span>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border-2 border-indigo-500 text-indigo-600 bg-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#ff6b6b] cursor-pointer"
        />
        <span className="text-gray-400">to</span>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border-2 border-indigo-500 text-indigo-600 bg-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#ff6b6b] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
