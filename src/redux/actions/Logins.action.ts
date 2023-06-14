import { JWT_TOKEN, METAMASK_LOGIN } from "../action-types/Login.types";

export const jwtToken = (data: any) => ({
  payload: data,
  type: JWT_TOKEN,
});

export const metamaskLogin = (data: any) => ({
  payload: data,
  type: METAMASK_LOGIN,
});
