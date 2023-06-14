import React, { useCallback, useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import { useParams } from "react-router-dom";
import TableComponent from "../TableComponent/TableComponent";

const OrganizationComponent = () => {
  const { contractMethod, account } = useSmartContractContext();
  const { id } = useParams();
  const [parks, setParks] = useState([]);
  const [organizationStatus, setOrganizationStatus] = useState([]);

  const getOrganization = useCallback(async () => {
    const organization = await contractMethod.methods
      .getOrganizationArr(id)
      .call();

    setParks(organization);
    const status = await contractMethod.methods
      .getOrganizationStatus(id)
      .call();
    setOrganizationStatus(status);
  }, [contractMethod]);

  useEffect(() => {
    account && contractMethod && getOrganization();
  }, [account, contractMethod]);

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
