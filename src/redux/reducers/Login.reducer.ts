import { JWT_TOKEN, METAMASK_LOGIN } from "../action-types/Login.types";
import { LoginState, LoginTypes } from "../model/Login.modul";

const INITIAL_STATE: LoginState = {
  authorization: "",
  isMetaMaskLogin: false,
};

export const loginReducer = (state = INITIAL_STATE, action: LoginTypes) => {
  let myPayload = { ...action.payload };

  switch (action.type) {
    case JWT_TOKEN: {
      return {
        ...state,
        authorization: myPayload.authorization,
      };
    }
    case METAMASK_LOGIN: {
      return {
        ...state,
        isMetaMaskLogin: myPayload.isMetaMaskLogin,
      };
    }
    default:
      return state;
  }
};
