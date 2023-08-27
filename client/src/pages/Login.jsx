import { useContext, useState } from "react";
import "../styles/auth.css"
import { AuthContext } from "../context/AuthContextProvider";
import { useToast } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"



const Login = () => {
    const [loading,setLoading]=useState(false);
    const toast=useToast();
    const {authState,setAuthState} = useContext(AuthContext);
    const navigate=useNavigate();
    const[user,setUser]=useState({
        
        password:"",
        email:""
    })

    const handleChange=(event)=>{
      setUser({...user,[event.target.name]:event.target.value});
  }
  const handleSubmit=(e)=>{
      e.preventDefault();
      signin(user)
  }

  const signin = async (cred) => {
    const {  password, email } = cred;

    try {
        setLoading(true);
        const response = await fetch(`https://task-manager.cyclic.cloud/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  password, email }),
        });

        const data = await response.json();
        setLoading(false);
        if(data.token){
            toast({
                title: 'Login Success',
                description: "user logged in",
                status: 'success',
                duration: 4000,
                isClosable: true,
              });
              localStorage.setItem("token",JSON.stringify(data.token));
              localStorage.setItem("current_user", JSON.stringify(data.user.username));
              setAuthState({...authState,token:data.token,current_user:data.user.username});
              navigate("/")
        }else{
          toast({
            title: 'Error Occured',
            description: data.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
        console.log(data);
        
    } catch (error) {
       console.log(error);
       setLoading(false);
       toast({
        title: 'Error Occured',
        description: "Failed user login",
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
};

const notHaveAccount=()=>{
  navigate("/register");
}


  return (
    <form className="loginform" onSubmit={handleSubmit}>
      <h2 className="headerTitle">Login</h2>
      <div>
        <div className="row">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" name="email" onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" name="password" onChange={handleChange}/>
        </div>
        <div className="row">
        <div> Don't have an account &nbsp; <span style={{"fontSize":"large","color":"teal",borderBottom:"2px solid teal"}} onClick={notHaveAccount}>Register</span></div>
        </div>
        <div  className="row button">
         
        <input type="submit" value={loading?"Submitting...":"Submit"} />
        </div>
      </div>
      
    </form>
  );
};

export default Login;


