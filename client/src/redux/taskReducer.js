// taskReducers.js

const initialState = {
    tasks: {
      
    },
    loading: false,
    error: null,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TASKS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_TASKS_SUCCESS':
        return { ...state, tasks: action.payload, loading: false, error: null };
      case 'FETCH_TASKS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'ADD_TASK_REQUEST':
        return { ...state, loading: true, error: null };
      case 'ADD_TASK_SUCCESS':
        return { ...state, tasks: {...state.tasks, docs:[...state.tasks.docs,action.payload]}, loading: false, error: null };
      case 'ADD_TASK_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'REMOVE_TASK_REQUEST':
        return { ...state, loading: true, error: null };
      case 'REMOVE_TASK_SUCCESS':{
          const updatedTasks = state.tasks.docs.filter(task => task._id !== action.payload);
          return { ...state, tasks: {...state.tasks,docs:updatedTasks}, loading: false, error: null };
      }
      case 'REMOVE_TASK_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'EDIT_TASK_REQUEST':
        return { ...state, loading: true, error: null }; 
      case 'EDIT_TASK_SUCCESS':{
        const updatedTaskIndex = state.tasks.docs.findIndex(task => task._id === action.payload._id);
           if (updatedTaskIndex !== -1) {
           const updatedTasks = [...state.tasks.docs];
            updatedTasks[updatedTaskIndex] = action.payload;
         return { ...state, tasks: {...state.tasks,docs:updatedTasks}, loading: false, error: null };
        }
      
      return state;
      }
      case 'EDIT_TASK_FAILURE':
        return { ...state, loading: false, error: action.payload };

      default:{
        return state;
    }
  }

}
  
export default taskReducer;
  