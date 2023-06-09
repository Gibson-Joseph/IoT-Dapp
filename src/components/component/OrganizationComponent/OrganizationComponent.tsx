import React, { useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import { useParams } from "react-router-dom";
import TableComponent from "../TableComponent/TableComponent";

const OrganizationComponent = () => {
  const { contractMethod, account } = useSmartContractContext();
  const { id } = useParams();
  const [parks, setParks] = useState([]);

  const getOrganization = async () => {
    const organization = await contractMethod.methods
      .getOrganizationArr(id)
      .call();
    setParks(organization);
  };
  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <TableComponent parks={parks} />
    </div>
  );
};

export default OrganizationComponent;
