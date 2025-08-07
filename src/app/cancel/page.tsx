"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentCancel() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className='min-h-screen bg-[#000000]  flex items-center justify-center px-4'>
      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-6'>
            <XCircle className='w-20 h-20 text-red-500' />
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-50 mb-4'>
            Payment Cancelled
          </h1>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
            Your payment was cancelled and no charges were made to your account.
            You can try again or contact our support team if you need
            assistance.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            onClick={() => handleBack()}
            asChild
            className='bg-blue-600 hover:bg-blue-700'
          >
            <span>
              <CreditCard />
              Try Payment Again
            </span>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/' className='flex items-center space-x-2'>
              <ArrowLeft className='w-4 h-4' />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/contact' className='flex items-center space-x-2'>
              <HelpCircle className='w-4 h-4' />
              <span>Contact Support</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
