"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavbarTransparent from "./NavbarTransparent";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section className='relative h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden'>
      <NavbarTransparent />
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-full'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover'
          autoPlay
          muted
          loop
          playsInline
          poster='/hero-design.png'
        >
          {/* Placeholder video - replace with your actual video URL */}
          <source src='/hero.mp4' type='video/mp4' />
          {/* Fallback for browsers that don't support video */}
          <div className='w-full h-full bg-gradient-to-br from-purple-900 via-black to-purple-800' />
        </video>

        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-[#00000080]' />

        {/* Purple energy overlay effect */}
        <div className='absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent' />
      </div>

      {/* Hero Content */}
      <div className='relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'>
        {/* Main Heading */}
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight'>
          <span className='block'>WORLD&apos;S #1 & ONLY</span>
        </h1>

        {/* Subheading */}
        <div className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed'>
          <p className='mb-2'>
            Access To The{" "}
            <span className='text-white font-semibold underline decoration-purple-400'>
              First AI Football Coach
            </span>{" "}
            PLUS{" "}
            <span className='text-white font-semibold underline decoration-purple-400'>
              Unparalleled Football
            </span>
          </p>
          <p>
            <span className='text-white font-semibold underline decoration-purple-400'>
              Rewards & Experiences
            </span>{" "}
            For True Football Lovers.
          </p>
        </div>

        {/* CTA Button */}
        <div className='flex justify-center'>
          <Link href='#membership'>
            <Button
              size='lg'
              className='bg-[#534590] hover:bg-[#534590] text-white text-lg sm:text-2xl px-8 sm:px-12 py-4 sm:py-6 rounded-full font-normal transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25'
            >
              Unlock The Vault
            </Button>
          </Link>
        </div>
      </div>

      {/* Animated particles effect */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
