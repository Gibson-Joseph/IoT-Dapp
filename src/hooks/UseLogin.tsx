import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { jwtToken } from "../redux/actions/Logins.action";
const UseLogin = () => {
  const [bearer, setBearer] = useState<any>();
  const dispatch = useDispatch();
  // const baseURL = "https://sipcot.api.codingtown.com/";
  const fetchHeader = () => {
    axios
      .post(
        "https://sipcot.api.codingtown.com/v1/login",
        {
          email: "edison@yavar.in",
          password: "12345678",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setBearer(res.headers["authorization"]);
        dispatch(jwtToken({ authorization: res.headers["authorization"] }));
      })
      .catch((err) => console.log("err", err));
  };

  const state = useSelector((state: any) => state.login);
  // const fetchPark = () => {
  //   axios
  //     .get("https://sipcot.api.codingtown.com/v1/dashboards/parks", {
  //       headers: {
  //         Authorization: state.authorization,
  //       },
  //     })
  //     .then((res) => console.log("park details", res))
  //     .catch((err) => console.log("Park Error", err));
  // };

  useEffect(() => {
    !state.authorization && fetchHeader();
    // state && fetchPark();
  }, []);
  return bearer;
};

export default UseLogin;
