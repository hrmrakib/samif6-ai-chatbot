"use client";

import { QrCode, Calendar, DollarSign, Hash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useUserPurchasedTicketsQuery } from "@/redux/features/ticket/ticketAPI";
import { FadeLoader } from "react-spinners";

type TicketProps = {
  id: number;
  user_email: string;
  ticket_title: string;
  quantity: number;
  unique_ticket_ids: string[];
  is_used: boolean;
  purchase_date: string;
  payment_status: "pending" | "paid" | "failed";
  total_price: number;
  original_price_value: number;
  is_free: boolean;
  source: string;
  billing_source_label: string;
};

export default function PurchasedTicketsPage() {
  const { data, isLoading } = useUserPurchasedTicketsQuery({});

  console.log("user purchased tickets", data?.free_tickets);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-gray-800";
      case "Succeeded":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto px-4 pt-36'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
            My Purchased Tickets
          </h1>
          <p className='text-gray-400'>
            Manage and view all your purchased tickets
          </p>
        </div>

        {/* Tickets Grid */}
        {isLoading ? (
          <div className='flex items-center justify-center h-40'>
            <FadeLoader color='white' />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            {data?.free_tickets?.map((ticket: TicketProps) => (
              <Card
                key={ticket.id}
                className='bg-gray-800 text-gray-100 hover:shadow-lg transition-shadow duration-300 border border-gray-500'
              >
                <CardContent className='p-6'>
                  {/* Header */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-6 h-6 bg-purple-600 rounded flex items-center justify-center'>
                        <QrCode className='w-4 h-4 text-white' />
                      </div>
                      <span className='font-semibold text-lg'>
                        {ticket?.ticket_title}
                      </span>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm text-gray-500'>
                        {/* {formatTime(ticket?.purchaseDate)} */}
                      </div>
                      <Badge className={getStatusColor(ticket?.payment_status)}>
                        {ticket?.payment_status.charAt(0).toUpperCase() +
                          ticket?.payment_status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className='space-y-3 mb-6'>
                    <div className='flex items-center gap-2'>
                      <DollarSign className='w-4 h-4 text-gray-500' />
                      <span className='text-sm text-gray-100'>
                        Tickets Price:
                      </span>
                      <span className='font-semibold'>
                        ${ticket?.original_price_value}
                      </span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Hash className='w-4 h-4 text-gray-100' />
                      <span className='text-sm text-gray-100'>
                        Ticket Quantity:
                      </span>
                      <span className='font-mono text-base font-semibold'>
                        {ticket?.quantity}
                      </span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-gray-100' />
                      <span className='text-sm text-gray-100'>
                        Purchased Date:
                      </span>
                      <span className='text-base font-semibold'>
                        {ticket?.purchase_date.split("T")[0]}
                      </span>
                    </div>

                    <div className='text-sm text-gray-100'>
                      <span className='font-medium'>Billing Source:</span>{" "}
                      {ticket?.billing_source_label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {data?.purchase_tickets?.length === 0 && (
          <div className='text-center py-12'>
            <QrCode className='w-16 h-16 text-gray-600 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-300 mb-2'>
              No tickets found
            </h3>
            <p className='text-gray-500'>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-gray-800 rounded-lg p-4 text-center'>
            <div className='text-2xl font-bold text-white'>
              {data?.free_tickets?.length}
            </div>
            <div className='text-gray-400 text-sm'>Total Tickets</div>
          </div>
        </div>
      </div>
    </div>
  );
}
