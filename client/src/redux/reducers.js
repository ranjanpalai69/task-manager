// reducers.js
import { combineReducers } from 'redux';
import taskReducer from './taskReducer';


const rootReducer = combineReducers({
  tasks: taskReducer,
  // You can add more reducers here if needed
});

export default rootReducer;
