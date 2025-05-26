"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import type React from "react";

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make an API call to authenticate
      console.log("Login attempt:", formData);
      alert("Login successful! (This is a demo)");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-6'>
          {/* Header */}
          <div className='text-center'>
            <h1 className='text-4xl font-semibold text-[#231D3C] mb-2'>
              Login
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div className='space-y-2'>
              <label
                htmlFor='email'
                className='block text-xl font-medium text-[#2E264F]'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Enter Your Email...'
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-xl mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <label
                htmlFor='password'
                className='block text-xl font-medium text-[#2E264F]'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Enter Your Password...'
                  className={`w-full px-4 py-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#2E264F] focus:outline-none'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xl mt-1'>{errors.password}</p>
              )}
            </div>

            {/* Remember & Forgot Password */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center space-x-2 cursor-pointer'>
                <input
                  type='checkbox'
                  name='remember'
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className='w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
                />
                <span className='text-xl text-gray-600'>Remember</span>
              </label>
              <Link href='/forget-password' className='text-xl text-gray-600 hover:text-purple-600 transition-colors duration-200'>
                Forget Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#534590] hover:bg-[#6952d1] text-white py-3 px-6 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className='text-center'>
            <p className='text-[#5F5F5F] text-lg'>
              {"Don't Have Account? "}
              <Link
                href='/signup'
                className='text-[#534590] hover:text-[#6452b6] font-medium transition-colors duration-200'
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
