import React, { useCallback, useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import "./parkComponent.css";
import ParkHeaderComponent from "../ParkHeaderComponent/ParkHeaderComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ParkComponent = () => {
  const { contractMethod, account } = useSmartContractContext();
  const [parks, setParks] = useState([]);
  const navigate = useNavigate();
  const [isDataStored, setIsDataStored] = useState(false);

  const getParkArr = useCallback(async () => {
    let getParkArr = await contractMethod.methods.getParkArr().call();
    setParks(getParkArr);
  }, [contractMethod]);

  const handleOrganization = async (id: number) => {
    navigate(`/industory/${id}`);
  };

  const sendParkData = async (filterdParkData: any) => {
    let storePark = await contractMethod.methods
      .storePark(filterdParkData)
      .send({ from: account });
    console.log("storePark", storePark);
    setIsDataStored(!isDataStored);
  };
  const state = useSelector((state: any) => state.login);

  const fetchPark = async () => {
    await axios
      .get("https://sipcot.api.codingtown.com/v1/dashboards/parks", {
        headers: {
          Authorization: state.authorization,
        },
      })
      .then((res) => {
        const filterdParkData = res.data.map((data: any) => {
          return {
            id: data.id,
            parkName: data.name,
            water_consumption: data.water_consumption.toString(),
            organizations: data.organizations.map((data: any, i: number) => {
              return {
                id: data.id,
                name: data.name,
                water_consumption: data.water_consumption.toString(),
              };
            }),
            flow_meters_industries: data.devices.flow_meters_industries.map(
              (data: any, i: number) => {
                return {
                  state: data.state,
                };
              }
            ),
          };
        });
        sendParkData(filterdParkData);
      })
      .catch((err) => console.log("Park Error", err));
  };

  useEffect(() => {
    account && contractMethod && getParkArr();
  }, [account, contractMethod, isDataStored]);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full">
          <button
            onClick={() => fetchPark()}
            className="bg-indigo-200 py-1 w-52"
          >
            Fetch Parks from API
          </button>
        </div>
        <TableComponent
          parks={parks}
          name={"Parks"}
          handleOrganization={handleOrganization}
        />
      </div>
    </>
  );
};

export default ParkComponent;
