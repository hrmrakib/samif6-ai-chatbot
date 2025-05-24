"use client";

import type React from "react";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: "", email: "", description: "" });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ description: "Failed to submit form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className='min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center'>
        <div className='text-center'>
          <CheckCircle className='w-20 h-20 text-green-500 mx-auto mb-6' />
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Thank You!
          </h2>
          <p className='text-lg text-gray-300 mb-6'>
            Your message has been sent successfully.
          </p>
          <p className='text-gray-400'>We&apos;ll get back to you soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className='min-h-screen bg-[#000]'>
      <div className='container mx-auto px-4 py-16 lg:py-24'>
        <div className='grid items-center justify-between grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 container mx-auto'>
          {/* Left Side - Football Player Image */}
          <div className='relative order-2 lg:order-1'>
            <div className='relative'>
              <div className='relative z-10 flex justify-center'>
                <Image
                  src='/contact-img.png'
                  alt='Football Player'
                  className='w-full max-w-md h-auto object-contain'
                  width={600}
                  height={600}
                />
              </div>

              <div className='absolute -top-20 left-1/2 transform -translate-x-1/2 z- flex justify-center'>
                <Image
                  src='/contact-shadow.svg'
                  alt='Football Player'
                  className='w-full max-w-[400px] h-auto object-contain'
                  width={300}
                  height={300}
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className='text-center mt-8 lg:hidden'>
              <h3 className='text-2xl font-bold text-white mb-2'>
                Join Our Football Community
              </h3>
              <p className='text-gray-300'>
                Connect with us and become part of the global football vault
                experience.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className='order-1 lg:order-2'>
            <div className='w-full mx-auto lg:mx-0'>
              <div className='hidden lg:block mb-8'>
                <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                  Get In Touch
                </h2>
                <p className='text-gray-300 text-lg'>
                  Ready to join the revolution? Send us a message and let&apos;s
                  start your football journey together.
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Name Field */}
                <div>
                  <Label
                    htmlFor='name'
                    className='text-white text-xl font-medium mb-2 block'
                  >
                    Your Name
                  </Label>
                  <Input
                    id='name'
                    type='text'
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder='Arjun Mazumder'
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <div className='flex items-center gap-1 mt-1 text-red-400 text-sm'>
                      <AlertCircle className='w-4 h-4' />
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label
                    htmlFor='email'
                    className='text-white text-xl font-medium mb-2 block'
                  >
                    Email Address
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder='arjun@example.com'
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className='flex items-center gap-1 mt-1 text-red-400 text-sm'>
                      <AlertCircle className='w-4 h-4' />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <Label
                    htmlFor='description'
                    className='text-white text-xl font-medium mb-2 block'
                  >
                    Write Your Descriptions
                  </Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder='Football Club Is A Professional Organization That Manages A Team...'
                    rows={4}
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 resize-none ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.description && (
                    <div className='flex items-center gap-1 mt-1 text-red-400 text-sm'>
                      <AlertCircle className='w-4 h-4' />
                      {errors.description}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-purple-600 hover:bg-purple-700 text-white py-6 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      Submitting...
                    </div>
                  ) : (
                    <div className='flex items-center gap-3'>
                      Submit
                      <Send className='w-4 h-4' />
                    </div>
                  )}
                </Button>
              </form>

              {/* Additional Info */}
              <div className='mt-8 text-center'>
                <p className='text-gray-400 text-sm'>
                  By submitting this form, you agree to our{" "}
                  <button className='text-purple-400 hover:text-purple-300 underline'>
                    Privacy Policy
                  </button>{" "}
                  and{" "}
                  <button className='text-purple-400 hover:text-purple-300 underline'>
                    Terms of Service
                  </button>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
