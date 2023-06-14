import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import Web3 from "web3";
import Storage from "../truffle_abis/Storage.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch, useSelector } from "react-redux";
import { metamaskLogin } from "../redux/actions/Logins.action";

interface INetwork {
  links: any;
  events: any;
  address: string;
  transactionHash: string;
}

interface ISmartContaxt {
  web3Api: any;
  account: string | undefined;
  networkId: string | undefined;
  storageContract: any;
  getAccount: () => void;
}

const smartContract = createContext<any>(null);

export const ContractLoadingProvider = ({ children }: any) => {
  const [web3Api, setWeb3Api] = useState<any>({
    web3: null,
    provider: null,
    isProviderLoaded: false,
  });
  const dispatch = useDispatch();

  const [account, setAccounts] = useState();
  const [networkId, setNetWorkId] = useState<string>();
  const [contractMethod, setContractMethod] = useState();
  const [storageContract, setStorageContract] = useState();
  const [shouldReload, reload] = useState(false);
  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload]);

  const state = useSelector((state: any) => state.login);

  const setAccountListener = (provider: any) => {
    provider.on("accountsChanged", (accounts: any) => {
      dispatch(metamaskLogin({ isMetaMaskLogin: false }));
      if (state.isMetaMaskLogin) {
        window.location.reload();
      }
    });
    provider.on("chainChanged", (accounts: any) => {
      window.location.reload();
    });
  };

  const loadWallet = async () => {
    const provider: any = await detectEthereumProvider();

    if (provider) {
      setWeb3Api({ ...web3Api, web3: new Web3(provider), provider: provider });
      setAccountListener(provider);
    } else {
      console.log("install MetaMask");
    }
  };

  const getNetWork = async () => {
    const networkId: string = await web3Api?.web3.eth.net.getId();
    setNetWorkId(networkId);
    const storageContract = await (Storage as any)?.networks[networkId];
    setStorageContract(storageContract);
    if (storageContract) {
      const methods = await new web3Api.web3.eth.Contract(
        Storage.abi,
        storageContract.address
      );
      setContractMethod(methods);
    }
  };

  const getAccount = useCallback(async () => {
    const accounts = await web3Api?.web3?.eth?.getAccounts();
    setAccounts(accounts[0]);
  }, [web3Api]);

  useEffect(() => {
    loadWallet();
  }, []);

  useEffect(() => {
    web3Api.web3 && getNetWork();
  }, [web3Api]);

  return (
    <smartContract.Provider
      value={{
        account,
        web3Api,
        networkId,
        contractMethod,
        storageContract,
        getAccount,
        loadWallet,
      }}
    >
      {children}
    </smartContract.Provider>
  );
};

export const useSmartContractContext = () => useContext(smartContract);
