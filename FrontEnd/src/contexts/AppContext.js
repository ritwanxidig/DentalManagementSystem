import { createContext, useContext, useState } from "react";

const StateContext = createContext();
const initialState = {
  chat: false,
  notification: false,
  profile: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setactiveMenu] = useState(true);
  const [activeLink, setactiveLink] = useState("");
  const [Role, setRole] = useState("");
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const [Success, setSuccess] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState("");
  const [User, setUser] = useState(null);
  const [isClicked, setisClicked] = useState(initialState);

  const handleClick = (clicked) => {
    setisClicked({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeLink,
        activeMenu,
        setactiveLink,
        setactiveMenu,
        Role,
        setRole,
        isClicked,
        handleClick,
        setisClicked,
        initialState,
        setUser,
        User,
        screenSize,
        setScreenSize,
        Error,
        setError,
        ErrorMessage,
        setErrorMessage,
        Success,
        setSuccess,
        SuccessMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
