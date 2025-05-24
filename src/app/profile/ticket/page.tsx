"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  Share2,
  QrCode,
  Calendar,
  DollarSign,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Ticket {
  id: string;
  name: string;
  price: number;
  ticketNumber: string;
  purchaseDate: Date;
  eventDate: Date;
  status: "active" | "used" | "expired";
  category: string;
  venue: string;
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    name: "Ticket# 4",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-15"),
    eventDate: new Date("2024-02-15"),
    status: "active",
    category: "Football",
    venue: "Stadium Arena",
  },
  {
    id: "2",
    name: "Ticket# J",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-16"),
    eventDate: new Date("2024-02-20"),
    status: "active",
    category: "Football",
    venue: "Sports Complex",
  },
  {
    id: "3",
    name: "Ticket# D",
    price: 99,
    ticketNumber: "0FDH40J6",
    purchaseDate: new Date("2024-01-17"),
    eventDate: new Date("2024-02-25"),
    status: "active",
    category: "Football",
    venue: "Championship Field",
  },
  {
    id: "4",
    name: "Ticket# 9",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-18"),
    eventDate: new Date("2024-03-01"),
    status: "used",
    category: "Football",
    venue: "Stadium Arena",
  },
  {
    id: "5",
    name: "Ticket# K",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-19"),
    eventDate: new Date("2024-03-05"),
    status: "active",
    category: "Football",
    venue: "Sports Complex",
  },
  {
    id: "6",
    name: "Ticket# A",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-20"),
    eventDate: new Date("2024-03-10"),
    status: "active",
    category: "Football",
    venue: "Championship Field",
  },
  {
    id: "7",
    name: "Ticket# S",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-21"),
    eventDate: new Date("2024-03-15"),
    status: "expired",
    category: "Football",
    venue: "Stadium Arena",
  },
  {
    id: "8",
    name: "Ticket# L",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-22"),
    eventDate: new Date("2024-03-20"),
    status: "active",
    category: "Football",
    venue: "Sports Complex",
  },
  {
    id: "9",
    name: "Ticket# F",
    price: 99,
    ticketNumber: "0xf32sq4eeee",
    purchaseDate: new Date("2024-01-23"),
    eventDate: new Date("2024-03-25"),
    status: "active",
    category: "Football",
    venue: "Championship Field",
  },
];

const ITEMS_PER_PAGE = 9;

export default function PurchasedTicketsPage() {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  // Filter and search tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchTerm, statusFilter]);

  // Sort tickets
  const sortedTickets = useMemo(() => {
    const sorted = [...filteredTickets];
    switch (sortBy) {
      case "date":
        return sorted.sort(
          (a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime()
        );
      case "price":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [filteredTickets, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTickets = sortedTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleOpenTicket = (ticket: Ticket) => {
    console.log("Opening ticket:", ticket);
    // Implement ticket detail view or modal
  };

  const handleDownloadTicket = (ticket: Ticket) => {
    console.log("Downloading ticket:", ticket);
    // Implement ticket download functionality
  };

  const handleShareTicket = (ticket: Ticket) => {
    console.log("Sharing ticket:", ticket);
    // Implement ticket sharing functionality
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
            My Purchased Tickets
          </h1>
          <p className='text-gray-400'>
            Manage and view all your purchased tickets
          </p>
        </div>

        {/* Filters and Search */}
        <div className='mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              placeholder='Search tickets by name or number...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400'
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-full md:w-40 bg-gray-800 border-gray-700 text-white'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='used'>Used</SelectItem>
              <SelectItem value='expired'>Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-full md:w-40 bg-gray-800 border-gray-700 text-white'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='date'>Date</SelectItem>
              <SelectItem value='price'>Price</SelectItem>
              <SelectItem value='name'>Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {paginatedTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className='bg-white text-gray-900 hover:shadow-lg transition-shadow duration-300'
            >
              <CardContent className='p-6'>
                {/* Header */}
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 bg-purple-600 rounded flex items-center justify-center'>
                      <QrCode className='w-4 h-4 text-white' />
                    </div>
                    <span className='font-semibold text-lg'>{ticket.name}</span>
                  </div>
                  <div className='text-right'>
                    <div className='text-sm text-gray-500'>
                      {formatTime(ticket.purchaseDate)}
                    </div>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center gap-2'>
                    <DollarSign className='w-4 h-4 text-gray-500' />
                    <span className='text-sm text-gray-600'>
                      Tickets Price:
                    </span>
                    <span className='font-semibold'>${ticket.price}</span>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Hash className='w-4 h-4 text-gray-500' />
                    <span className='text-sm text-gray-600'>
                      Ticket Number:
                    </span>
                    <span className='font-mono text-sm'>
                      {ticket.ticketNumber}
                    </span>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-500' />
                    <span className='text-sm text-gray-600'>Event Date:</span>
                    <span className='text-sm'>
                      {ticket.eventDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className='text-sm text-gray-600'>
                    <span className='font-medium'>Venue:</span> {ticket.venue}
                  </div>
                </div>

                {/* Actions */}
                <div className='flex gap-2'>
                  <Button
                    onClick={() => handleOpenTicket(ticket)}
                    className='flex-1 bg-purple-600 hover:bg-purple-700 text-white'
                  >
                    Open Ticket
                  </Button>

                  <Button
                    onClick={() => handleDownloadTicket(ticket)}
                    variant='outline'
                    size='icon'
                    className='border-gray-300 hover:bg-gray-100'
                  >
                    <Download className='w-4 h-4' />
                  </Button>

                  <Button
                    onClick={() => handleShareTicket(ticket)}
                    variant='outline'
                    size='icon'
                    className='border-gray-300 hover:bg-gray-100'
                  >
                    <Share2 className='w-4 h-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {paginatedTickets.length === 0 && (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-2'>
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant='outline'
              className='border-gray-600 text-gray-300 hover:bg-gray-800'
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                className={
                  currentPage === page
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              variant='outline'
              className='border-gray-600 text-gray-300 hover:bg-gray-800'
            >
              Next
            </Button>
          </div>
        )}

        {/* Summary Stats */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-gray-800 rounded-lg p-4 text-center'>
            <div className='text-2xl font-bold text-white'>
              {tickets.length}
            </div>
            <div className='text-gray-400 text-sm'>Total Tickets</div>
          </div>
          <div className='bg-gray-800 rounded-lg p-4 text-center'>
            <div className='text-2xl font-bold text-green-400'>
              {tickets.filter((t) => t.status === "active").length}
            </div>
            <div className='text-gray-400 text-sm'>Active</div>
          </div>
          <div className='bg-gray-800 rounded-lg p-4 text-center'>
            <div className='text-2xl font-bold text-gray-400'>
              {tickets.filter((t) => t.status === "used").length}
            </div>
            <div className='text-gray-400 text-sm'>Used</div>
          </div>
          <div className='bg-gray-800 rounded-lg p-4 text-center'>
            <div className='text-2xl font-bold text-purple-400'>
              ${tickets.reduce((sum, ticket) => sum + ticket.price, 0)}
            </div>
            <div className='text-gray-400 text-sm'>Total Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}
