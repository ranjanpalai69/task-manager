import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://task-manager.cyclic.cloud/task', {
      headers: thunkAPI.getState().auth.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createNewTask = createAsyncThunk('tasks/createTask', async (taskData, thunkAPI) => {
  try {
    const response = await axios.post('https://task-manager.cyclic.cloud/task/create', taskData, {
      headers: thunkAPI.getState().auth.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateExistingTask = createAsyncThunk(
  'tasks/updateTask',
  async (taskData, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://task-manager.cyclic.cloud/task/${taskData.id}`, // Assuming you have a suitable API endpoint for updating a task
        taskData.data,
        {
          headers: thunkAPI.getState().auth.headers,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`https://task-manager.cyclic.cloud/task/${taskId}`, {
        headers: thunkAPI.getState().auth.headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


// Add other async actions...

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.data);
      })
      .addCase(updateExistingTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.data;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const deletedTaskId = action.payload.data._id;
        state.tasks = state.tasks.filter((task) => task._id !== deletedTaskId);
      });
  },
});

export default tasksSlice.reducer;

