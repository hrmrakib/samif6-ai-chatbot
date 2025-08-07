import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  return (
    <div className='min-h-screen bg-black  flex items-center justify-center px-4'>
      <div className='text-center max-w-xl'>
        <div className='flex justify-center mb-6'>
          <CheckCircle className='w-20 h-20 text-green-500' />
        </div>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-100 mb-4'>
          Payment Successful!
        </h1>
        <p className='text-lg text-gray-400 mb-6'>
          Thank you for upgrading your NexVia plan. Your payment has been
          processed successfully and your account has been upgraded.
        </p>

        <div className='flex justify-center'>
          <Button asChild className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/' className='flex items-center space-x-2'>
              <Home className='w-4 h-4' />
              <span>Go to Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
