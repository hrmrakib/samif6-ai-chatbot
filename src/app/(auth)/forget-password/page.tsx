"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call to send reset OTP
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make an API call to send reset email/OTP
      console.log("Password reset requested for:", email);

      setIsSuccess(true);

      // Redirect to OTP verification page after a short delay
      setTimeout(() => {
        router.push("/verify-otp");
      }, 2000);
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to send reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-6 text-center'>
            {/* Success Icon */}
            <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>

            {/* Success Message */}
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold text-[#231D3C]'>OTP Sent!</h1>
              <p className='text-gray-600 text-sm'>
                We&apos;ve sent a secure one-time passcode to{" "}
                <span className='font-medium text-purple-600'>{email}</span>
              </p>
              <p className='text-gray-500 text-xs'>
                Redirecting to verification page...
              </p>
            </div>

            {/* Loading Animation */}
            <div className='flex justify-center'>
              <div className='w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
      <div className='w-full max-w-xl'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-6'>
          {/* Header */}
          <div className='text-center space-y-3'>
            <h1 className='text-4xl font-semibold text-[#231D3C]'>
              Forgot Password
            </h1>
            <p className='text-[#534590] text-lg leading-relaxed'>
              Enter Your Email And We&apos;ll Send A Secure One-Time Passcode
              (OTP) To Reset Your Password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div className='space-y-2'>
              <label
                htmlFor='email'
                className='block text-lg font-medium text-[#2E264F] mb-1'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={email}
                onChange={handleInputChange}
                placeholder='Enter Your Email...'
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete='email'
              />
              {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
            </div>

            {/* Send OTP Button */}
            <button
              type='submit'
              disabled={isLoading || !email.trim()}
              className='w-full bg-[#534590] text-white py-3 px-6 rounded-full font-medium hover:bg-[#6952d1] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Sending OTP...</span>
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          {/* Navigation Links */}
          <div className='space-y-4'>
            {/* Back to Login */}
            <div className='text-center'>
              <Link
                href='/'
                className='text-base text-[#534590] hover:text-purple-600 transition-colors duration-200 flex items-center justify-center space-x-1'
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                <span>Back to Login</span>
              </Link>
            </div>

            {/* Remember Password */}
            <div className='text-center'>
              <p className='text-[#534590] text-base'>
                Remember your password?{" "}
                <Link
                  href='/'
                  className='text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200'
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
