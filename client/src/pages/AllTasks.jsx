import {  useEffect, useRef } from "react"
import { Heading, useDisclosure } from "@chakra-ui/react";
import TaskList from "../components/TaskList";
import DataNotFound from "../components/NotFound";
import { CalendarIcon } from "@chakra-ui/icons";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskActions";


const AllTasks = () => {

  const modalWork = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return <Loader text={"Getting..."}/>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
        <div>
      <Heading width="full" m="10px auto" textAlign="center" color="black.200"  textDecoration="underline" textDecorationColor="orange.400">Task Management App <CalendarIcon/></Heading>
      <div>
        {
          tasks?.length>0?<TaskList modalWork={modalWork} initialRef={initialRef} finalRef={finalRef}/>:<DataNotFound modalWork={modalWork} initialRef={initialRef} finalRef={finalRef}/>
        }
       </div>

      </div>
  )
}

export default AllTasks

