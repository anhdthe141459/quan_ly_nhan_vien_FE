import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen:false
  };

const isOpenDrawerSlice = createSlice({
  name: 'isOpenDrawerState',
  initialState,
  reducers: {
      openDrawer: (state) => {
        state.isOpen = true;  
      },
      closeDrawer: (state) => {
        state.isOpen = false; 
      },
      toggleDrawer: (state) => {
        state.isOpen = !state.isOpen; 
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = isOpenDrawerSlice.actions;
export default isOpenDrawerSlice.reducer;