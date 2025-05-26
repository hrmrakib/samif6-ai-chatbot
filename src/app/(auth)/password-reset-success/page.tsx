"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PasswordResetSuccessPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const handleContinue = () => {
    router.push("/");
  };

  return (
    <div className='min-h-screen bg-[#000000] flex items-center justify-center p-4 overflow-hidden'>
      <div className='w-full max-w-md text-center space-y-8'>
        {/* Animated Success Icon */}
        <div className='relative flex justify-center'>
          {/* Main Success Circle */}
          <div
            className={`relative w-32 h-32 bg-[#534590] rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            {/* Checkmark Icon */}
            <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center'>
              <svg
                className={`w-8 h-8 text-purple-600 transform transition-all duration-700 delay-500 ${
                  isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={3}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>

            {/* Floating Dots */}
            {/* {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`absolute w-3 h-3 bg-purple-400 rounded-full animate-float-${
                  index + 1
                } ${isVisible ? "opacity-70" : "opacity-0"}`}
                style={{
                  top: `${20 + Math.sin((index * Math.PI) / 4) * 60}px`,
                  left: `${20 + Math.cos((index * Math.PI) / 4) * 60}px`,
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: `${3 + (index % 3)}s`,
                }}
              />
            ))} */}

            {/* Pulse Ring */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-purple-300 animate-ping ${
                isVisible ? "opacity-30" : "opacity-0"
              }`}
              style={{ animationDuration: "1.5s" }}
            />
          </div>
        </div>

        {/* Success Message */}
        <div
          className={`space-y-4 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
            Successfully Reset Your Password
          </h1>
          <p className='text-gray-300 text-lg'>
            Your Password Has Been Changed Successfully.
          </p>
        </div>

        {/* Continue Button */}
        <div
          className={`transform transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={handleContinue}
            className='w-full max-w-sm bg-[#534590] text-white py-4 px-8 rounded-full font-medium text-lg hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl'
          >
            Continue
          </button>
        </div>

        {/* Decorative Elements */}
        <div className='absolute inset-0 pointer-events-none'>
          {/* Background Floating Particles */}
          {[...Array(12)].map((_, index) => (
            <div
              key={`particle-${index}`}
              className={`absolute w-1 h-1 bg-purple-400 rounded-full animate-float-slow ${
                isVisible ? "opacity-40" : "opacity-0"
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
