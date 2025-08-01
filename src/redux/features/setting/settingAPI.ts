import baseAPI from "../../api/baseAPI";

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTermsConditions: builder.query({
      query: () => `/api/setting/terms-conditions/`,
    }),
  }),
});

export const { useGetTermsConditionsQuery } = settingAPI;
export default settingAPI;
