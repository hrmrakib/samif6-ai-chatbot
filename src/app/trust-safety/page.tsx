"use client";

import Loading from "@/components/Loading";
import { useGetTrustSafetyQuery } from "@/redux/features/setting/settingAPI";

const TermsAndConditions = () => {
  const { data, isLoading } = useGetTrustSafetyQuery({});

  return (
    <div className='bg-gradient-to-b from-[#2b2055d8] via-[#292244] to-[#000000fc] pt-12 md:pt-24 pb-12 md:pb-56'>
      <div className='container mx-auto'>
        <h2 className='text-2xl md:text-[36px] text-[#E9E9E9] font-bold pt-8 pb-5 border-b border-b-[#B5B5B5]'>
          Trust & Safety
        </h2>

        <div className='mt-4 space-y-10 text-white text-lg md:text-xl'>
          {isLoading && <Loading />}
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
