import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
// Tạo API service với createApi
export const nhanVienApi = createApi({
  reducerPath: 'nhanVienApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['NhanVien'],
  endpoints: (builder) => ({
    getAllNhanVien: builder.query({
      query: () => 'nhanVien/getAllNhanVien',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'NhanVien', id })), 'NhanVien'] : ['NhanVien'],
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
      invalidatesTags: ['NhanVien'],
    }),
    removeNhanVien: builder.mutation({
      query: (id) => ({
        url: `nhanVien/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['NhanVien'],
    }),
    searchNhanVien: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `nhanVien/search?${queryString}`;
      },
    }),
    downloadExcelNhanVien: builder.query({
      query: () => ({
          url: 'nhanVien/downloadExcel',
          method: 'GET',
          responseHandler: (response) => response.blob(), // Handle the response as a Blob
      }),
  }),
  }),
});

// Export hooks auto-generated từ RTK Query
export const { useGetAllNhanVienQuery, useCreateOrUpdateNhanVienMutation, useRemoveNhanVienMutation, useSearchNhanVienQuery, useCountNhanVienQuery, useLazyDownloadExcelNhanVienQuery } = nhanVienApi;