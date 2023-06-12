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
import LoginPage from "./components/renderings/LoginPage/LoginPage";
import FooterComponent from "./components/renderings/FooterComponent/FooterComponent";
import { Route, Routes } from "react-router-dom";
import OrganizationComponent from "./components/component/OrganizationComponent/OrganizationComponent";
import SidebarComponent from "./components/component/SidebarComponent/SidebarComponent";
interface INetwork {
  events: any;
  links: any;
  address: string;
  transactionHash: string;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    web3Api,
    account,
    networkId,
    getAccount,
    storageContract,
    contractMethod,
  } = useSmartContractContext();
  const [isDataStored, setIsDataStored] = useState(false);
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

  const fetchPark = async () => {
    await axios
      .get("https://sipcot.api.codingtown.com/v1/dashboards/parks", {
        headers: {
          Authorization: state.authorization,
        },
      })
      .then((res) => {
        console.log("park details", res.data);
        const filterdParkData = res.data.map((data: any) => {
          return {
            id: data.id,
            parkName: data.name,
            water_consumption: data.water_consumption.toString(),
            organizations: data.organizations.map((data: any, i: number) => {
              return {
                id: data.id,
                name: data.name,
                water_consumption: data.water_consumption.toString(),
              };
            }),
            flow_meters_industries: data.devices.flow_meters_industries.map(
              (data: any, i: number) => {
                return {
                  state: data.state,
                };
              }
            ),
            // organizations: [],
          };
        });
        console.log("filterdParkData", filterdParkData);
        sendParkData([
          {
            flow_meters_industries: [
              { state: "Offline" },
              { state: "Offline" },
              // { state: "Offline" },
            ],
            id: 2,
            organizations: [
              { id: 6, name: "Irungatukottai", water_consumption: "15.5" },
              { id: 8, name: "Test", water_consumption: "0" },
              // { id: 10, name: "oragadam", water_consumption: "0" },
            ],
            parkName: "Coimbatore",
            water_consumption: "15.5",
          },
          {
            flow_meters_industries: [
              { state: "Offline" },
              // { state: "Offline" },
              // { state: "Offline" },
            ],
            id: 1111,
            organizations: [
              { id: 6, name: "Kl Rahul", water_consumption: "11" },
              // { id: 8, name: "Gibson", water_consumption: "0" },
              // { id: 10, name: "Joseph", water_consumption: "0" },
            ],
            parkName: "Tamilnadu",
            water_consumption: "1111111111",
          },
        ]);
        // sendParkData(filterdParkData);
      })
      .catch((err) => console.log("Park Error", err));
  };

  const sendParkData = async (filterdParkData: any) => {
    let storePark = await contractMethod.methods
      .storePark(filterdParkData)
      .send({ from: account });
    console.log("storePark", storePark);
    setIsDataStored(!isDataStored);
  };

  const getParkArr = async () => {
    let getParkArr = await contractMethod.methods.getParkArr().call();
    console.log("getParkArr", getParkArr);
  };

  useEffect(() => {
    web3Api.web3 && getAccount();
  }, [web3Api, account]);

  return (
    <div className="h-screen flex flex-col">
      {!account ? (
        <LoginPage />
      ) : (
        <>
          <HeaderComponent isOpen={isOpen} setIsOpen={setIsOpen} />
          <button
            onClick={() => fetchPark()}
            className="bg-indigo-200 py-1 w-52"
          >
            Fetch Parks from API
          </button>
          <div className="flex-grow">
            <div>
              <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>

            <Routes>
              <Route
                path="/"
                element={<MainContentComponent isDataStored={isDataStored} />}
              />
              <Route
                path="/industory/:id"
                element={<OrganizationComponent />}
              />
            </Routes>
          </div>
          <FooterComponent />
        </>
      )}
    </div>
  );
}

export default App;
