import { createContext, useState } from "react";


export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
     
    const[authState,setAuthState]=useState({
        token: JSON.parse(localStorage.getItem("token")) || "",
        current_user:JSON.parse(localStorage.getItem("current_user")) || ""
    })
    


     return <AuthContext.Provider value={{authState,setAuthState}}>
              {children}
          </AuthContext.Provider>
}