import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  users: [],
  error: null, 
  isLoading: false
};

// Create the users slice using createSlice
const userSlice = createSlice({
  name: 'users', 
  initialState, 
  reducers: {
    fetchUsers(state, action) {
      state.isLoading = true;
    },

    fetchUsersSuccess(state, action) {
      state.users = action.payload;
      state.error = null;
      state.isLoading= false;
    },

    fetchUsersFailure(state, action) {
      state.users = [];
      state.error = action.payload;
      state.isLoading= false;
    },
  },
});

// Export the reducer functions as actions
export const { 
  fetchUsers,
  fetchUsersSuccess, 
  fetchUsersFailure 
} = userSlice.actions;

export default userSlice.reducer;