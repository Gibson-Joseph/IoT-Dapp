import React from "react";
import { useSmartContractContext } from "../../../context/ContractLoadingProvider";
import sipcotLogo from "../../../assets/sipcotLogo.png";
const LoginPage = () => {
  const {
    web3Api,
    account,
    networkId,
    getAccount,
    storageContract,
    contractMethod,
  } = useSmartContractContext();

  const connectWithMetamask = async () => {
    web3Api.provider &&
      (await web3Api.provider.request({ method: "eth_requestAccounts" }));
    await getAccount();
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-normal mb-8 text-center">
        SIPCOT Water Management System
      </h1>
      <div className="bg-white p-8 rounded shadow-lg border border-blue-300">
        <div className="w-full">
          <img src={sipcotLogo} alt="sipcotLogo" className="m-auto pb-5" />
          <h2 className="text-2xl font-bold mb-4 text-center">Metamask Login</h2>
        </div>
        <p className="text-gray-600 mb-4">
          To access your account, please connect with Metamask below
        </p>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={() => connectWithMetamask()}
        >
          Connect with Metamask
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
