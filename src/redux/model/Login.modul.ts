export interface LoginState {
  authorization: string;
}

interface LoginAction {
  type: string;
  payload: any;
}

export type LoginTypes = LoginAction;
