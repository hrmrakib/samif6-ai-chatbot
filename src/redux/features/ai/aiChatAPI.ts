import baseAPI from "@/redux/api/baseAPI";

const aiChatAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAiChat: builder.query({
      query: () => ({
        url: "api/ai/ai-chat/",
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
  }),
});

export const {
  useGetAiChatQuery,
  useCreateSessionMutation,
  useCreateChatMutation,
} = aiChatAPI;
export default aiChatAPI;
