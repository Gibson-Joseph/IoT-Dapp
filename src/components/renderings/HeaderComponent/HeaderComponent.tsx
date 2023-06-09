import React, { useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import Web3 from "web3";

const HeaderComponent = () => {
  const {
    web3Api,
    account,
    networkId,
    getAccount,
    storageContract,
    contractMethod,
  } = useSmartContractContext();

  const [shaownAccount, setShowAccount] = useState<string | null>(null);
  const [showFullAccoun, setShowFullAccoun] = useState<boolean>(false);
  const connectWallet = () => {
    web3Api.provider &&
      web3Api.provider.request({ method: "eth_requestAccounts" });
  };

  const debounce = (accoun: string | null) => {
    const trimFirst = accoun?.slice(0, 5);
    const trimLast = account?.slice(-5);
    setShowAccount(`${trimFirst}.....${trimLast}`);
  };

  const showFullAccounNo = () => {
    setShowFullAccoun(true);
  };
  const hideFullAccounNo = () => {
    setShowFullAccoun(false);
  };

  const disconnectWallet = async () => {
    console.log("disconnectWallet function is not working");
    if ((window as any).ethereum) {
      const web3 = new Web3((window as any).ethereum);
      const provider: any = web3.currentProvider;

      if (provider) {
        console.log("provider.disconnect", provider.disconnect);
        console.log("provider.close", provider.close);

        if (typeof provider.disconnect === "function") {
          provider.disconnect();
        } else if (typeof provider.close === "function") {
          provider.close();
        }
      }
    }
  };

  useEffect(() => {
    account && debounce(account);
  }, [account]);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-teal-900 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center justify-center flex-grow">
        <h1 className="text-white text-3xl font-bold">
          Water Management System
        </h1>
      </div>
      <div className="flex items-center">
        <p className="text-white text-sm mr-4">
          <span className="inline-block bg-blue-700 text-blue-100 rounded-full px-3 py-1 text-xs font-bold mr-2">
            &#x24C8;
          </span>
          {shaownAccount}
        </p>
        <button
          className="bg-white text-blue-500 font-medium py-2 px-4 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors duration-300 ease-in-out"
          onClick={() => disconnectWallet()}
        >
          Disconnect Wallet
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
