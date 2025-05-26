"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "The Football AI", href: "/football-ai" },
  { name: "Exclusive Rewards", href: "/rewards" },
  { name: "Become A Member", href: "/membership" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const router = useRouter();

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password" ||
    pathname === "/forget-password"
  ) {
    return null;
  }

  return (
    <nav className='w-full bg-[#000000]'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between h-[120px]'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <Image src='/logo.svg' alt='Logo' width={140} height={140} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center h-[50px] bg-[#333] px-2 py-3 rounded-full'>
            <div className='flex items-baseline space-x-1'>
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-2 rounded-full text-base font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-white text-[#231D3C]"
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
            <Link
              href='/login'
              className='h-[44px] px-6 border border-[#FFFFFF] text-white hover:bg-gray-800 hover:text-white flex items-center justify-center rounded-full transition-colors duration-200'
            >
              Log In
            </Link>
            <Link
              href='/signup'
              className='h-[44px] px-6 bg-[#534590] hover:bg-purple-700 text-white flex items-center justify-center rounded-full transition-colors duration-200'
            >
              Sign Up
            </Link>
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
                      onClick={() => router.push("/login")}
                    >
                      Log In
                    </Button>
                    <Button
                      className='bg-purple-600 hover:bg-purple-700 text-white w-full'
                      onClick={() => router.push("/signup")}
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
