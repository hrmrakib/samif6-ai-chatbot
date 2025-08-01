"use client";

import { useGetTermsConditionsQuery } from "@/redux/features/setting/settingAPI";

const TermsAndConditions = () => {
  const { data } = useGetTermsConditionsQuery({});

  return (
    <div className='min-h-screen bg-[#E9E9E9]'>
      <div className='container mx-auto'>
        <h2 className='text-2xl md:text-[36px] font-bold pt-8 pb-5 border-b border-b-[#B5B5B5]'>
          Trust & Safety
        </h2>

        <div className='mt-4 space-y-10'>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
