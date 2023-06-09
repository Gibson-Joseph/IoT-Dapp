import React, { useCallback, useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import "./parkComponent.css";
import ParkHeaderComponent from "../ParkHeaderComponent/ParkHeaderComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useNavigate } from "react-router-dom";

const ParkComponent = ({ isDataStored }: any) => {
  const { contractMethod, account } = useSmartContractContext();
  const [parks, setParks] = useState([]);
  const navigate = useNavigate();

  const getParkArr = useCallback(async () => {
    let getParkArr = await contractMethod.methods.getParkArr().call();
    setParks(getParkArr);
  }, []);

  const handleOrganization = async (id: number) => {
    navigate(`/industory/${id}`);
  };

  useEffect(() => {
    account && contractMethod && getParkArr();
  }, [account, contractMethod, isDataStored]);

  return (
    <>
      {/* Park Header */}
      {/* <ParkHeaderComponent /> */}
      {/* Park List Table */}
      <div className="w-full h-full flex flex-col items-center">
        <TableComponent parks={parks} handleOrganization={handleOrganization} />
      </div>
    </>
  );
};

export default ParkComponent;
