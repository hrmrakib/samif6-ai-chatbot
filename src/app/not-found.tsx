"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-4'>
      <div className='text-center'>
        <div className='mb-8'>
          <h1 className='text-9xl font-bold text-white mb-4'>404</h1>
          <div className='w-24 h-1 bg-white mx-auto mb-8'></div>
        </div>

        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
          Page Not Found
        </h2>

        <p className='text-gray-400 text-lg mb-8 max-w-md mx-auto'>
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200'
          >
            <Home className='w-5 h-5 mr-2' />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className='inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors duration-200'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            Go Back
          </button>
        </div>

        <div className='mt-12'>
          <div className='flex justify-center space-x-2'>
            <div className='w-2 h-2 bg-white rounded-full animate-bounce'></div>
            <div
              className='w-2 h-2 bg-white rounded-full animate-bounce'
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className='w-2 h-2 bg-white rounded-full animate-bounce'
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
