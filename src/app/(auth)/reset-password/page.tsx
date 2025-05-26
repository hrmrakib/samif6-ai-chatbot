"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    const strengthLevels = [
      { score: 0, label: "Very Weak", color: "bg-red-500" },
      { score: 1, label: "Weak", color: "bg-red-400" },
      { score: 2, label: "Fair", color: "bg-yellow-500" },
      { score: 3, label: "Good", color: "bg-yellow-400" },
      { score: 4, label: "Strong", color: "bg-green-500" },
      { score: 5, label: "Very Strong", color: "bg-green-600" },
      { score: 6, label: "Excellent", color: "bg-green-700" },
    ];

    return strengthLevels[Math.min(score, 6)];
  };

  const passwordStrength = calculatePasswordStrength(formData.newPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const togglePasswordVisibility = (
    field: "newPassword" | "confirmPassword"
  ) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    // Validate new password
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make an API call to update the password
      console.log("Password reset for:", formData.newPassword);

      setIsSuccess(true);

      // Redirect to login page after success
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({ newPassword: "Failed to reset password. Please try again." });
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
              <h1 className='text-2xl font-bold text-[#231D3C]'>
                Password Reset Successfully!
              </h1>
              <p className='text-gray-600 text-xl'>
                Your password has been updated. You can now log in with your new
                password.
              </p>
              <p className='text-gray-500 text-xs'>
                Redirecting to login page...
              </p>
            </div>

            {/* Loading Animation */}
            <div className='flex justify-center'>
              <div className='w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
            </div>

            {/* Manual Login Link */}
            <Link
              href='/'
              className='inline-block text-purple-600 hover:text-purple-700 transition-colors duration-200'
            >
              Go to Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-6'>
          {/* Header */}
          <div className='text-center space-y-2'>
            <h1 className='text-4xl font-semibold text-[#231D3C]'>
              Reset Password
            </h1>
            <p className='text-[#534590] text-lg'>
              Create Your New Password For Your Account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* New Password Field */}
            <div className='space-y-2'>
              <label
                htmlFor='newPassword'
                className='block text-xl text-[#231D3C]'
              >
                New Password
              </label>
              <div className='relative'>
                <input
                  id='newPassword'
                  name='newPassword'
                  type={showPasswords.newPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder='Enter New Password...'
                  className={`w-full px-4 py-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                >
                  {showPasswords.newPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <div className='flex-1 bg-gray-200 rounded-full h-2'>
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.score / 6) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className='text-xs text-gray-600'>
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}

              {errors.newPassword && (
                <p className='text-red-500 text-xl mt-1'>
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className='space-y-2'>
              <label
                htmlFor='confirmPassword'
                className='block text-xl text-gray-700'
              >
                Re-Enter New Password
              </label>
              <div className='relative'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder='Enter New Password...'
                  className={`w-full px-4 py-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } ${
                    formData.confirmPassword &&
                    formData.newPassword === formData.confirmPassword
                      ? "border-green-500 bg-green-50"
                      : ""
                  }`}
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                >
                  {showPasswords.confirmPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className='flex items-center space-x-1'>
                  {formData.newPassword === formData.confirmPassword ? (
                    <>
                      <svg
                        className='w-4 h-4 text-green-600'
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
                      <span className='text-green-600 text-xs'>
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className='w-4 h-4 text-red-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                      <span className='text-red-500 text-xs'>
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}

              {errors.confirmPassword && (
                <p className='text-red-500 text-xl mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Reset Password Button */}
            <button
              type='submit'
              disabled={
                isLoading || !formData.newPassword || !formData.confirmPassword
              }
              className='w-full bg-[#534590] text-white py-3 px-6 rounded-full hover:bg-[#504194] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200  disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Resetting Password...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Navigation Links */}
          <div className='text-center space-y-2'>
            <Link
              href='/'
              className='text-xl text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center justify-center space-x-1'
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
        </div>
      </div>
    </div>
  );
}
