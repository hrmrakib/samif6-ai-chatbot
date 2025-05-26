"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect for resend functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character
    setOtp(newOtp);
    setError("");

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedData.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      setError("");

      // Focus on the next empty field or the last field
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success/failure
          if (otpString === "123456") {
            resolve("success");
          } else {
            reject(new Error("Invalid OTP"));
          }
        }, 2000);
      });

      alert("OTP verified successfully! (This is a demo)");
      // Redirect to dashboard or next step
    } catch {
      setError("Invalid OTP. Please try again.");
      // Clear OTP and focus first input
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60); // 60 seconds countdown
    setError("");

    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("OTP resent successfully! (This is a demo)");

      // Clear current OTP
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
      console.log(error);
      setCanResend(true);
      setResendTimer(0);
    }
  };

  return (
    <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-8'>
          {/* Header */}
          <div className='text-center space-y-4'>
            <h1 className='text-4xl font-semibold text-[#231D3C]'>
              Verify With OTP
            </h1>
            <p className='text-[#231D3C] text-base font-medium'>
              Enter The OTP Sent To Your Email
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* OTP Input Fields */}
            <div className='flex justify-center space-x-3'>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    error ? "border-red-500" : "border-gray-300"
                  } ${digit ? "border-purple-500 bg-purple-50" : ""}`}
                  autoComplete='off'
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className='text-center'>
                <p className='text-red-500 text-sm'>{error}</p>
              </div>
            )}

            {/* Verify Button */}
            <button
              type='submit'
              disabled={isLoading || otp.join("").length !== 6}
              className='w-full bg-[#534590] text-white py-3 px-6 rounded-full font-medium hover:bg-[#7257e9] focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all duration-200 disabled:opacity-90 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify"
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className='text-center'>
            <p className='text-[#574a8b] text-base font-medium'>
              {"Don't Receive The OTP? "}
              {canResend ? (
                <button
                  onClick={handleResend}
                  className='text-[#5c3fce] hover:text-[#231D3C] font-medium transition-colors duration-200'
                >
                  Resend
                </button>
              ) : (
                <span className='text-gray-400'>Resend in {resendTimer}s</span>
              )}
            </p>
          </div>

          {/* Back to Login */}
          <div className='text-center'>
            <Link
              href='/'
              className='text-base text-[#231D3C] hover:text-[#5c3fce] transition-colors duration-200'
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
