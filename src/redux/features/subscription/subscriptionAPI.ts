import baseAPI from "@/redux/api/baseAPI";

const subscriptionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: "api/subscription/plans/",
        method: "GET",
      }),
    }),

    createSubscription: builder.mutation({
      query: (data) => ({
        url: "api/subscription/user-subscribe/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useGetSubscriptionQuery, useCreateSubscriptionMutation } =
  subscriptionAPI;
export default subscriptionAPI;
