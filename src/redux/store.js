import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../services/postsApi';

export const store = configureStore({
  reducer: {
    // Thêm postsApi reducer vào store
    [postsApi.reducerPath]: postsApi.reducer,
  },
  // Thêm middleware RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});