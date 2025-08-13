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
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import { handleLogout } from "@/redux/features/auth/userSlice";
import { useDispatch } from "react-redux";
import { useCancelSubscriptionMutation } from "@/redux/features/subscription/subscriptionAPI";

export default function UserProfileDropdown() {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const router = useRouter();
  const { data: user } = useGetProfileQuery({});
  const dispatch = useDispatch();
  const [cancelSubscriptionMutation] = useCancelSubscriptionMutation({});

  const handleTicketsClick = () => {
    setActiveSection("tickets");
    router.push("/profile/ticket");
  };

  const handleSettingsToggle = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  const handleSettingsItemClick = (item: string) => {
    router.push(`${item}`);
    setIsSettingsExpanded(false);
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Add edit profile logic here
  };

  const handleLogoutMe = () => {
    dispatch(handleLogout());
    router.push("/");
  };

  const handleCancelSubscription = async () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel your subscription?"
    );
    if (!confirm) return;
    else {
      const res = await cancelSubscriptionMutation({});
      console.log(res);
    }
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
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.profile_pic}`}
                    alt={user?.name}
                  />
                  <AvatarFallback className='bg-purple-100 text-purple-600 text-lg font-semibold'>
                    {user?.full_name
                      .split(" ")
                      .map((n: string) => n[0])
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
                  {user?.full_name}
                </h3>
                <p className='text-gray-600 text-sm truncate'>{user?.email}</p>
                {user?.subscribed_plan_status?.plan__name && (
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize bg-purple-100 text-purple-800'>
                      {user?.subscribed_plan_status?.plan__name}
                    </span>

                    {user?.subscribed_plan_status?.plan__name ? (
                      <button
                        onClick={() => handleCancelSubscription()}
                        className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize  bg-red-500 text-white'
                      >
                        Cancel Subscription
                      </button>
                    ) : null}
                  </div>
                )}
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
              onClick={() => handleLogoutMe()}
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
