"use client";

import { useState } from "react";
import {
  User,
  Ticket,
  Settings,
  ChevronDown,
  ChevronRight,
  Shield,
  FileText,
  LogOut,
  Edit,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  avatar: string;
  ticketCount: number;
  membershipTier: string;
}

const userData: UserData = {
  name: "Dr. Jane Nicholson",
  email: "Jane20@Gmail.Com",
  avatar: "/profile.jpg",
  ticketCount: 12,
  membershipTier: "Premium",
};

export default function UserProfileDropdown() {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const router = useRouter();

  // const handleProfileClick = () => {
  //   setActiveSection("profile");
  //   console.log("Navigate to profile page");
  // };

  const handleTicketsClick = () => {
    setActiveSection("tickets");
    console.log("Navigate to purchased tickets");
    // Add navigation logic here
  };

  const handleSettingsToggle = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  const handleSettingsItemClick = (item: string) => {
    router.push(`${item}`);
    setIsSettingsExpanded(false);
  };

  const handleLogout = () => {
    console.log("User logging out");
    // Add logout logic here
    // Clear user session, redirect to login, etc.
    router.push("/login");
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Add edit profile logic here
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#000] via-[#1f1a35] to-[#312a50] flex items-center justify-center p-4'>
      <Card className='w-full max-w-sm bg-white shadow-2xl'>
        <CardContent className='py-4 px-4'>
          {/* User Profile Header */}
          <div className='p-6 pb-5'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <Avatar className='w-16 h-16'>
                  <AvatarImage
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name}
                  />
                  <AvatarFallback className='bg-purple-100 text-purple-600 text-lg font-semibold'>
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleEditProfile}
                  className='absolute -bottom-1 -right-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-1.5 transition-colors duration-200'
                  aria-label='Edit profile'
                >
                  <Edit className='w-3 h-3' />
                </button>
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='font-semibold text-gray-900 text-lg truncate'>
                  {userData.name}
                </h3>
                <p className='text-gray-600 text-sm truncate'>
                  {userData.email}
                </p>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>
                    {userData.membershipTier}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Menu Items */}
          <div className='pt-5 p-2 space-y-3'>
            {/* My Profile */}
            <Link
              href='/profile/edit'
              //   onClick={handleProfileClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                activeSection === "profile"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User className='w-5 h-5' />
              <span className='font-medium'>My Profile</span>
            </Link>

            {/* Purchased Tickets */}
            <button
              onClick={handleTicketsClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                activeSection === "tickets"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Ticket className='w-5 h-5' />
              <span className='font-medium'>Purchased Tickets</span>
              {userData.ticketCount > 0 && (
                <span className='ml-auto bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full'>
                  {userData.ticketCount}
                </span>
              )}
            </button>

            {/* Settings with Dropdown */}
            <div>
              <button
                onClick={handleSettingsToggle}
                className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200'
              >
                <Settings className='w-5 h-5' />
                <span className='font-medium'>Settings</span>
                <div className='ml-auto'>
                  {isSettingsExpanded ? (
                    <ChevronDown className='w-4 h-4' />
                  ) : (
                    <ChevronRight className='w-4 h-4' />
                  )}
                </div>
              </button>

              {/* Settings Submenu */}
              {isSettingsExpanded && (
                <div className='ml-8 mt-1 space-y-1'>
                  <button
                    onClick={() => handleSettingsItemClick("privacy-policy")}
                    className='w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors duration-200 text-sm'
                  >
                    <Shield className='w-4 h-4' />
                    Privacy & Policy
                  </button>
                  <button
                    onClick={() => handleSettingsItemClick("trust-safety")}
                    className='w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors duration-200 text-sm'
                  >
                    <Shield className='w-4 h-4' />
                    Trust & Safety
                  </button>
                  <button
                    onClick={() => handleSettingsItemClick("terms-of-service")}
                    className='w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors duration-200 text-sm'
                  >
                    <FileText className='w-4 h-4' />
                    Terms & Conditions
                  </button>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Logout */}
          <div className='p-2'>
            <button
              onClick={handleLogout}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors duration-200'
            >
              <LogOut className='w-5 h-5' />
              <span className='font-medium'>Log Out</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
