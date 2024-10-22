import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
// Tạo API service với createApi
export const bangLuongApi = createApi({
  reducerPath: 'bangLuongApi',
  baseQuery:baseQueryWithReauth,
  tagTypes: ['BangLuong'],
  endpoints: (builder) => ({
    getAllBangLuongChoNhanVien: builder.query({
        query: () => 'bangLuong/getAllBangLuongChoNhanVien',
        providesTags: (result) =>
          result ? [...result.map(({ id }) => ({ type: 'BangLuong', id })), 'BangLuong'] : ['BangLuong'],
    }),

    getAllTenNhanVienChuaCoBangLuong: builder.query({
        query: () => 'nhanVien/getAllTenNhanVienChuaCoBangLuong',
        providesTags: (result) =>
          result ? [...result.map(({ id }) => ({ type: 'BangLuong', id })), 'BangLuong'] : ['BangLuong'],
      }),
    
    getLuongNhanVienTheoThang: builder.query({
        query: ([year,month]) => `bangLuong/getLuongNhanVienTheoThang?year=${year}&month=${month}`,
        providesTags: (result) =>
          result ? [...result.map(({ id }) => ({ type: 'BangLuong', id })), 'BangLuong'] : ['BangLuong'],
      }),

    searchBangLuong: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `bangLuong/search?${queryString}`;
      },
    }),

    createOrUpdateBangLuong: builder.mutation({
    query: (bangLuong) => ({
        url:'bangLuong/createOrUpdate',
        method: 'POST',
        body: bangLuong, 
    }),
    invalidatesTags: ['BangLuong'],
    }),

    downloadExcelBangLuong: builder.query({
      query: () => ({
          url: 'bangLuong/downloadExcel',
          method: 'GET',
          responseHandler: (response) => response.blob(), // Handle the response as a Blob
      }),
    }),
    downloadExcelLuongTheoThang: builder.query({
      query: ([year,month]) => ({
          url: `bangLuong/downloadExcelLuongTheoThang?year=${year}&month=${month}`,
          method: 'GET',
          responseHandler: (response) => response.blob(), // Handle the response as a Blob
      }),
    }),

  }),
});

// Export hooks auto-generated từ RTK Query
export const {  useCreateOrUpdateBangLuongMutation , useGetAllBangLuongChoNhanVienQuery, useGetAllTenNhanVienChuaCoBangLuongQuery, useGetLuongNhanVienTheoThangQuery, useSearchBangLuongQuery, useLazyDownloadExcelBangLuongQuery, useLazyDownloadExcelLuongTheoThangQuery } = bangLuongApi;