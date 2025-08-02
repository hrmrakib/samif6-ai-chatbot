import ChatbotSection from "@/components/ChatbotSection";
import ContactSection from "@/components/ContactSection";
import FootballAiCoach from "@/components/FootballAiCoach";
import FootballRewardSection from "@/components/FootballRewardSection";
import HeroSection from "@/components/Hero";
import HowItWorksSection from "@/components/HowItsWork";
import MembershipSection from "@/components/MembershipSection";
// import ProductsSection from "@/components/ProductSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <div className='bg-gradient-to-b from-[#51438c] via-[#292244] to-[#000000fc] pt-12 md:pt-24 pb-12 md:pb-56'>
        <FootballAiCoach />
        <ChatbotSection />
      </div>

      <FootballRewardSection />
      <HowItWorksSection />
      {/* <ProductsSection /> */}
      <MembershipSection />
      <ContactSection  />
    </div>
  );
};

export default HomePage;
