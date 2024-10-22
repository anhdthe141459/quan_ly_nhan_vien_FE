import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

// Tạo API service với createApi
export const phongBanApi = createApi({
  reducerPath: 'phongBanApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PhongBan'],
  endpoints: (builder) => ({
    getAllPhongBan: builder.query({
      query: () => 'phongBan/getAllPhongBan',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'PhongBan', id })), 'PhongBan'] : ['PhongBan'],
      invalidatesTags: ['PhongBan'],
    }),
    getAllTenPhongBan: builder.query({
      query: () => 'phongBan/getAllTenPhongBan',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'PhongBan', id })), 'PhongBan'] : ['PhongBan'],
      invalidatesTags: ['PhongBan'],
    }),
    getAllNhanVienPhongBan: builder.query({
      query: (maPhongBan) => `phongBan/getAllNhanVienPhongBan/${maPhongBan}`,
    }),
    countPhongBan: builder.query({
      query: () => 'phongBan/countPhongBan',
      providesTags: ['PhongBan'],
    }),
    getAllNhanVienNotPhongBan: builder.query({
        query: (maPhongBan) => `phongBan/getAllNhanVienNotPhongBan/${maPhongBan}`,
        providesTags: (result) =>
            result ? [...result.map(({ id }) => ({ type: 'PhongBan', id })), 'PhongBan'] : ['PhongBan'],
      }),
    createOrUpdatePhongBan: builder.mutation({
    query: (phongBan) => ({
        url:'phongBan/crateOrUpdate',
        method: 'POST',
        body: phongBan, 
    }),
    invalidatesTags: ['PhongBan'],
    }),

    searchPhongBan: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `phongBan/search?${queryString}`;
      },
    }),

    removePhongBan: builder.mutation({
        query: (id) => ({
          url: `phongBan/delete/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['PhongBan'],
      }),
  }),
});

// Export hooks auto-generated từ RTK Query
export const {useGetAllPhongBanQuery,useGetAllTenPhongBanQuery,useGetAllNhanVienNotPhongBanQuery, useGetAllNhanVienPhongBanQuery, useCreateOrUpdatePhongBanMutation,useRemovePhongBanMutation, useSearchPhongBanQuery, useCountPhongBanQuery } = phongBanApi;