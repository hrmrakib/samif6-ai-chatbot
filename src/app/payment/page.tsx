"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentData {
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface FormErrors {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const paymentMethods = [
    { value: "credit-card", label: "Credit Card", icon: "💳" },
    { value: "mastercard", label: "Mastercard", icon: "🔴" },
    { value: "visa", label: "Visa", icon: "🔵" },
    { value: "amex", label: "American Express", icon: "🟢" },
  ];

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Format expiry date MM / YY / YY (unusual format as shown in image)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 6) {
      return `${v.substring(0, 2)} / ${v.substring(2, 4)} / ${v.substring(
        4,
        6
      )}`;
    } else if (v.length >= 4) {
      return `${v.substring(0, 2)} / ${v.substring(2, 4)} / ${v.substring(4)}`;
    } else if (v.length >= 2) {
      return `${v.substring(0, 2)} / ${v.substring(2)}`;
    }
    return v;
  };

  // Detect card type
  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (/^4/.test(cleanNumber)) return "visa";
    if (/^5[1-5]/.test(cleanNumber)) return "mastercard";
    if (/^3[47]/.test(cleanNumber)) return "amex";
    if (/^6/.test(cleanNumber)) return "discover";
    return "credit-card";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formatted = formatCardNumber(value);
      if (formatted.replace(/\s/g, "").length <= 16) {
        setPaymentData((prev) => ({ ...prev, [name]: formatted }));
        // Auto-detect card type
        const cardType = getCardType(formatted);
        setPaymentData((prev) => ({ ...prev, paymentMethod: cardType }));
      }
    } else if (name === "expiryDate") {
      const formatted = formatExpiryDate(value);
      if (formatted.length <= 10) {
        setPaymentData((prev) => ({ ...prev, [name]: formatted }));
      }
    } else if (name === "cvv") {
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length <= 4) {
        setPaymentData((prev) => ({ ...prev, [name]: cleanValue }));
      }
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Card number validation
    const cleanCardNumber = paymentData.cardNumber.replace(/\s/g, "");
    if (!cleanCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      newErrors.cardNumber = "Please enter a valid card number";
    } else if (!/^\d+$/.test(cleanCardNumber)) {
      newErrors.cardNumber = "Card number must contain only digits";
    }

    // Expiry date validation
    if (!paymentData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2} \/ \d{2} \/ \d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date";
    }

    // CVV validation
    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (paymentData.cvv.length < 3 || paymentData.cvv.length > 4) {
      newErrors.cvv = "CVV must be 3-4 digits";
    }

    // Cardholder name validation
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    } else if (paymentData.cardholderName.trim().length < 2) {
      newErrors.cardholderName = "Please enter a valid name";
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
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Here you would typically integrate with a payment processor like Stripe
      console.log("Payment processed:", paymentData);

      // Redirect to success page
      router.push("/payment-success");
    } catch (error) {
      console.error("Payment error:", error);
      setErrors({ cardNumber: "Payment failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.value === paymentData.paymentMethod
  );

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-lg'>
        <div className='space-y-8'>
          {/* Header */}
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-white'>Payment</h1>
          </div>

          {/* Payment Form */}
          <div className='bg-gray-800 rounded-2xl px-16 py-20 space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Payment Method Selector */}
              <div className='space-y-2'>
                <div className='relative'>
                  <select
                    name='paymentMethod'
                    value={paymentData.paymentMethod}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none'
                  >
                    {paymentMethods.map((method) => (
                      <option
                        key={method.value}
                        value={method.value}
                        className='bg-gray-700 text-white'
                      >
                        {method.label}
                      </option>
                    ))}
                  </select>
                  <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-lg'>
                        {selectedPaymentMethod?.icon}
                      </span>
                      <svg
                        className='w-4 h-4 text-gray-400'
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
                </div>
              </div>

              {/* Card Number */}
              <div className='space-y-1'>
                <input
                  type='text'
                  name='cardNumber'
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  placeholder='988 999 888 777 6666'
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.cardNumber ? "border-red-500" : "border-gray-600"
                  }`}
                  autoComplete='cc-number'
                />
                {errors.cardNumber && (
                  <p className='text-red-400 text-xs mt-1'>
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry Date and CVV */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <input
                    type='text'
                    name='expiryDate'
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    placeholder='04 / 90 / 29'
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.expiryDate ? "border-red-500" : "border-gray-600"
                    }`}
                    autoComplete='cc-exp'
                  />
                  {errors.expiryDate && (
                    <p className='text-red-400 text-xs mt-1'>
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div className='space-y-1'>
                  <input
                    type='text'
                    name='cvv'
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    placeholder='909876'
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.cvv ? "border-red-500" : "border-gray-600"
                    }`}
                    autoComplete='cc-csc'
                  />
                  {errors.cvv && (
                    <p className='text-red-400 text-xs mt-1'>{errors.cvv}</p>
                  )}
                </div>
              </div>

              {/* Cardholder Name */}
              <div className='space-y-1'>
                <input
                  type='text'
                  name='cardholderName'
                  value={paymentData.cardholderName}
                  onChange={handleInputChange}
                  placeholder='Jhon Abrahim'
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.cardholderName ? "border-red-500" : "border-gray-600"
                  }`}
                  autoComplete='cc-name'
                />
                {errors.cardholderName && (
                  <p className='text-red-400 text-xs mt-1'>
                    {errors.cardholderName}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Pay Now Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className='w-full bg-[#534590] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#634dc5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              "Pay Now"
            )}
          </button>

          {/* Security Notice */}
          <div className='text-center'>
            <p className='text-xs text-gray-400 leading-relaxed'>
              🔒 Your payment information is encrypted and secure. We never
              store your card details.
            </p>
          </div>

          {/* Back to Checkout */}
          <div className='text-center'>
            <button
              onClick={() => router.push("/checkout")}
              className='text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center justify-center space-x-1 mx-auto'
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
              <span>Back to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
