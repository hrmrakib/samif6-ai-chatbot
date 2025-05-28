import { Star, Zap, Crown, Check } from "lucide-react";

export default function PricingTable() {
  return (
    <div className='flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-6xl mx-auto p-6'>
      {/* Entry Membership */}
      <div className='relative flex flex-col border border-gray-800 rounded-lg p-6 bg-black text-white w-full md:w-1/3'>
        <div className='flex flex-col items-center mb-6'>
          <div className='bg-gray-700 rounded-full p-4 mb-4'>
            <Star className='w-6 h-6 text-white' />
          </div>
          <h3 className='text-xl font-bold text-center'>Entry Membership</h3>
          <div className='mt-4 text-center'>
            <span className='text-4xl font-bold'>$29.99</span>
            <span className='text-sm ml-1'>per editor/month</span>
            <p className='text-sm text-gray-400'>billed monthly</p>
          </div>
        </div>

        <div className='flex-grow space-y-4 mb-6'>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>Subscription Access to The Football AI</span>
          </div>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>
              1 FREE monthly accumulating ticket into all Major Giveaways
            </span>
          </div>
        </div>

        <button className='w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition-colors'>
          Choose Plan
        </button>
      </div>

      {/* Premium Membership */}
      <div className='relative flex flex-col border border-purple-600 rounded-lg p-6 bg-black text-white w-full md:w-1/3'>
        <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
          <div className='bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium'>
            Most Popular
          </div>
        </div>

        <div className='flex flex-col items-center mb-6'>
          <div className='bg-purple-600 rounded-full p-4 mb-4'>
            <Zap className='w-6 h-6 text-white' />
          </div>
          <h3 className='text-xl font-bold text-center'>Premium Membership</h3>
          <div className='mt-4 text-center'>
            <span className='text-4xl font-bold'>$39.99</span>
            <span className='text-sm ml-1'>per editor/month</span>
            <p className='text-sm text-gray-400'>billed monthly</p>
          </div>
        </div>

        <div className='flex-grow space-y-4 mb-6'>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>Subscription Access to The Football AI</span>
          </div>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>
              4 FREE Monthly Accumulating Tickets For All Major Giveaways
            </span>
          </div>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>2 Automatic Tickets for Minor Giveaways</span>
          </div>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>15% off Major Giveaway tickets</span>
          </div>
        </div>

        <button className='w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors'>
          Choose Plan
        </button>
      </div>

      {/* VIP Membership */}
      <div className='relative flex flex-col border border-gray-800 rounded-lg p-6 bg-black text-white w-full md:w-1/3'>
        <div className='flex flex-col items-center mb-6'>
          <div className='bg-gray-700 rounded-full p-4 mb-4'>
            <Crown className='w-6 h-6 text-white' />
          </div>
          <h3 className='text-xl font-bold text-center'>VIP Membership</h3>
          <div className='mt-4 text-center'>
            <span className='text-4xl font-bold'>$89.99</span>
            <span className='text-sm ml-1'>per editor/month</span>
            <p className='text-sm text-gray-400'>billed monthly</p>
          </div>
        </div>

        <div className='flex-grow space-y-4 mb-6'>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>Subscription Access to The Football AI</span>
          </div>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>
              10 FREE Monthly Accumulating Tickets For All Major Giveaways
            </span>
          </div>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>3 Automatic Tickets for Minor Giveaways</span>
          </div>
          <div className='flex items-start'>
            <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            <span>40% off Major Giveaway tickets</span>
          </div>
        </div>

        <button className='w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition-colors'>
          Upgrade to Pro Plan
        </button>
      </div>
    </div>
  );
}
