import baseAPI from "../../api/baseAPI";

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTermsConditions: builder.query({
      query: () => `api/dicipline/terms-conditions/`,
    }),
    getPrivacyPolicy: builder.query({
      query: () => `api/dicipline/terms-conditions/`,
    }),
    getTrustSafety: builder.query({
      query: () => `api/dicipline/terms-conditions/`,
    }),
  }),
});

export const {
  useGetTermsConditionsQuery,
  useGetPrivacyPolicyQuery,
  useGetTrustSafetyQuery,
} = settingAPI;
export default settingAPI;
