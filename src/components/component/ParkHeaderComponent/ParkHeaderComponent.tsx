import React, { useCallback, useEffect, useState } from "react";
import "./ParkHeaderComponent.css";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
const ParkHeaderComponent = () => {
  const [renderNav, setRenderNav] = useState([
    { name: "PARKS", val: 0 },
    { name: "INDUSTRIES", val: 0 },
    { name: "CONSUMPTION", val: 0 },
  ]);

  const { contractMethod, account } = useSmartContractContext();

  //   const [totalWaterConsumption, setTotalWaterConsumption] = useState<any>();

  const getTotalWaterConsumption = async () => {
    let getTotalValue = await contractMethod.methods
      .total_water_consumption()
      .call();
    // setTotalWaterConsumption(getTotalValue);
    setRenderNav((prevNav) => {
      const updatedNav = [...prevNav];
      updatedNav[0] = { ...updatedNav[0], val: getTotalValue };
      return updatedNav;
    });
  };

  useEffect(() => {
    account && contractMethod && getTotalWaterConsumption();
  }, [account, contractMethod]);

  const Card = useCallback(({ data, value }: { data: string; value: any }) => {
    return (
      <div className="single-card">
        {data} {"  "} {value}
      </div>
    );
  }, []);

  return (
    <div className="ParkHeader-parent">
      {renderNav.map((data: any, index: number) => {
        return <Card key={index} data={data.name} value={data.val} />;
      })}
    </div>
  );
};

export default ParkHeaderComponent;
