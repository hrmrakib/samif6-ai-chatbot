import baseAPI from "@/redux/api/baseAPI";

const contactAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendContact: builder.mutation({
      query: (data) => ({
        url: "api/dicipline/contact-form/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useSendContactMutation } = contactAPI;
export default contactAPI;
