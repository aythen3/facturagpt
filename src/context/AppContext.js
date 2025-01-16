import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginToManager } from "../actions/user";
import { checkOrCreateUserBucket, getUserFiles } from "../actions/scaleway";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("CONTEXT RENDER");
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
    console.log("===USER===", user);
    if (user && user.id) {
      // dispatch(checkOrCreateUserBucket({ userId: user.id })).then(() =>
      //   dispatch(getUserFiles({ userId: user.id }))
      // );
      dispatch(getUserFiles({ userId: user.id }));
    }
  }, [user]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContext;
