"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "The Football AI", href: "/football-ai" },
  { name: "Exclusive Rewards", href: "/rewards" },
  { name: "Become A Member", href: "/membership" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-gray-900 border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <div className='text-white font-bold text-xl'>
                <span className='text-2xl'>🏈</span>
                <span className='ml-2'>Rebel Football Vault</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-1'>
              {navigationLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    index === 0
                      ? "bg-white text-gray-900"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className='hidden md:flex items-center space-x-4'>
            <Button
              variant='outline'
              className='border-gray-600 text-white hover:bg-gray-800 hover:text-white'
            >
              Log In
            </Button>
            <Button className='bg-purple-600 hover:bg-purple-700 text-white'>
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-gray-300 hover:text-white hover:bg-gray-800'
                >
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='bg-gray-900 border-gray-800'
              >
                <div className='flex flex-col space-y-4 mt-8'>
                  {/* Mobile Navigation Links */}
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        index === 0
                          ? "bg-white text-gray-900"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Mobile Action Buttons */}
                  <div className='flex flex-col space-y-3 pt-6 border-t border-gray-800'>
                    <Button
                      variant='outline'
                      className='border-gray-600 text-white hover:bg-gray-800 hover:text-white w-full'
                      onClick={() => setIsOpen(false)}
                    >
                      Log In
                    </Button>
                    <Button
                      className='bg-purple-600 hover:bg-purple-700 text-white w-full'
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
