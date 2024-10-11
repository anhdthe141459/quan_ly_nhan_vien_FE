import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tạo API service với createApi
export const chamCongApi = createApi({
  reducerPath: 'chamCongApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['ChamCong'],
  endpoints: (builder) => ({
    getChamCongMoiNgay: builder.query({
      query: (maPhongBan) => `chamCong/getChamCongMoiNgay/${maPhongBan}`,
    }),
    createChamCongs: builder.mutation({
    query: (chamCongs) => ({
        url:'chamCong/create',
        method: 'POST',
        body: chamCongs, 
    }),
    invalidatesTags: ['ChamCong'],
    }),

  }),
});

// Export hooks auto-generated từ RTK Query
export const {useCreateChamCongsMutation , useGetChamCongMoiNgayQuery } = chamCongApi;