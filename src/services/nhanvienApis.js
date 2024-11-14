import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
// Tạo API service với createApi
export const nhanVienApi = createApi({
  reducerPath: 'nhanVienApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['NhanVien'],
  endpoints: (builder) => ({
    getAllNhanVien: builder.query({
      query: ({ page, limit }) => `nhanVien/getAllNhanVien?page=${page}&limit=${limit}`,
      providesTags: ['NhanVien'],
      // providesTags: (result) =>
      //   result ? [...result.map(({ id }) => ({ type: 'NhanVien', id })), 'NhanVien'] : ['NhanVien'],
    }),
    getAvatarNhanVien: builder.query({
      query: (id) => ({
        url: `nhanVien/getAvatar/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'NhanVienDetail', id }],
    }),
    countNhanVien: builder.query({
      query: () => 'nhanVien/countNhanVien',
      providesTags: ['NhanVien'],
    }),
    createOrUpdateNhanVien: builder.mutation({
      query: (nhanVien) => ({
         url:'nhanVien/crateOrUpdate',
         method: 'POST',
         body: nhanVien, 
      }),
      invalidatesTags: (result, error, { id }) => [
        'NhanVien', // invalidate danh sách để cập nhật lại
        { type: 'NhanVienDetail', id }, // invalidate chi tiết của nhân viên cụ thể
      ],

    }),
    removeNhanVien: builder.mutation({
      query: (id) => ({
        url: `nhanVien/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['NhanVien'],
    }),
    searchNhanVien: builder.query({
      query: ({ searchQuery, page, limit }) => {
        const queryString = new URLSearchParams({ query: JSON.stringify(searchQuery), page ,limit }).toString();
        return `nhanVien/search?${queryString}`;
      },
      providesTags: ['NhanVien'],

    }),
    downloadExcelNhanVien: builder.query({
      query: (params) => ({
          url: `nhanVien/downloadExcel?${new URLSearchParams(params).toString()}`,
          method: 'GET',
          responseHandler: (response) => response.blob(), // Handle the response as a Blob
      }),
  }),
  }),
});

// Export hooks auto-generated từ RTK Query
export const { useGetAllNhanVienQuery, useGetAvatarNhanVienQuery , useCreateOrUpdateNhanVienMutation, useRemoveNhanVienMutation, useLazySearchNhanVienQuery, useCountNhanVienQuery, useLazyDownloadExcelNhanVienQuery } = nhanVienApi;