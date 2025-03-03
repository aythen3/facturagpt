import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginToManager } from "../actions/user";
import { checkOrCreateUserBucket, getUserFiles } from "../actions/scaleway";
import { getAllUserAutomations } from "../actions/automate";
import { getAllClients } from "../actions/emailManager";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      let user = await localStorage.getItem("user");

      if (user) {
        const userData = JSON.parse(user);

        if (userData?.accessToken) {
          dispatch(
            loginToManager({
              accessToken: userData?.accessToken,
            })
          );
        }
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getAllClients());
      dispatch(getUserFiles({ userId: user.id }));
      dispatch(getAllUserAutomations({ userId: user?.id }));
    }
  }, [user]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContext;
