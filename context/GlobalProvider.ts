import { createContext, useContext } from "react";

const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);
