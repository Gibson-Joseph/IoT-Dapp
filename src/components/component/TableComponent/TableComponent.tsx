import React from "react";

const TableComponent = ({
  parks,
  handleOrganization,
}: {
  parks: any;
  handleOrganization?: any;
}) => {
  return (
    <table className="w-[90%] border border-gray-300 my-10">
      <thead>
        <tr className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-left">
          <th className="py-2 px-4">S.No</th>
          <th className="py-2 px-4">Park ID</th>
          <th className="py-2 px-4">Park Name</th>
          <th className="py-2 px-4">Water Consumption</th>
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
                  {parkData.water_consumption}
                </td>
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
  );
};

export default TableComponent;
