import { createContext } from "react";
import useAuth from "../hooks/useAuth";


const Context = createContext()

function UseProvider({ children }) {
  const { authenticated, register } = useAuth()

  return <Context.Provider value={{ authenticated, register }}>{ children }</Context.Provider>
}

export { Context, UseProvider }