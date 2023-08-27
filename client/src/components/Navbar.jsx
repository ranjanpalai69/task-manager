import React, { useContext } from "react" ;
import  "../components/Navbar.css";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../context/AuthContextProvider';


const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const {authState,setAuthState}=useContext(AuthContext);
  const {token,current_user} = authState;
  const navigate=useNavigate();
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const validateRegister=()=>{
    if(token && current_user){
        return 
    }
    navigate("/register");
  }

  const validateLogin=()=>{
    if(token && current_user){
       localStorage.setItem("token",JSON.stringify(""));
       localStorage.setItem("current_user",JSON.stringify(""));
       setAuthState({...authState,token:"",current_user:""});
    }
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo" onClick={()=>navigate("/")}>
          TaskApp
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
        <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue' variant='solid' onClick={validateRegister}>
          {current_user && token?`Hi , ${current_user}`:"Register"}
        </Button> &nbsp; &nbsp;
        <Button leftIcon={<ArrowBackIcon />} colorScheme='blue' variant='solid' onClick={validateLogin}>
          {current_user && token?"Logout":"Login"}
        </Button>
        </div>
      </div>
    </nav>
  );
};


const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);



export default Navbar;