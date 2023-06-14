export interface LoginState {
  authorization: string;
  isMetaMaskLogin: boolean
}

interface LoginAction {
  type: string;
  payload: any;
}

interface MetamaskLoginAction {
  type: string;
  payload: any;
}
export type LoginTypes = LoginAction;
export type MetamaskTypes = MetamaskLoginAction;
