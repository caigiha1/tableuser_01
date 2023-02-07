import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://randomuser.me/api/" }),
  reducerPath: "adminApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: ({ page, results }) => ({
        url: `?page=${page + 1}&result=${results}`,
        method: "GET",
        params: { page, results },
      }),
      ProviderTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = api;
