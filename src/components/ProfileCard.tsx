"use client";

import { useEffect, useState } from "react";
import { Edit, Camera, Mail, User, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";

interface UserProfile {
  full_name: string;
  email: string;
  profile_pic?: string;
  bio?: string;
  phone?: string;
  location?: string;
}

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    full_name: "",
    email: "",
    profile_pic: "/profile.jpg",
    bio: "",
    phone: "",
    location: "",
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useGetProfileQuery({});

  useEffect(() => {
    if (user) {
      setProfile(user);
      setEditedProfile(user);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setProfile(editedProfile);
      setIsEditing(false);
      console.log("Profile updated:", editedProfile);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = () => {
    console.log("Avatar change clicked");
    // Implement file upload logic here
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center p-4'>
      <Card className='w-full max-w-2xl bg-white shadow-2xl'>
        <CardContent className='p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            {/* Profile Image Section */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='relative'>
                <div className='w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-400 to-blue-500 p-1'>
                  <div className='w-full h-full rounded-xl overflow-hidden'>
                    <Image
                      src={
                        `${process.env.NEXT_PUBLIC_IMAGE_URL}${profile?.profile_pic}` ||
                        "/placeholder.svg"
                      }
                      alt={profile?.full_name}
                      className='w-full h-full object-cover'
                      width={224}
                      height={224}
                    />
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={handleAvatarChange}
                    className='absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-colors duration-200 shadow-lg'
                    aria-label='Change profile picture'
                  >
                    <Camera className='w-5 h-5' />
                  </button>
                )}
              </div>

              {!isEditing && (
                <div className='text-center'>
                  <div className='flex items-center justify-center gap-2 text-gray-600 mb-2'>
                    <User className='w-4 h-4' />
                    <span className='text-sm'>Member since 2024</span>
                  </div>
                  <div className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>
                    Premium Member
                  </div>
                </div>
              )}
            </div>

            {/* Profile Information Section */}
            <div className='space-y-6'>
              {!isEditing ? (
                // View Mode
                <div className='space-y-4'>
                  <div>
                    <Label className='text-gray-600 text-sm font-medium'>
                      Name:
                    </Label>
                    <p className='text-gray-900 text-xl font-semibold mt-1'>
                      {profile?.full_name}
                    </p>
                  </div>

                  <div>
                    <Label className='text-gray-600 text-sm font-medium'>
                      Email:
                    </Label>
                    <div className='flex items-center gap-2 mt-1'>
                      <Mail className='w-4 h-4 text-gray-500' />
                      <p className='text-gray-700'>{profile?.email}</p>
                    </div>
                  </div>

                  {profile.bio && (
                    <div>
                      <Label className='text-gray-600 text-sm font-medium'>
                        Bio:
                      </Label>
                      <p className='text-gray-700 mt-1'>{profile?.bio}</p>
                    </div>
                  )}

                  {profile.phone && (
                    <div>
                      <Label className='text-gray-600 text-sm font-medium'>
                        Phone:
                      </Label>
                      <p className='text-gray-700 mt-1'>{profile?.phone}</p>
                    </div>
                  )}

                  {profile.location && (
                    <div>
                      <Label className='text-gray-600 text-sm font-medium'>
                        Location:
                      </Label>
                      <p className='text-gray-700 mt-1'>{profile?.location}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleEditClick}
                    className='w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold transition-all duration-300'
                  >
                    <Edit className='w-4 h-4 mr-2' />
                    Edit Profile
                  </Button>
                </div>
              ) : (
                // Edit Mode
                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='name'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Name:
                    </Label>
                    <Input
                      id='name'
                      value={editedProfile?.full_name}
                      onChange={(e) =>
                        handleInputChange("full_name", e.target.value)
                      }
                      className='mt-1'
                      placeholder='Enter your name'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='email'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Email:
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      value={editedProfile.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className='mt-1'
                      placeholder='Enter your email'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='bio'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Bio:
                    </Label>
                    <Input
                      id='bio'
                      value={editedProfile.bio || ""}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className='mt-1'
                      placeholder='Tell us about yourself'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='phone'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Phone:
                    </Label>
                    <Input
                      id='phone'
                      value={editedProfile.phone || ""}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className='mt-1'
                      placeholder='Enter your phone number'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='location'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Location:
                    </Label>
                    <Input
                      id='location'
                      value={editedProfile.location || ""}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className='mt-1'
                      placeholder='Enter your location'
                    />
                  </div>

                  <div className='flex gap-3 pt-2'>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className='flex-1 bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition-all duration-300'
                    >
                      {isLoading ? (
                        <div className='flex items-center gap-2'>
                          <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                          Saving...
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <Save className='w-4 h-4' />
                          Save Changes
                        </div>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                      variant='outline'
                      className='flex-1 py-3 font-semibold'
                    >
                      <X className='w-4 h-4 mr-2' />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
