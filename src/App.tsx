/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import UseLogin from "./hooks/UseLogin";
import { useSelector } from "react-redux";
import { useSmartContractContext } from "./context/ContractLoadingProvider";
import axios from "axios";
import MainContentComponent from "./components/renderings/MainContentComponent/MainContentComponent";
import LoginPage from "./components/renderings/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import OrganizationComponent from "./components/component/OrganizationComponent/OrganizationComponent";
import Layout from "./layout/Layout";
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
  };

  const bearer = UseLogin();

  useEffect(() => {
    web3Api.web3 && getAccount();
  }, [web3Api, account]);

  return (
    <div className="h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<MainContentComponent isDataStored={isDataStored} />}
          />
          <Route path="/industory/:id" element={<OrganizationComponent />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <div className="text-center bg-gray-100 text-red-600 flex items-center justify-center text-4xl h-screen">
              Page Not Found•••••🤔
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
