import React, { useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import Web3 from "web3";
import sipcotLogo from "../../../assets/sipcotLogo.png";
import menu from "../../../assets/menu.png";

const HeaderComponent = ({ isOpen, setIsOpen }: any) => {
  const {
    web3Api,
    account,
    networkId,
    getAccount,
    storageContract,
    contractMethod,
  } = useSmartContractContext();

  const [shaownAccount, setShowAccount] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const debounce = (accoun: string | null) => {
    const trimFirst = accoun?.slice(0, 5);
    const trimLast = account?.slice(-5);
    setShowAccount(`${trimFirst}.....${trimLast}`);
  };

  const disconnectWallet = async () => {
    console.log("disconnectWallet function is not working");
    // if ((window as any).ethereum) {
    //   const web3 = new Web3((window as any).ethereum);
    //   const provider: any = web3.currentProvider;

    //   if (provider) {
    //     console.log("provider.disconnect", provider.disconnect);
    //     console.log("provider.close", provider.close);

    //     if (typeof provider.disconnect === "function") {
    //       provider.disconnect();
    //     } else if (typeof provider.close === "function") {
    //       provider.close();
    //     }
    //   }
    // }
    await (window as any).ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  };

  useEffect(() => {
    account && debounce(account);
  }, [account]);

  return (
    // <header className="bg-gradient-to-r from-blue-900 to-teal-900 py-4 px-8 flex justify-between items-center">
    <header className="py-2 px-4 flex justify-between items-center bg-white border border-b-[#c8ced3]">
      <div className="flex items-center flex-grow">
        <button className=" text-white pr-5" onClick={toggleSidebar}>
          <img src={menu} alt="menu" className="h-[20px]" />
        </button>
        <img src={sipcotLogo} alt="sipcotLogo" className="h-12" />
      </div>
      <div className="flex items-center">
        <p className="text-gray-800 text-sm mr-4">
          <span className="inline-block bg-blue-700 text-blue-100 rounded-full px-3 py-1 text-xs font-bold mr-2">
            &#x24C8;
          </span>
          {shaownAccount}
        </p>
        <button
          className="bg-blue-700 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-800 hover:text-white transition-colors duration-300 ease-in-out"
          onClick={() => disconnectWallet()}
        >
          Disconnect Wallet
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
