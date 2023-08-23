import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: JSON.parse(localStorage.getItem('authUser')) || null,
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authUser'))?.token || ''}`,
    'Content-Type': 'application/json',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      state.headers.Authorization = `Bearer ${action.payload?.token || ''}`;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
      state.headers.Authorization = '';
    },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
