"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "The Football AI", href: "/football-ai" },
  { name: "Exclusive Rewards", href: "/rewards" },
  { name: "Become A Member", href: "/membership" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/globalfootballvault",
    icon: Facebook,
    color: "hover:text-blue-500",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/globalfootballvault",
    icon: Twitter,
    color: "hover:text-blue-400",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/globalfootballvault",
    icon: Linkedin,
    color: "hover:text-blue-600",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/globalfootballvault",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string, url: string) => {
    console.log(`Opening ${platform}: ${url}`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNewsletterSignup = () => {
    console.log("Newsletter signup clicked");
    // You can implement newsletter signup functionality here
  };

  return (
    <footer className='bg-black text-white py-16 lg:py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-8'>
          {/* Logo */}
          <div className='mb-8'>
            <Link href='/' className='inline-block'>
              <div className='text-white font-bold text-2xl md:text-3xl'>
                <span className='text-3xl md:text-4xl'>🏈</span>
                <span className='ml-3 font-script'>Global Football Vault</span>
              </div>
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className='flex justify-center items-center gap-6 md:gap-8'>
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.name, social.href)}
                  className={`text-gray-400 ${social.color} transition-colors duration-300 hover:scale-110 transform`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <IconComponent className='w-6 h-6 md:w-7 md:h-7' />
                </button>
              );
            })}
          </div>

          {/* Navigation Links */}
          <nav className='border-t border-gray-800 pt-8'>
            <div className='flex flex-wrap justify-center items-center gap-4 md:gap-8'>
              {navigationLinks.map((link, index) => (
                <div key={link.name} className='flex items-center'>
                  <Link
                    href={link.href}
                    className='text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base font-medium'
                  >
                    {link.name}
                  </Link>
                  {index < navigationLinks.length - 1 && (
                    <span className='text-gray-600 mx-4 md:mx-6 hidden sm:inline'>
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Description */}
          <div className='max-w-4xl mx-auto'>
            <p className='text-gray-400 text-sm md:text-base leading-relaxed'>
              Exclusive Access And Entries Into Our Major Football Giveaways,
              Including: International Football Match Day Experiences, Premium
              Gear, And Once-In-A-Lifetime Football Rewards.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className='bg-gray-900 rounded-lg p-6 md:p-8 max-w-2xl mx-auto'>
            <h3 className='text-lg md:text-xl font-semibold text-white mb-4'>
              Stay Updated
            </h3>
            <p className='text-gray-400 text-sm md:text-base mb-6'>
              Get the latest updates on giveaways, AI features, and exclusive
              football content.
            </p>
            <div className='flex flex-col sm:flex-row gap-3'>
              <input
                type='email'
                placeholder='Enter your email address'
                className='flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
              />
              <button
                onClick={handleNewsletterSignup}
                className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2'
              >
                Subscribe
                <ExternalLink className='w-4 h-4' />
              </button>
            </div>
          </div>

          {/* Additional Links */}
          <div className='border-t border-gray-800 pt-8'>
            <div className='flex flex-wrap justify-center gap-6 md:gap-8 mb-6'>
              <Link
                href='/privacy'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                Terms of Service
              </Link>
              <Link
                href='/support'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                Support
              </Link>
              <Link
                href='/faq'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className='border-t border-gray-800 pt-6'>
            <p className='text-gray-500 text-sm'>
              © {currentYear} Arjun | Global Football Vault. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className='fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50'
        aria-label='Back to top'
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 10l7-7m0 0l7 7m-7-7v18'
          />
        </svg>
      </button>
    </footer>
  );
}
