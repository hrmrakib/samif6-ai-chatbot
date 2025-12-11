"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentData {
  paymentMethod: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  saveCard: boolean;
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: "card",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    saveCard: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
  }>({});

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

  // Format expiration date MM/YY
  const formatExpirationDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
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
    return "unknown";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "cardNumber") {
      const formatted = formatCardNumber(value);
      if (formatted.replace(/\s/g, "").length <= 16) {
        setPaymentData((prev) => ({ ...prev, [name]: formatted }));
      }
    } else if (name === "expirationDate") {
      const formatted = formatExpirationDate(value);
      if (formatted.length <= 5) {
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
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      cardNumber?: string;
      expirationDate?: string;
      cvv?: string;
    } = {};

    // Validate card number
    const cleanCardNumber = paymentData.cardNumber.replace(/\s/g, "");
    if (!cleanCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      newErrors.cardNumber = "Please enter a valid card number";
    } else if (!/^\d+$/.test(cleanCardNumber)) {
      newErrors.cardNumber = "Card number must contain only digits";
    }

    // Validate expiration date
    if (!paymentData.expirationDate) {
      newErrors.expirationDate = "Expiration date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expirationDate)) {
      newErrors.expirationDate = "Please enter a valid date (MM/YY)";
    } else {
      const [month, year] = paymentData.expirationDate.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
        newErrors.expirationDate = "Invalid month";
      } else if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear &&
          Number.parseInt(month) < currentMonth)
      ) {
        newErrors.expirationDate = "Card has expired";
      }
    }

    // Validate CVV
    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (paymentData.cvv.length < 3 || paymentData.cvv.length > 4) {
      newErrors.cvv = "CVV must be 3-4 digits";
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

      // Redirect to success page
      router.push("/payment-success");
    } catch (error) {
      console.error("Payment error:", error);
      setErrors({ cardNumber: "Payment failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const cardType = getCardType(paymentData.cardNumber);

  return (
    <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 space-y-6'>
          {/* Header */}
          <div className='space-y-2'>
            <h1 className='text-[30px] font-bold text-[#231D3C] border-b border-[#5F5F5F] pb-2'>
              Payment
            </h1>
          </div>

          {/* Payment Method */}
          <div className='space-y-3'>
            <label className='block text-xl font-semibold text-[#231D3C]'>
              Pay With:
            </label>
            <div className='flex items-center space-x-2'>
              <input
                type='radio'
                id='card'
                name='paymentMethod'
                value='card'
                checked={paymentData.paymentMethod === "card"}
                onChange={handleInputChange}
                className='w-6 h-6 text-purple-600 border-gray-300 focus:ring-purple-500'
              />
              <label
                htmlFor='card'
                className='text-lg text-gray-700 cursor-pointer'
              >
                Card
              </label>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Card Number */}
            <div className='space-y-2'>
              <label
                htmlFor='cardNumber'
                className='block text-lg font-medium text-[#231D3C]'
              >
                Card Number
              </label>
              <div className='relative'>
                <input
                  id='cardNumber'
                  name='cardNumber'
                  type='text'
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  placeholder='1234 5678 9101 1121'
                  className={`w-full px-4 py-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete='cc-number'
                />
                {/* Card Type Icon */}
                {cardType !== "unknown" && paymentData.cardNumber && (
                  <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                    <div className='w-8 h-5 bg-gray-100 rounded flex items-center justify-center'>
                      <span className='text-xs font-bold text-gray-600 uppercase'>
                        {cardType}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {errors.cardNumber && (
                <p className='text-red-500 text-sm mt-1'>{errors.cardNumber}</p>
              )}
            </div>

            {/* Expiration Date and CVV */}
            <div className='grid grid-cols-2 gap-4'>
              {/* Expiration Date */}
              <div className='space-y-2'>
                <label
                  htmlFor='expirationDate'
                  className='block text-lg font-medium text-[#231D3C]'
                >
                  Expiration Date
                </label>
                <input
                  id='expirationDate'
                  name='expirationDate'
                  type='text'
                  value={paymentData.expirationDate}
                  onChange={handleInputChange}
                  placeholder='MM/YY'
                  className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.expirationDate ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete='cc-exp'
                />
                {errors.expirationDate && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.expirationDate}
                  </p>
                )}
              </div>

              {/* CVV */}
              <div className='space-y-2'>
                <label
                  htmlFor='cvv'
                  className='block text-sm font-medium text-gray-700'
                >
                  CVV
                </label>
                <input
                  id='cvv'
                  name='cvv'
                  type='text'
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder='123'
                  className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete='cc-csc'
                />
                {errors.cvv && (
                  <p className='text-red-500 text-sm mt-1'>{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Save Card Details */}
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='saveCard'
                name='saveCard'
                checked={paymentData.saveCard}
                onChange={handleInputChange}
                className='w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
              />
              <label
                htmlFor='saveCard'
                className='text-lg text-[#231D3C] cursor-pointer'
              >
                Save Card Details
              </label>
            </div>

            {/* Pay Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#8B5CF6] text-white py-3 px-6 rounded-full font-medium hover:bg-[#7348d8] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Pay $39.99"
              )}
            </button>
          </form>

          {/* Privacy Policy */}
          <div className='text-center'>
            <p className='text-xs text-gray-500 leading-relaxed'>
              Your Personal Data Will Be Used To Process Your Order, Support
              Your Experience Throughout This Website & For Other Purposes
              Described In Our{" "}
              <button
                onClick={() => alert("Privacy Policy would be displayed here")}
                className='text-purple-600 hover:text-purple-700 transition-colors duration-200'
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
