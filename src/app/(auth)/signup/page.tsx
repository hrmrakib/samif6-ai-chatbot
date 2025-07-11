"use client";

import type React from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useSignupMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [signupMutation] = useSignupMutation();
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file); // <-- actual file
      setProfilePreview(URL.createObjectURL(file)); // <-- preview
    }
  };

  const handleImageClick = () => {
    // Trigger file input click when avatar is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 8 characters";
    }
    // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    //   newErrors.password =
    //     "Password must contain uppercase, lowercase, and number";
    // }

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
      const formDataToSend = new FormData();

      formDataToSend.append("full_name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      
      if (profileImage) {
        formDataToSend.append("profile_pic", profileImage);
      }

      const data = formDataToSend;

      const res = await signupMutation(data).unwrap();

      if (res?.access_token) {
        toast.success(res?.message);
        localStorage.setItem("access_token", res?.access_token);
        localStorage.setItem("samif6_user_email", formData?.email);
        // await saveToken(res?.access_token);
        router.push("/verify-otp");
      }

      console.log({ res });
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
      <div className='w-full max-w-lg'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-6'>
          {/* Header */}
          <div className='text-center'>
            <h1 className='text-4xl font-semibold text-[#231D3C] mb-2'>
              Sign Up
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='relative mb-6 flex flex-col items-center'>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleImageChange}
                accept='image/*'
                className='hidden'
                aria-label='Upload profile picture'
              />

              <div
                onClick={handleImageClick}
                className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden group'
              >
                {profileImage ? (
                  <Image
                    src={profilePreview || "/placeholder.svg"}
                    alt='Profile Preview'
                    fill
                    className='object-cover'
                  />
                ) : (
                  <svg
                    className='w-12 h-12 text-gray-500 group-hover:opacity-80 transition-opacity'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                  </svg>
                )}

                {/* Camera icon overlay on hover */}
                <div className='absolute inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Camera className='w-8 h-8 text-white' />
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className='space-y-2'>
              <label
                htmlFor='name'
                className='block text-xl font-medium text-[#2E264F]'
              >
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Full Name...'
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
              )}
            </div>

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
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
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
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
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
                  className='w-4 h-4 text-[#231D3C] border-gray-300 rounded focus:ring-purple-500'
                />
                <span className='text-base text-[#2E264F]'>Remember</span>
              </label>
              <Link
                href='/forget-password'
                className='text-base text-[#2E264F] hover:text-[#231D3C] transition-colors duration-200'
              >
                Forget Password?
              </Link>
            </div>

            {/* Sign Up Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#534590] text-white py-3 px-6 rounded-full font-medium hover:bg-[#6b55cc] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className='text-center'>
            <p className='text-[#2E264F]'>
              Already Have An Account?{" "}
              <Link
                href='/login'
                className='text-[#231D3C] hover:text-purple-700 font-medium transition-colors duration-200'
              >
                Log In Now
              </Link>
            </p>
          </div>

          {/* Terms of Service */}
          <div className='text-center'>
            <p className='text-sm text-gray-500 leading-relaxed'>
              By Continuing You Agree With Our{" "}
              <button
                onClick={() =>
                  alert("Terms of Service would be displayed here")
                }
                className='text-[#231D3C] hover:text-purple-700 transition-colors duration-200'
              >
                Terms Of Service
              </button>{" "}
              And Confirm That You Have Read Our{" "}
              <button
                onClick={() => alert("Privacy Policy would be displayed here")}
                className='text-[#231D3C] hover:text-purple-700 transition-colors duration-200'
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
