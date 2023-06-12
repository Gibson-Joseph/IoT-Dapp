import React from "react";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

const TableComponent = ({
  parks,
  handleOrganization,
  name,
  organizationStatus,
}: {
  parks: any;
  handleOrganization?: any;
  name: string;
  organizationStatus?: any[];
}) => {
  console.log("organizationStatus", organizationStatus);
  console.log("organizationStatus type", typeof organizationStatus);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-[20px] font-serif text-slate-600">
        {name}
      </h1>
      <table className="w-[90%] border border-gray-300 my-6">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-left">
            <th className="py-2 px-4">S.No</th>
            <th className="py-2 px-4">Park ID</th>
            <th className="py-2 px-4">Park Name</th>
            <th className="py-2 px-4">Water Consumption</th>
            {organizationStatus && <th className="py-2 px-4">Status</th>}
          </tr>
        </thead>
        <tbody>
          {parks.length > 0 ? (
            parks?.map((parkData: any, index: number) => {
              return (
                <tr
                  onClick={() =>
                    handleOrganization && handleOrganization(parkData.id)
                  }
                  key={index}
                  className="bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-4 border-t border-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-t border-gray-300">
                    {parkData.id}
                  </td>
                  <td className="py-2 px-4 border-t border-gray-300">
                    {parkData.parkName ? parkData.parkName : parkData.name}
                  </td>
                  <td className="py-2 px-4 border-t border-gray-300">
                    {/* {Math.pow(parkData.water_consumption, 3)} */}
                    {parkData.water_consumption} m<sup>3</sup>
                  </td>
                  {organizationStatus && (
                    <td className="py-2 px-4 border-t border-gray-300">
                      {/* {Math.pow(parkData.water_consumption, 3)} */}
                      {organizationStatus[index]?.state}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr className="w-full py-2">
              <td className="p-4 col-span-full" colSpan={4}>
                <div className="p-2">
                  <p className="text-center">No Data Here</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <PaginationComponent /> */}
    </div>
  );
};

export default TableComponent;
