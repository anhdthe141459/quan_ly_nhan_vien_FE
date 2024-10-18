import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tạo API service với createApi
export const chamCongApi = createApi({
  reducerPath: 'chamCongApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['ChamCong'],
  endpoints: (builder) => ({
    getChamCongMoiNgay: builder.query({
      query: (maPhongBan) => `chamCong/getChamCongMoiNgay/${maPhongBan}`,
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'ChamCong', id })), 'ChamCong'] : ['ChamCong'],
    }),
    getChamCongMoiThang: builder.query({
      query: ([year,month]) => `chamCong/getChamCongMoiThang?year=${year}&month=${month}`,
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'ChamCong', id })), 'ChamCong'] : ['ChamCong'],
    }),
    getChamCongNhanVienChiTietTheoThang: builder.query({
      query: ([year,month,id]) => `chamCong/getChamCongNhanVienChitTietTheoThang?year=${year}&month=${month}&id=${id}`,
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'ChamCong', id })), 'ChamCong'] : ['ChamCong'],
    }),
    getTrangThaiCuaNhanVienMoiThang: builder.query({
      query: ([year,month,id]) => `chamCong/getTrangThaiCuaNhanVienMoiThang?year=${year}&month=${month}&id=${id}`,
      providesTags: ['ChamCong'],
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
export const {useCreateChamCongsMutation , useGetChamCongMoiNgayQuery, useGetChamCongMoiThangQuery, useGetChamCongNhanVienChiTietTheoThangQuery, useGetTrangThaiCuaNhanVienMoiThangQuery } = chamCongApi;