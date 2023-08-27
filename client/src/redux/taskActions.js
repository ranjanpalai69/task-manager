

// taskActions.js
export const fetchTasks = (token) => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_TASKS_REQUEST' });
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task`, {
          method: 'GET',
          headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      }
    };
  };
  
  export const addNewTask = (task,token) => {
    return async (dispatch) => {
      dispatch({ type: 'ADD_TASK_REQUEST' });
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(task),
        });
        let data = await res.json();
        dispatch({ type: 'ADD_TASK_SUCCESS', payload: data.data });
      } catch (error) {
        dispatch({ type: 'ADD_TASK_FAILURE', payload: error.message });
      }
    };
  };
  
  export const removeTask = (id,token) => {
    return async (dispatch) => {
      dispatch({ type: 'REMOVE_TASK_REQUEST'});
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        });
        let data = await res.json();
        dispatch({ type: 'REMOVE_TASK_SUCCESS', payload: id });
      } catch (error) {
        dispatch({ type: 'REMOVE_TASK_FAILURE', payload: error.message });
      }
    };
  };
  
  export const editTask = (id, editedTask,token) => {
    return async (dispatch) => {
      dispatch({ type: 'EDIT_TASK_REQUEST'});
      try {
        let res = await fetch(`https://task-manager.cyclic.cloud/task/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(editedTask),
        });
        let data = await res.json();
        dispatch({ type: 'EDIT_TASK_SUCCESS', payload: data.data });
      } catch (error) {
        dispatch({ type: 'EDIT_TASK_FAILURE', payload: error.message });
      }
    };
  };
  