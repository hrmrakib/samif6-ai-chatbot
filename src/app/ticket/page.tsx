"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TicketData {
  id: string;
  eventName: string;
  eventDate: string;
  venue: string;
  organizer: string;
  totalTickets: number;
  availableTickets: number;
  price: number;
  currency: string;
  attendeeName: string;
}

export default function TicketDetailsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketData, setTicketData] = useState<TicketData>({
    id: "GFV2024-001",
    eventName: "3x World Cup 2024 Tickets / Athens",
    eventDate: "2024-12-15",
    venue: "Athens Olympic Stadium",
    organizer: "GFV",
    totalTickets: 100,
    availableTickets: 25,
    price: 299,
    currency: "$",
    attendeeName: "Jhon Abraham",
  });

  // Generate barcode pattern
  const generateBarcode = () => {
    const pattern = [];
    for (let i = 0; i < 40; i++) {
      pattern.push(Math.random() > 0.5 ? "1" : "0");
    }
    return pattern;
  };

  const [barcodePattern] = useState(generateBarcode());

  // Generate QR code pattern (simplified)
  const generateQRPattern = () => {
    const size = 8;
    const pattern = [];
    for (let i = 0; i < size * size; i++) {
      pattern.push(Math.random() > 0.5);
    }
    return pattern;
  };

  const [qrPattern] = useState(generateQRPattern());

  const handlePurchase = async () => {
    if (ticketData.availableTickets <= 0) {
      alert("Sorry, no tickets available!");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for ticket purchase
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update available tickets
      setTicketData((prev) => ({
        ...prev,
        availableTickets: prev.availableTickets - 1,
      }));

      // Redirect to payment page
      router.push("/payment");
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Failed to purchase ticket. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className='min-h-screen bg-[url("/auth-bg.png")] bg-no-repeat bg-cover bg-center relative z-[1] flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        <div className='bg-white rounded-3xl shadow-2xl p-8 space-y-8'>
          {/* Header */}
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
              Ticket Details
            </h1>
            <div className='text-right'>
              <span className='text-sm text-gray-600'>
                Total Available Tickets:{" "}
              </span>
              <span className='text-red-500 font-bold text-lg'>
                {ticketData.availableTickets}
              </span>
            </div>
          </div>

          {/* Ticket Design */}
          <div className='relative'>
            <div className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden shadow-xl'>
              <div className='flex'>
                {/* Main Ticket Body */}
                <div className='flex-1 p-6 text-white space-y-4'>
                  {/* Event Info */}
                  <div className='space-y-2'>
                    <h2 className='text-lg md:text-xl font-bold'>
                      {ticketData.eventName}
                    </h2>
                    <p className='text-purple-200 text-sm'>
                      {ticketData.organizer}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className='space-y-1 text-sm'>
                    <p className='text-purple-100'>
                      Date: {formatDate(ticketData.eventDate)}
                    </p>
                    <p className='text-purple-100'>Venue: {ticketData.venue}</p>
                  </div>

                  {/* Attendee Name */}
                  <div className='pt-4'>
                    <p className='text-white font-semibold text-lg'>
                      {ticketData.attendeeName}
                    </p>
                  </div>

                  {/* Barcode */}
                  <div className='pt-4'>
                    <div className='flex space-x-px'>
                      {barcodePattern.map((bar, index) => (
                        <div
                          key={index}
                          className={`w-1 ${
                            bar === "1" ? "h-8 bg-white" : "h-6 bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-xs text-purple-200 mt-1'>
                      ID: {ticketData.id}
                    </p>
                  </div>
                </div>

                {/* Ticket Stub */}
                <div className='w-24 bg-white/10 backdrop-blur-sm border-l-2 border-dashed border-white/30 flex flex-col items-center justify-center p-4 space-y-4'>
                  {/* QR Code */}
                  <div className='bg-white p-2 rounded'>
                    <div className='grid grid-cols-8 gap-px'>
                      {qrPattern.map((pixel, index) => (
                        <div
                          key={index}
                          className={`w-1 h-1 ${
                            pixel ? "bg-black" : "bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Vertical Text */}
                  <div className='transform rotate-90 text-white text-xs font-medium whitespace-nowrap'>
                    ADMIT ONE
                  </div>

                  {/* Price */}
                  <div className='text-white text-center'>
                    <p className='text-xs'>Price</p>
                    <p className='font-bold'>
                      {ticketData.currency}
                      {ticketData.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Perforated Edge Effect */}
              <div className='absolute right-24 top-0 bottom-0 w-px'>
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className='absolute w-3 h-3 bg-white rounded-full transform -translate-x-1/2'
                    style={{ top: `${(i + 1) * 5}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className='space-y-4'>
            <p className='text-gray-600 leading-relaxed text-center'>
              There Are {ticketData.availableTickets} Tickets Available Now For
              The Upcoming Global Football Vault. This Event, Organized By{" "}
              {ticketData.organizer}, Is A Concert Experience Featuring Popular
              Event US, Including Global Football Vault. Tickets Can Be
              Purchased Through.
            </p>
          </div>

          {/* Purchase Button */}
          <div className='text-center'>
            <button
              onClick={handlePurchase}
              disabled={isLoading || ticketData.availableTickets <= 0}
              className={`px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 ${
                ticketData.availableTickets <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
              }`}
            >
              {isLoading ? (
                <div className='flex items-center space-x-2'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Processing...</span>
                </div>
              ) : ticketData.availableTickets <= 0 ? (
                "Sold Out"
              ) : (
                "Purchase Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
