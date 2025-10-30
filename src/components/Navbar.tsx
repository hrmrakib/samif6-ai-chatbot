/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/redux/features/auth/userSlice";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "The Football AI", href: "/football-ai" },
  { name: "Exclusive Rewards", href: "/#rewards" },
  { name: "Become A Member", href: "/#membership" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const { data: user } = useGetProfileQuery({});

  useEffect(() => {
    const user = localStorage.getItem("samif6_user");
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user)));
    }
  }, []);

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password" ||
    pathname === "/forget-password" ||
    pathname === "/password-reset-success" ||
    pathname === "/football-ai" ||
    pathname === "/football-ai/?model=auto" ||
    pathname === "/football-ai/ai-coach"
  ) {
    return null;
  }

  console.log(user);
  return (
    <nav className='w-full bg-transparent fixed top-0 z-50'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between h-[60px] md:h-[120px] px-5'>
          {/* Logo */}
          <div className='flex-shrink-0 pt-6 md:pt-0'>
            {pathname !== "/football-ai" && (
              <Link href='/' className='flex items-center'>
                <Image
                  src='/logo2.png'
                  alt='Logo'
                  width={940}
                  height={940}
                  className='w-[130px]'
                />
              </Link>
            )}
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
          {currentUser && user ? (
            <div className='hidden md:flex items-center space-x-4'>
              <Image
                src={
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.profile_pic}` ||
                  "/first.png"
                }
                alt='User Avatar'
                width={40}
                height={40}
                className='w-10 h-10  rounded-full cursor-pointer border-2 border-gray-100'
                onClick={() => router.push("/profile")}
              />
            </div>
          ) : (
            <div className='hidden md:flex items-center space-x-4'>
              <Link
                href='/login'
                className='h-[44px] px-6 border border-[#FFFFFF] text-white hover:bg-gray-800 hover:text-white flex items-center justify-center rounded-full transition-colors duration-200'
              >
                Log In
              </Link>
              <Link
                href='/signup'
                className='h-[44px] px-6 bg-[#534590] hover:bg-[#534590] text-white flex items-center justify-center rounded-full transition-colors duration-200'
              >
                Sign Up
              </Link>
            </div>
          )}

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
                  {user ? (
                    <Link
                      href='/profile'
                      className='flex items-center space-x-4 pl-5 pt-12'
                    >
                      <Image
                        src={
                          `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.profile_pic}` ||
                          "/first.png"
                        }
                        alt='User Avatar'
                        width={48}
                        height={48}
                        className='w-12 h-12  rounded-full cursor-pointer border-2 border-gray-100'
                        onClick={() => router.push("/profile")}
                      />
                      <div className='flex flex-col space-y-1 text-white'>
                        <h2 className='text-xl'>{user?.full_name}</h2>
                        <h3 className='text-sm'>{user?.email}</h3>
                      </div>
                    </Link>
                  ) : (
                    <div className='flex flex-col space-y-6 pt-6 border-t border-gray-800'>
                      <Link
                        href={"/login"}
                        // variant='outline'
                        className='border-gray-600 bg-[#534590] text-white hover:bg-gray-800 hover:text-white w-full'
                        // onClick={() => router.push("/login")}
                      >
                        Log In
                      </Link>
                      <Link
                        href={"/signup"}
                        className='bg-transparent hover:bg-[#534590] border text-white w-full'
                        // onClick={() => router.push("")}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
