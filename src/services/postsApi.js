import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tạo API service với createApi
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
});

// Export hooks auto-generated từ RTK Query
export const { useGetPostsQuery } = postsApi;