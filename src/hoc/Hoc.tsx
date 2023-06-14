import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const requireAuth = (ComposedComponent: React.FunctionComponent) => {
  const Authentication = () => {
    const navigate = useNavigate();
    const location: any = useLocation();

    const state = useSelector((state: any) => state.login);

    useEffect(() => {
      if (state.isMetaMaskLogin) {
        navigate(location.pathname);
      } else {
        navigate("/login");
      }
    }, []);

    return state.isMetaMaskLogin ? <ComposedComponent /> : null;
  };
  return Authentication;
};
export default requireAuth;
