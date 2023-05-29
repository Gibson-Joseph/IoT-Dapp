import React, { useEffect, useState } from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
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
  useEffect(() => {
    account && debounce(account);
  }, [account]);

  return (
    <header className="flex px-2 py-3 border-b shadow-md shadow-indigo-50">
      <div className="w-2/3 flex flex-auto items-center ">
        <h1 className="text-center mx-auto text-[30px] font-bold font-serif">
          Water Management System
        </h1>
      </div>
      <nav className="w-1/3 flex justify-end items-center gap-4">
        <div>
          {account && (
            <>
              <span
                onMouseEnter={() => showFullAccounNo()}
                onMouseLeave={() => hideFullAccounNo()}
                className="flex items-start justify-center cursor-pointer"
              >
                {shaownAccount}
              </span>
              {/* {account && showFullAccoun && <span>{account}</span>} */}
            </>
          )}
        </div>
        <button
          onClick={() => connectWallet()}
          className="bg-indigo-300 py-2 px-3 list-none rounded-md"
        >
          {!account ? "Connect Wallet!" : "Disconnect Wallet"}
        </button>
      </nav>
    </header>
  );
};

export default HeaderComponent;
