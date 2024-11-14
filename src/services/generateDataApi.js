import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

// Tạo API service với createApi
export const generateDataApi = createApi({
  reducerPath: 'generateDataApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({

    //genarate data

    genaratePhongBanData: builder.mutation({
      query: () => ({
          url:'generate/generatePhongBanData',
          method: 'POST', 
      }),
    }),

    generateNhanVienData: builder.mutation({
        query: () => ({
            url:'generate/generateNhanVienData',
            method: 'POST', 
        }),
      }),

    generateLuongNhanVienData: builder.mutation({
      query: () => ({
          url:'generate/generateLuongNhanVienData',
          method: 'POST', 
      }),
    }),

    generateChamCongNhanVienData: builder.mutation({
      query: () => ({
          url:'generate/generateChamCongNhanVienData',
          method: 'POST', 
      }),
    }),

    deleteAllPhongBan: builder.mutation({
      query: () => ({
        url: `generate/deleteAllData`,
        method: 'DELETE',
      }),
    }),

    deleteAllDataNhanVien: builder.mutation({
        query: () => ({
          url: `generate/deleteAllDataNhanVien`,
          method: 'DELETE',
        }),
    }),

    deleteAllDataLuongNhanVien: builder.mutation({
      query: () => ({
        url: `generate/deleteAllDataLuongNhanVien`,
        method: 'DELETE',
      }),
    }),

    deleteAllDataChamCongNhanVien: builder.mutation({
      query: () => ({
        url: `generate/deleteAllDataChamCongNhanVien`,
        method: 'DELETE',
      }),
    }),

  }),
});

// Export hooks auto-generated từ RTK Query
export const {useGenaratePhongBanDataMutation, useDeleteAllPhongBanMutation, useGenerateNhanVienDataMutation, useDeleteAllDataNhanVienMutation, useGenerateLuongNhanVienDataMutation, useDeleteAllDataLuongNhanVienMutation, useGenerateChamCongNhanVienDataMutation, useDeleteAllDataChamCongNhanVienMutation } = generateDataApi;