import { headers } from "../api";

// taskActions.js
export const fetchTasks = () => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_TASKS_REQUEST' });
  
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task`, {
          method: 'GET',
          headers: headers,
        });
        let data = await res.json();
        dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      }
    };
  };
  
  export const addNewTask = (task) => {
    return async (dispatch) => {
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task/create`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(task),
        });
        let data = await res.json();
        dispatch({ type: 'ADD_TASK_SUCCESS', payload: data.data });
      } catch (error) {
        dispatch({ type: 'TASK_ACTION_FAILURE', payload: error.message });
      }
    };
  };
  
  export const removeTask = (id) => {
    return async (dispatch) => {
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task/${id}`, {
          method: 'DELETE',
          headers: headers,
        });
        let data = await res.json();
        dispatch({ type: 'REMOVE_TASK_SUCCESS', payload: id });
      } catch (error) {
        dispatch({ type: 'TASK_ACTION_FAILURE', payload: error.message });
      }
    };
  };
  
  export const editTask = (id, editedTask) => {
    return async (dispatch) => {
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task/${id}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(editedTask),
        });
        let data = await res.json();
        console.log("edit",data);
        console.log(editedTask);
        dispatch({ type: 'EDIT_TASK_SUCCESS', payload: data.data });
      } catch (error) {
        dispatch({ type: 'TASK_ACTION_FAILURE', payload: error.message });
      }
    };
  };
  