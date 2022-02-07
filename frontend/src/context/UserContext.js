import { createContext } from "react";
import useAuth from "../hooks/useAuth";


const Context = createContext()

function UseProvider({ children }) {
  const { register, authenticated, logout, login } = useAuth()

  return <Context.Provider value={{ register, authenticated, logout, login }}>{ children }</Context.Provider>
}

export { Context, UseProvider }