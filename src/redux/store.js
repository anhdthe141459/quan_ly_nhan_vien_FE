import { configureStore } from '@reduxjs/toolkit';
import { nhanVienApi } from '../services/nhanvienApis';
import { phongBanApi } from '../services/phongBanApis';
import isOpenDrawerReducer  from './slices/isOpenDrawerSlice';
import { chamCongApi } from '../services/chamCongApis';
import { bangLuongApi } from '../services/bangLuongApis';
import { authApi } from '../services/authApis';
import { generateDataApi } from '../services/generateDataApi';

export const store = configureStore({
  reducer: {
    // Thêm postsApi reducer vào store
    [nhanVienApi.reducerPath]: nhanVienApi.reducer,
    [phongBanApi.reducerPath]: phongBanApi.reducer,
    [chamCongApi.reducerPath]: chamCongApi.reducer,
    [bangLuongApi.reducerPath]: bangLuongApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [generateDataApi.reducerPath]: generateDataApi.reducer,
    isOpenDrawerState: isOpenDrawerReducer,
  },
  // Thêm middleware RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nhanVienApi.middleware,phongBanApi.middleware,chamCongApi.middleware,bangLuongApi.middleware,authApi.middleware,generateDataApi.middleware),
});