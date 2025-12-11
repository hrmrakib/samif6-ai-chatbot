/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ChatbotSection from "@/components/ChatbotSection";
import ContactSection from "@/components/ContactSection";
import FootballAiCoach from "@/components/FootballAiCoach";
import FootballRewardSection from "@/components/FootballRewardSection";
import HeroSection from "@/components/Hero";
import HowItWorksSection from "@/components/HowItsWork";
import MembershipSection from "@/components/MembershipSection";
import { setCurrentUser } from "@/redux/features/auth/userSlice";
// import ProductsSection from "@/components/ProductSection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("samif6_user");
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user)));
    }
  }, []);

  return (
    <div>
      <HeroSection />

      <div className='bg-gradient-to-b from-[#51438c] via-[#292244] to-[#000000fc] pt-12 md:pt-24 pb-12 md:pb-56'>
        <FootballAiCoach />
        <ChatbotSection />
      </div>

      <FootballRewardSection />
      <HowItWorksSection />
      <MembershipSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
