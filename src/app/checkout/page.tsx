"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  stateRegion: string;
  address: string;
  city: string;
  postalCode: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  stateRegion?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    stateRegion: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const countries = [
    { value: "", label: "Select Country" },
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "IN", label: "India" },
    { value: "BR", label: "Brazil" },
    { value: "MX", label: "Mexico" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-$$$$]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    // State/Region validation
    if (!formData.stateRegion.trim()) {
      newErrors.stateRegion = "State/Region is required";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Please enter a complete address";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Postal code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^[A-Za-z0-9\s-]{3,10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid postal code";
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
      // Simulate API call to save checkout information
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to payment page
      router.push("/payment");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process checkout information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        <div className='bg-[#404040] rounded-2xl shadow-2xl p-8 space-y-8'>
          {/* Header */}
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-white tracking-wider'>
              CHECKOUT
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Information Section */}
            <div className='space-y-6'>
              <h2 className='text-sm font-medium text-[#EEECF4] tracking-wider'>
                INFORMATION
              </h2>

              {/* Contact Info */}
              <div className='space-y-4'>
                <h3 className='text-xs font-medium text-[#EEECF4] tracking-wider'>
                  CONTACT INFO
                </h3>

                {/* Email */}
                <div className='space-y-1'>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='Email'
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-600 focus:border-purple-500"
                    }`}
                  />
                  {errors.email && (
                    <p className='text-red-400 text-xs mt-1'>{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className='space-y-1'>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder='Phone'
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-600 focus:border-purple-500"
                    }`}
                  />
                  {errors.phone && (
                    <p className='text-red-400 text-xs mt-1'>{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className='space-y-4'>
                <h3 className='text-xs font-medium text-[#EEECF4] tracking-wider'>
                  SHIPPING ADDRESS
                </h3>

                {/* First Name & Last Name */}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder='First Name'
                      className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                        errors.firstName
                          ? "border-red-500"
                          : "border-gray-600 focus:border-purple-500"
                      }`}
                    />
                    {errors.firstName && (
                      <p className='text-red-400 text-xs mt-1'>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className='space-y-1'>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder='Last Name'
                      className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                        errors.lastName
                          ? "border-red-500"
                          : "border-gray-600 focus:border-purple-500"
                      }`}
                    />
                    {errors.lastName && (
                      <p className='text-red-400 text-xs mt-1'>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div className='space-y-1'>
                  <div className='relative'>
                    <select
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 appearance-none ${
                        errors.country
                          ? "border-red-500"
                          : "border-gray-600 focus:border-purple-500"
                      } ${!formData.country ? "text-[#EEECF4]" : "text-white"}`}
                    >
                      {countries.map((country) => (
                        <option
                          key={country.value}
                          value={country.value}
                          className='bg-gray-800 text-white'
                        >
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                      <svg
                        className='w-4 h-4 text-[#EEECF4]'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.country && (
                    <p className='text-red-400 text-xs mt-1'>
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* State/Region */}
                <div className='space-y-1'>
                  <input
                    type='text'
                    name='stateRegion'
                    value={formData.stateRegion}
                    onChange={handleInputChange}
                    placeholder='State / Region'
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                      errors.stateRegion
                        ? "border-red-500"
                        : "border-gray-600 focus:border-purple-500"
                    }`}
                  />
                  {errors.stateRegion && (
                    <p className='text-red-400 text-xs mt-1'>
                      {errors.stateRegion}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className='space-y-1'>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder='Address'
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                      errors.address
                        ? "border-red-500"
                        : "border-gray-600 focus:border-purple-500"
                    }`}
                  />
                  {errors.address && (
                    <p className='text-red-400 text-xs mt-1'>
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City & Postal Code */}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder='City'
                      className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                        errors.city
                          ? "border-red-500"
                          : "border-gray-600 focus:border-purple-500"
                      }`}
                    />
                    {errors.city && (
                      <p className='text-red-400 text-xs mt-1'>{errors.city}</p>
                    )}
                  </div>
                  <div className='space-y-1'>
                    <input
                      type='text'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder='Postal Code'
                      className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-[#EEECF4] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                        errors.postalCode
                          ? "border-red-500"
                          : "border-gray-600 focus:border-purple-500"
                      }`}
                    />
                    {errors.postalCode && (
                      <p className='text-red-400 text-xs mt-1'>
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#534590] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#5c47bb] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Get Payment"
              )}
            </button>
          </form>

          {/* Back to Cart */}
          <div className='text-center'>
            <button
              onClick={() => router.push("/cart")}
              className='text-[#EEECF4] hover:text-white transition-colors duration-200 text-sm flex items-center justify-center space-x-1'
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
              <span>Back to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
