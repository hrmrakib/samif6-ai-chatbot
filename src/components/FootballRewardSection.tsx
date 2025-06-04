"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FootballRewardSection() {
  const handleUnlockVault = () => {
    console.log("Unlock The Vault clicked!");
    // Add your unlock functionality here
    // Could redirect to signup, open modal, etc.
  };

  return (
    <section
      id='rewards'
      className='min-h-screen bg-[url("/how-bg.jpg")] bg-no-repeat bg-cover bg-center relative bg-fixed'
    >
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        <div
          className='w-full h-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: "url('/rewards-simple.png')",
          }}
        />
        <div className='absolute inset-0 bg-black/60' />
      </div>

      <div className='relative z-10 container mx-auto px-4 py-16 lg:py-24'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight max-w-5xl mx-auto'>
            Win Life-Changing Football Rewards, Prizes & Experiences!
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4'>
            Members Receive Exclusive Entry &apos;tickets&apos; Into Monthly
            Giveaways — With Prizes Like International Matchday Tickets, Signed
            Gear, Memorabilia, And More. Your Tickets Stack Every Month, So The
            Longer You Stay, The More Entries You&apos;ll Have In Every Prize
            Draw!
          </p>
        </div>

        {/* Tickets Display */}
        <div className='flex flex-col items-center gap-8 mb-16'>
          <Link href='/ticket' className='w-full max-w-lg'>
            <div className='bg-gradient-to-r from-purple-600 to-blue-600 opacity-90 rounded-lg p-6 text-white shadow-2xl relative'>
              <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                  <h3 className='font-bold text-lg sm:text-xl mb-1'>
                    World Cup 2026 Tickets + Airfare
                  </h3>
                  <p className='text-sm opacity-90'>Global Football Vault</p>
                </div>
                <div className='ml-4'>
                  <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center'>
                    <div className='w-8 h-8 bg-white rounded-sm flex items-center justify-center'>
                      <div className='w-6 h-6 bg-black rounded-sm grid grid-cols-3 gap-px p-1'>
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className='bg-white rounded-sm' />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex justify-between items-end'>
                <div>
                  <p className='text-sm opacity-75'>Name</p>
                  <p className='font-semibold'>John Abraham</p>
                </div>
                <div className='text-right'>
                  <div className='font-mono text-xs mb-1'>
                    |||||||||||||||||||
                  </div>
                  <p className='text-xs opacity-75'>#000001</p>
                </div>
              </div>

              <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-900 rounded-full -mr-3' />
              <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-900 rounded-full -ml-3' />
            </div>
          </Link>

          {/* Second Ticket - Madrid Jersey */}
          <Link href='/ticket' className='w-full max-w-lg'>
            <div className='bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 text-white shadow-2xl relative'>
              {/* Ticket Content */}
              <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                  <h3 className='font-bold text-lg sm:text-xl mb-1'>
                    Signed Team Real Madrid Jersey
                  </h3>
                  <p className='text-sm opacity-90'>Global Football Vault</p>
                </div>
                <div className='ml-4'>
                  <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center'>
                    <div className='w-8 h-8 bg-white rounded-sm flex items-center justify-center'>
                      <div className='w-6 h-6 bg-black rounded-sm grid grid-cols-3 gap-px p-1'>
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className='bg-white rounded-sm' />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex justify-between items-end'>
                <div>
                  <p className='text-sm opacity-75'>Name</p>
                  <p className='font-semibold'>John Abraham</p>
                </div>
                <div className='text-right'>
                  <div className='font-mono text-xs mb-1'>
                    |||||||||||||||||||
                  </div>
                  <p className='text-xs opacity-75'>#000002</p>
                </div>
              </div>

              {/* Ticket perforation holes */}
              <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-900 rounded-full -mr-3' />
              <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-900 rounded-full -ml-3' />
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className='text-center'>
          <p className='text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto px-4'>
            The Football AI Coach & Unmatched Football Giveaways — What More
            Could You Ask For?
          </p>

          <Button
            onClick={handleUnlockVault}
            size='lg'
            className='bg-purple-600 hover:bg-purple-700 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-full font-semibold transition-all duration-300'
          >
            Unlock The Vault
          </Button>
        </div>
      </div>
    </section>
  );
}
