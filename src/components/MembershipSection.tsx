"use client";

import type React from "react";

import { useState } from "react";
import { Check, Crown, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingPlan {
  id: string;
  name: string;
  icon: React.ReactNode;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  buttonVariant: "default" | "secondary" | "outline";
}

const pricingPlans: PricingPlan[] = [
  {
    id: "entry",
    name: "Entry Membership",
    icon: <Star className='w-6 h-6' />,
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    description: "Perfect for getting started with football AI",
    features: [
      "Subscription Access to The Football AI",
      "1 FREE monthly accumulating ticket into all Major Giveaways",
    ],
    isPopular: false,
    buttonText: "Choose Plan",
    buttonVariant: "secondary",
  },
  {
    id: "premium",
    name: "Premium Membership",
    icon: <Zap className='w-6 h-6' />,
    monthlyPrice: 39.99,
    yearlyPrice: 399.99,
    description: "Most popular choice for serious football enthusiasts",
    features: [
      "Subscription Access to The Football AI",
      "4 FREE Monthly Accumulating Tickets For All Major Giveaways",
      "2 Automatic Tickets for Minor Giveaways",
      "15% off Major Giveaway tickets",
    ],
    isPopular: true,
    buttonText: "Choose Plan",
    buttonVariant: "default",
  },
  {
    id: "vip",
    name: "VIP Membership",
    icon: <Crown className='w-6 h-6' />,
    monthlyPrice: 89.99,
    yearlyPrice: 899.99,
    description: "Ultimate experience for football professionals",
    features: [
      "Subscription Access to The Football AI",
      "10 FREE Monthly Accumulating Tickets For All Major Giveaways",
      "3 Automatic Tickets for Minor Giveaways",
      "40% off Major Giveaway tickets",
    ],
    isPopular: false,
    buttonText: "Upgrade to Pro Plan",
    buttonVariant: "default",
  },
];

export default function MembershipSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getPrice = (plan: PricingPlan) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: PricingPlan) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlySavings = monthlyTotal - plan.yearlyPrice;
    return yearlySavings;
  };

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    console.log(`Selected plan: ${planId} with ${billingCycle} billing`);
    // Here you would typically redirect to checkout or open a payment modal
  };

  return (
    <section id="membership" className='min-h-screen bg-gray-900 py-16 lg:py-24'>
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-gray-800 border-2 transition-all duration-300 hover:scale-105 ${
                plan.isPopular
                  ? "border-purple-500 shadow-2xl shadow-purple-500/20"
                  : selectedPlan === plan.id
                  ? "border-purple-400"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <Badge className='bg-purple-500 text-white px-4 py-1 text-sm font-semibold'>
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className='text-center pb-4'>
                <div className='flex justify-center mb-4'>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      plan.isPopular ? "bg-purple-500" : "bg-gray-700"
                    }`}
                  >
                    <div className='text-white'>{plan.icon}</div>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>
                  {plan.name}
                </h3>
                <div className='mb-4'>
                  <span className='text-4xl font-bold text-white'>
                    {formatPrice(getPrice(plan))}
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
                    Save {formatPrice(getSavings(plan))} per year
                  </div>
                )}
              </CardHeader>

              <CardContent className='pt-0'>
                {/* Features List */}
                <div className='space-y-4 mb-8'>
                  {plan.features.map((feature, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <div className='flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5'>
                        <Check className='w-3 h-3 text-white' />
                      </div>
                      <span className='text-gray-300 text-sm leading-relaxed'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handlePlanSelection(plan.id)}
                  variant={plan.buttonVariant}
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : plan.buttonVariant === "outline"
                      ? "border-gray-600 text-white hover:bg-gray-800"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
