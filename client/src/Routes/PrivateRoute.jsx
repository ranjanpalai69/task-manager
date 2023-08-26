import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  let authuser=JSON.parse(localStorage.getItem('authUser')) || null;
  if(!authuser) {
    return <Navigate to="/register" />;
  }
  else{
    return children
  }
}

export default PrivateRoute