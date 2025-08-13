"use client";

import type React from "react";

import { useState } from "react";
import { Check, Crown, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useCreateSubscriptionMutation,
  useGetSubscriptionQuery,
} from "@/redux/features/subscription/subscriptionAPI";
import { toast } from "sonner";
import { FadeLoader } from "react-spinners";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";

interface MembershipPlan {
  id: number;
  name: string;
  title: string;
  monthly_price: string;
  yearly_price: string;
  yearly_discount_percent: string;
  free_monthly_tickets: number;
  ticket_discount_percent: string;
  is_popular: boolean;
  features: string[];
}

export default function MembershipSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | number | null>(
    null
  );
  const [loadingPlanId, setLoadingPlanId] = useState<string | number | null>(
    null
  );
  const { data, isLoading } = useGetSubscriptionQuery({});
  const [createSubscriptionMutation] = useCreateSubscriptionMutation();
  const { data: user } = useGetProfileQuery({});
  const handlePlanSelection = async (planName: string | number) => {
    setSelectedPlan(planName);
    setLoadingPlanId(planName);
    try {
      const res = await createSubscriptionMutation({
        name: planName,
        billing_cycle: billingCycle,
      });

      console.log(res?.error);

      if (res?.data?.success) {
        window.location.href = res?.data?.checkout_url;
        return;
      }
      if (res?.error) {
        toast(`✖️ ${res?.error?.data?.message}`);
        setTimeout(() => {
          toast(`✖️ ${res?.error?.data?.detail}`);
        }, 3500);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      alert("Failed to create subscription. Please try again.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <section id='membership' className='min-h-screen bg-[#000] py-16 lg:py-24'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            Become A Member
          </h2>
          <p className='text-lg md:text-xl text-gray-300 mb-8'>
            Select A Package Below & Become A Member Today!
          </p>

          {/* Billing Toggle */}
          <div className='inline-flex bg-gray-800 rounded-full p-1 mb-8'>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              {billingCycle === "yearly" && (
                <Badge className='absolute -top-2 -right-2 bg-green-500 text-white text-xs'>
                  Save 20%
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <FadeLoader
                color={"#cccccc"}
                loading={true}
                speedMultiplier={1.2}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ) : null}

          {data?.data?.map((plan: MembershipPlan) => (
            <Card
              key={plan.id}
              className={`relative bg-transparent border-2 transition-all duration-300 hover:scale-105 flex flex-col ${
                plan.is_popular
                  ? "border-[#534590] shadow-2xl shadow-[#534590]/20"
                  : selectedPlan === plan.id
                  ? "border-purple-400"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              {/* Popular Badge */}
              {plan.is_popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <Badge className='bg-[#534590] text-white px-4 py-1 text-sm font-semibold'>
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className='text-center pb-4'>
                <div className='flex justify-center mb-4'>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      plan?.is_popular ? "bg-[#534590]" : "bg-gray-700"
                    }`}
                  >
                    <div className='text-white'>
                      {plan?.name === "entry" ? (
                        <Star className='w-6 h-6' />
                      ) : null}
                      {plan?.name === "premium" ? (
                        <Zap className='w-6 h-6' />
                      ) : null}
                      {plan?.name === "vip" ? (
                        <Crown className='w-6 h-6' />
                      ) : null}
                    </div>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>
                  {plan?.title}
                </h3>
                <div className='mb-4'>
                  <span className='text-4xl font-bold text-white'>
                    {/* {formatPrice(getPrice(plan?.monthly_price))} */}
                    {billingCycle === "monthly"
                      ? plan?.monthly_price
                      : plan?.yearly_price}
                  </span>
                  <span className='text-gray-400 ml-2'>
                    per editor/{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                  <div className='text-sm text-gray-400 mt-1'>
                    billed {billingCycle}
                  </div>
                </div>
                {billingCycle === "yearly" && (
                  <div className='text-green-400 text-sm font-medium'>
                    {/* Save {formatPrice(getSavings(plan))} per year */}
                  </div>
                )}
              </CardHeader>

              <CardContent className='pt-0 flex flex-col h-full'>
                <div className='flex-grow'>
                  <div className='flex flex-col justify-between space-y-4 mb-8'>
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        // className='flex items-start gap-3 pb-2 border-b border-[#82828385]'
                        className={`flex items-start gap-3 pb-2.5 ${
                          index !== plan.features.length - 1
                            ? "border-b border-gray-700"
                            : ""
                        }`}
                      >
                        <div className='flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5'>
                          <Check className='w-3 h-3 text-white' />
                        </div>
                        <span className='text-gray-300 text-sm leading-relaxed'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handlePlanSelection(plan?.name)}
                  variant={plan?.is_popular === true ? "default" : "secondary"}
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan?.is_popular
                      ? "bg-[#534590] hover:bg-purple-700 text-white"
                      : plan?.is_popular === true
                      ? "border-gray-600 text-white hover:bg-gray-800"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {loadingPlanId === plan?.name ? (
                    <div className='flex items-center space-x-2'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
