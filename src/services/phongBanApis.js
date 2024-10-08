import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tạo API service với createApi
export const phongBanApi = createApi({
  reducerPath: 'phongBanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
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
export const {useGetAllPhongBanQuery,useGetAllTenPhongBanQuery,useGetAllNhanVienNotPhongBanQuery,useCreateOrUpdatePhongBanMutation,useRemovePhongBanMutation } = phongBanApi;