import React, { useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import "./parkComponent.css";

const ParkComponent = () => {
  const { contractMethod, account } = useSmartContractContext();

  const [parks, setParks] = useState([]);

  const getParkArr = async () => {
    let getParkArr = await contractMethod.methods.getParkArr().call();
    console.log("getParkArr", getParkArr);
    setParks(getParkArr);
    console.log("parks", parks);
  };

  useEffect(() => {
    account && contractMethod && getParkArr();
  }, [account, contractMethod]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="park-heading">Parks Details</h1>
      </div>
      <table className="rounded-lg shadow-xl shadow-indigo-300/60">
        <thead className="">
          <tr className="">
            <th className="bg-blue-300 py-3 px-2 rounded-tl-lg">S.No</th>
            <th className="bg-blue-400 py-3 px-2">Park ID</th>
            <th className="bg-blue-500 py-3 px-2">Park Name</th>
            <th className="bg-blue-600 py-3 px-2 rounded-tr-lg">
              Water Consumption
            </th>
          </tr>
        </thead>
        <tbody>
          {parks.length > 0 ? (
            parks?.map((parkData: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{parkData.id}</td>
                  <td>{parkData.parkName}</td>
                  <td>{parkData.water_consumption}</td>
                </tr>
              );
            })
          ) : (
            <div className="w-full py-2">
              <span className="py-2 w-full text-center">No Data</span>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParkComponent;
