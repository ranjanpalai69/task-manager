import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, createNewTask } from '../redux/tasksSlice';
import { Heading, useDisclosure } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import DataNotFound from './NotFound';
import AllTask from './AllTask';



function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  
  const modalWork = useDisclosure();
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  
  console.log(tasks)
  return (
    <div>
      <Heading width="full" m="10px auto" textAlign="center" color="black.200"  textDecoration="underline" textDecorationColor="orange.400">Task Management App <CalendarIcon/></Heading>
      <div>
        {
          tasks?.length>0?<AllTask modalWork={modalWork} initialRef={initialRef} finalRef={finalRef}/>:<DataNotFound modalWork={modalWork} initialRef={initialRef} finalRef={finalRef}/>
        }
       </div>

      </div>


  )

      }

      export default TaskList;