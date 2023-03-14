import React, { useState } from "react";

export const UserContext = React.createContext({});

export const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      { props.children }
    </UserContext.Provider>
  );
}