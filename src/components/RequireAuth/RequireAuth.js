import React from "react";
import { useSelector } from "react-redux";

export const RequireAuth = ({ navigation, Component }) => {
  const auth = useSelector((state) => state.auth?.accessToken);
  console.log("Auth", auth);
  return auth ? <Component /> : navigation.navigate("Login");
};
