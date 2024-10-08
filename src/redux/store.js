import { configureStore } from '@reduxjs/toolkit';
import { nhanVienApi } from '../services/nhanvienApis';
import { phongBanApi } from '../services/phongBanApis';
import isOpenDrawerReducer  from './slices/isOpenDrawerSlice';

export const store = configureStore({
  reducer: {
    // Thêm postsApi reducer vào store
    [nhanVienApi.reducerPath]: nhanVienApi.reducer,
    [phongBanApi.reducerPath]: phongBanApi.reducer,
    isOpenDrawerState: isOpenDrawerReducer,
  },
  // Thêm middleware RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nhanVienApi.middleware,phongBanApi.middleware),
});