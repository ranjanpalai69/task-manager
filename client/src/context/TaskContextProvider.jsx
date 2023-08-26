// import { createContext, useEffect, useState } from "react";
// import { headers } from "../api";


// export const TaskContext=createContext();


//     const url = 'https://task-manager.cyclic.cloud/task';
    

// export const TaskContextProvider=({children})=>{
    
//     const [tasks,setTasks]=useState([]);
//     const [isLoading,setIsLoading]=useState(false);

//     const fetchTasks=async()=>{
//           try {
//             setIsLoading(true);
//             let res=await fetch(url,{
//                 method: 'GET', 
//                 headers: headers
//               });

//              let data=await res.json();
//              setTasks(data);
//              setIsLoading(false)
//           } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//           }
//     }
    

//     useEffect(()=>{
        
//         fetchTasks();
//     },[]);


//    return <TaskContext.Provider value={{tasks,isLoading,setIsLoading,fetchTasks,setTasks}}>
//      {children}
//    </TaskContext.Provider>
// }