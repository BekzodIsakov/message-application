import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  return (
    <UserContext.Provider value={[userName, setUserName]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
