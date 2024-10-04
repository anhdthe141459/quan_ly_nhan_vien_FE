import { configureStore } from '@reduxjs/toolkit';
import { nhanVienApi } from '../services/nhanviensApi';
import isOpenDrawerReducer  from './slices/isOpenDrawerSlice';

export const store = configureStore({
  reducer: {
    // Thêm postsApi reducer vào store
    [nhanVienApi.reducerPath]: nhanVienApi.reducer,
    isOpenDrawerState: isOpenDrawerReducer,
  },
  // Thêm middleware RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nhanVienApi.middleware),
});