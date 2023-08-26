import { useContext, useState } from "react";
import "../styles/auth.css"
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
const Register = () => {
    const [loading,setLoading]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();
    const {authState,setAuthState} = useContext(AuthContext);
    const[user,setUser]=useState({
        username:"",
        password:"",
        email:""
    })
    const signup = async (cred) => {
        const { username, password, email } = cred;
    
        try {
            setLoading(true);
            const response = await fetch(`https://task-manager.cyclic.cloud/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
    
            const data = await response.json();
            setLoading(false);
            if(data.message==="user registered successfully"){
                toast({
                    title: 'Registration Success',
                    description: "User has been registered",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  });
                  setAuthState({...authState,isRegistered:true});
                  navigate("/login");
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
            description: "Failed user registration",
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
    };
    const handleChange=(event)=>{
        setUser({...user,[event.target.name]:event.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        signup(user)
    }

    const alreadyLogin=()=>{
      setAuthState({...authState,isRegistered:true});
      navigate("/login")
    }
    
   
  return (
    <form className="loginform" onSubmit={handleSubmit}>
      <h2 className="headerTitle">Register</h2>
      <div>
        <div className="row">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" name="username" onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" name="email" onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" name="password" onChange={handleChange}/>
        </div>
        <div className="row">
          <div>Already have an account &nbsp; <span style={{"fontSize":"large","color":"teal",borderBottom:"2px solid teal"}} onClick={alreadyLogin}>sign in</span></div>
          
        </div>
        <div  className="row button">
          <input type="submit" value={loading?"Submitting...":"Submit"} />
        </div>
      </div>
      
    </form>
  );
};

export default Register;



