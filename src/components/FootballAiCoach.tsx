import React from "react";

const FootballAiCoach = () => {
  return (
    <div className='bg-transparent flex flex-col items-center justify-center mb-16'>
      <h2 className='text-3xl md:text-[56px] text-center font-semibold text-[#FFFFFF] px-6'>
        The World&apos;s Only Football AI Coach!
      </h2>
      <p className='text-[20px] text-[#FFFFFF] max-w-2xl text-center mt-4 px-6'>
        Designed specifically for youth footballers and powered by elite-level
        data. &apos;The Football AI&apos; delivers instant, reliable guidance on
        training, nutrition, injury management, mindset, and more — giving
        players the support of a Coach, Physio and Mentor anytime they need it.
      </p>

      <button className='bg-[#534590] hover:bg-[#5840c5] text-white shadow-xl rounded-full py-2.5 px-6 mt-6'>
        Unlock The Vault
      </button>
    </div>
  );
};

export default FootballAiCoach;
