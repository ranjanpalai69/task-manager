import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/tasksSlice';
import TaskList from '../components/TaskList';

const AllTasks = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authUser); // Auth state from Redux store

  useEffect(() => {
    if (auth) {
      dispatch(fetchTasks());
    }
  }, [dispatch, auth]);
  
  return (
    <TaskList/>
  )
}

export default AllTasks