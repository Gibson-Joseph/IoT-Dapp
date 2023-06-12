import React, { useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import { useParams } from "react-router-dom";
import TableComponent from "../TableComponent/TableComponent";

const OrganizationComponent = () => {
  const { contractMethod, account } = useSmartContractContext();
  const { id } = useParams();
  const [parks, setParks] = useState([]);
  const [organizationStatus, setOrganizationStatus] = useState([]);

  const getOrganization = async () => {
    const organization = await contractMethod.methods
      .getOrganizationArr(id)
      .call();
    console.log("organization", organization);

    setParks(organization);
    const status = await contractMethod.methods
      .getOrganizationStatus(id)
      .call();
    setOrganizationStatus(status);
    // console.log("status", status);
  };
  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <TableComponent
        name={"Industries"}
        parks={parks}
        organizationStatus={organizationStatus}
      />
    </div>
  );
};

export default OrganizationComponent;
