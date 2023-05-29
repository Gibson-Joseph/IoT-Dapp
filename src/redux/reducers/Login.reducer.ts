import { JWT_TOKEN } from "../action-types/Login.types";
import { LoginState, LoginTypes } from "../model/Login.modul";

const INITIAL_STATE: LoginState = {
  authorization: "",
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
    default:
      return state;
  }
};
