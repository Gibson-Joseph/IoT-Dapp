import { JWT_TOKEN } from "../action-types/Login.types";

export const jwtToken = (data: any) => ({
  payload: data,
  type: JWT_TOKEN,
});
