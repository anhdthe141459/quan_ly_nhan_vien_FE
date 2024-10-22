// baseQueryWithReauth.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authApi } from './authApis';

let isRefreshing = false; // Biến để theo dõi trạng thái refresh token
let subscribers = []; 

const onRefreshed = (callback) => {
  subscribers.push(callback);
};

// Hàm gọi callback cho tất cả subscriber
const notifySubscribers = () => {
  subscribers.forEach((callback) => callback());
  subscribers = []; // Reset danh sách subscriber
};

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    prepareHeaders: (headers) => {
      // Lấy token từ localStorage và thêm vào header Authorization
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('token', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include', // Include cookies with requests
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error &&  result.error.status === 403) {
    if(!isRefreshing){
      isRefreshing = true;
      const refreshResult = await api.dispatch(authApi.endpoints.refreshToken.initiate());
  
      if (refreshResult.data) {
        localStorage.setItem('accessToken', refreshResult.data.accessToken);
        result = await baseQuery(args, api, extraOptions);
        notifySubscribers();

      } else {
        api.dispatch(authApi.endpoints.logout.initiate());
        localStorage.removeItem('accessToken');
        api.dispatch({ type: 'auth/logout' });
      }
      isRefreshing = false;
    }else{
      return new Promise((resolve) => {
        onRefreshed(() => {
          resolve(baseQuery(args, api, extraOptions)); // Gọi lại yêu cầu khi refresh xong
        });
      });
    }
  }

  return result;
};
