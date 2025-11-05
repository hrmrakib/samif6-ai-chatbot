"use client";

import { useEffect, useRef, useState } from "react";
import { Edit, Camera, Mail, User, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileAPI";

export interface UserProfile {
  id?: number;
  full_name: string;
  email: string;
  age?: number;
  club?: string | null;
  playing_level?: string | null;
  location?: string | null;
  mobile_no?: string | null;
  profile_pic?: string | null;
  subscribed_plan_status?: {
    plan__name: string;
  } | null;
}

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    full_name: "",
    age: 0,
    email: "",
    profile_pic: "/profile.jpg",
    mobile_no: "",
    club: "",
    playing_level: "",
    location: "",
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useGetProfileQuery({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfileMutation] = useUpdateProfileMutation();

  console.log(user?.subscribed_plan_status);

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
      const formData = new FormData();

      formData.append("full_name", editedProfile.full_name);
      formData.append("email", editedProfile.email);
      if (selectedFile) {
        formData.append("profile_pic", selectedFile);
      }
      formData.append("mobile_no", editedProfile.mobile_no || "");
      formData.append("age", editedProfile.age?.toString() || "");
      formData.append("club_name", editedProfile.club || "");
      formData.append("playing_level", editedProfile.playing_level || "");
      formData.append("location", editedProfile.location || "");

      const res = await updateProfileMutation(formData).unwrap();
      console.log(res);

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check the file size (in bytes). 2MB = 2 * 1024 * 1024 bytes
      if (file.size > 2 * 1024 * 1024) {
        alert(
          "The file size exceeds the 2MB limit. Please upload a smaller image."
        );
        return; // Stop the upload process
      }

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({
          ...prev,
          profile_pic: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
                        imagePreview ||
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
                    onClick={triggerFileInput}
                    className='absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-colors duration-200 shadow-lg'
                    aria-label='Change profile picture'
                  >
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      onChange={handleAvatarChange}
                      className='hidden'
                      aria-label='Upload profile picture'
                    />
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
                    {profile?.subscribed_plan_status?.plan__name
                      ? profile?.subscribed_plan_status?.plan__name
                      : "Free"}
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

                  {profile?.mobile_no && (
                    <div>
                      <Label className='text-gray-600 text-sm font-medium'>
                        Phone:
                      </Label>
                      <p className='text-gray-700 mt-1'>{profile?.mobile_no}</p>
                    </div>
                  )}

                  {profile?.club && (
                    <div>
                      <Label className='text-gray-600 text-sm font-medium'>
                        Club Name:
                      </Label>
                      <p className='text-gray-700 mt-1'>{profile?.club}</p>
                    </div>
                  )}

                  {profile?.location && (
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
                <div className='space-y-2.5'>
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
                      htmlFor='age'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Age:
                    </Label>
                    <Input
                      type='number'
                      id='age'
                      value={editedProfile?.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className='mt-1'
                      placeholder='Enter your age'
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
                      htmlFor='phone'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Phone:
                    </Label>
                    <Input
                      id='phone'
                      value={editedProfile.mobile_no || ""}
                      onChange={(e) =>
                        handleInputChange("mobile_no", e.target.value)
                      }
                      className='mt-1'
                      placeholder='Enter your phone number'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='club_name'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Club Name:
                    </Label>
                    <Input
                      id='club_name'
                      value={editedProfile.club || ""}
                      onChange={(e) =>
                        handleInputChange("club", e.target.value)
                      }
                      className='mt-1'
                      placeholder='Enter your Club Name'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='playing_level'
                      className='text-gray-600 text-sm font-medium'
                    >
                      Playing Level:
                    </Label>
                    <Input
                      id='playing_level'
                      value={editedProfile?.playing_level || ""}
                      onChange={(e) =>
                        handleInputChange("playing_level", e.target.value)
                      }
                      className='mt-1'
                      placeholder='Enter your Playing Level'
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
