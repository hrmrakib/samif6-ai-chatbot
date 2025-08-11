import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = "http://10.10.12.111:8001/";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["Session"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseAPI,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAiChatBySession: builder.query({
      query: (id) => ({
        url: `/ai/all_chat/?session_id=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getAiChatSession: builder.query({
      query: (email) => ({
        url: `/ai/all_sessions/?email=${email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    createSession: builder.mutation({
      query: (data) => ({
        url: "/ai/chat_session/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data,
      }),
    }),

    createChat: builder.mutation({
      query: (data) => ({
        url: "/ai/chat/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data,
      }),
    }),

    serachChats: builder.query({
      query: ({ q, email }) => ({
        url: `/ai/search/?q=${q}&email=${email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/ai/chat/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAiChatBySessionQuery,
  useGetAiChatSessionQuery,
  useCreateSessionMutation,
  useCreateChatMutation,
  useSerachChatsQuery,
} = chatApi;
export default chatApi;
