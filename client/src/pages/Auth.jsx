import  { useContext } from "react";
import LoginForm from "../components/Login";
import RegisterForm from "../components/Register";
import { AuthContext } from "../context/AuthContextProvider";

const Auth = () => {
  const {authState} = useContext(AuthContext);
  
   if(authState.isRegistered) {
      return <LoginForm/>
   }
   else{
    return <RegisterForm/>
   }
  
  
  }
export default Auth;
