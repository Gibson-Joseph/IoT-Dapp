/* eslint-disable @typescript-eslint/no-unused-vars */
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { useCallback, useEffect, useState } from "react";
import Storage from "./truffle_abis/Storage.json";
import "./App.css";
import UseLogin from "./hooks/UseLogin";
import { useSelector } from "react-redux";
import { useSmartContractContext } from "./context/ContractLoadingProvider";
import axios from "axios";
import { ethers } from "ethers";
import HeaderComponent from "./components/renderings/HeaderComponent/HeaderComponent";
import MainContentComponent from "./components/renderings/MainContentComponent/MainContentComponent";
interface INetwork {
  events: any;
  links: any;
  address: string;
  transactionHash: string;
}

function App() {
  const {
    web3Api,
    account,
    networkId,
    getAccount,
    storageContract,
    contractMethod,
  } = useSmartContractContext();

  const connectWallet = () => {
    web3Api.provider &&
      web3Api.provider.request({ method: "eth_requestAccounts" });
  };

  const getId = async () => {
    let admin = await contractMethod.methods.getAdmin(account).call();
  };

  const requestUser = async () => {
    let requestUser = await contractMethod.methods
      .request(account)
      .send({ from: account });
  };

  const viewUsers = async () => {
    let getUser = await contractMethod.methods.getUser().call();
    console.log("getUser", getUser);
  };

  const bearer = UseLogin();

  const state = useSelector((state: any) => state.login);
  console.log("state.authorization", state.authorization);

  const fetchPark = async () => {
    await axios
      .get("https://sipcot.api.codingtown.com/v1/dashboards/parks", {
        headers: {
          Authorization: state.authorization,
        },
      })
      .then((res) => {
        console.log("park details", res.data);
        const filterdData = res.data.map((data: any) => {
          return {
            id: data.id,
            parkName: data.name,
            water_consumption: data.water_consumption.toFixed(),
          };
        });
        console.log("filterdData", filterdData);
        sendData(filterdData);
      })
      .catch((err) => console.log("Park Error", err));
  };

  const sendData = async (filterdData: any) => {
    let storePark = await contractMethod.methods
      .storePark(filterdData)
      .send({ from: account });
    console.log("storePark", storePark);
  };

  const getParkArr = async () => {
    let getParkArr = await contractMethod.methods.getParkArr().call();
    console.log("getParkArr", getParkArr);
  };

  useEffect(() => {
    web3Api.web3 && getAccount();
  }, [web3Api, account]);

  return (
    <div className="h-screen">
      <HeaderComponent />
      <button onClick={() => fetchPark()} className="bg-indigo-200 py-1 px-3">
        Fetch Parks from API
      </button>
      {/* <button
        onClick={() => getParkArr()}
        className="bg-indigo-200 py-1 px-3 ml-3"
      >
        GetPark From Blockchain
      </button> */}
      <main className="h-full">
        <MainContentComponent />
      </main>
    </div>
  );
}

export default App;
