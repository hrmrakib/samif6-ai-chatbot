import baseAPI from "@/redux/api/baseAPI";

const AuthenticationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup/",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-email/",
        method: "POST",
        body,
      }),
    }),

    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useSendOtpMutation,
  useResendOtpMutation,
} = AuthenticationAPI;
