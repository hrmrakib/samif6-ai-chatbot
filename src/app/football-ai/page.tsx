"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, ArrowRight, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  lastMessage: Date;
}

const aiCategories = [
  { id: "nutrition", label: "AI Nutrition", icon: "🥗" },
  { id: "strength", label: "AI Strength", icon: "💪" },
  { id: "training", label: "AI Training & Programs", icon: "🏃" },
  { id: "injury", label: "AI Injury Prevention", icon: "🏥" },
  { id: "analytics", label: "AI Analytics", icon: "📊" },
];

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! Ask Me About Global Football Vault.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: "1", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "2", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "3", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "4", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "5", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "6", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "7", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "8", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "9", name: "Chat Name", messages: [], lastMessage: new Date() },
    { id: "10", name: "Chat Name", messages: [], lastMessage: new Date() },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    // Simple AI response simulation based on keywords
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("nutrition") || lowerMessage.includes("diet")) {
      return "Great question about nutrition! As your AI Football Coach, I recommend focusing on a balanced diet with adequate protein (1.6-2.2g per kg body weight), complex carbohydrates for energy, and proper hydration. Would you like specific meal plans for training days?";
    }

    if (lowerMessage.includes("training") || lowerMessage.includes("workout")) {
      return "For optimal football training, I suggest a periodized approach combining technical skills, tactical awareness, physical conditioning, and mental preparation. What specific aspect of training would you like to focus on - speed, agility, strength, or endurance?";
    }

    if (
      lowerMessage.includes("injury") ||
      lowerMessage.includes("prevention")
    ) {
      return "Injury prevention is crucial for football players. Key strategies include proper warm-up routines, strength training for muscle imbalances, flexibility work, adequate recovery, and listening to your body. Are you experiencing any specific concerns or areas of discomfort?";
    }

    if (
      lowerMessage.includes("analytics") ||
      lowerMessage.includes("performance")
    ) {
      return "Performance analytics can significantly improve your game! I can help you track metrics like sprint speed, passing accuracy, distance covered, heart rate zones, and recovery patterns. What specific performance areas would you like to analyze?";
    }

    if (lowerMessage.includes("strength") || lowerMessage.includes("gym")) {
      return "Strength training for football should focus on functional movements, explosive power, and sport-specific patterns. I recommend compound exercises like squats, deadlifts, and plyometrics. What's your current training experience level?";
    }

    return "That's an interesting question about football! As your AI coach, I'm here to help with training, nutrition, injury prevention, performance analytics, and strength development. Could you be more specific about what aspect you'd like to explore?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // const userMessage: Message = {
    //   id: Date.now().toString(),
    //   content: inputValue,
    //   isUser: true,
    //   timestamp: new Date(),
    // };

    // setMessages((prev) => [...prev, userMessage]);
    // setInputValue("");
    // setIsLoading(true);

    // try {
    //   const aiResponse = await simulateAIResponse(inputValue);
    //   const aiMessage: Message = {
    //     id: (Date.now() + 1).toString(),
    //     content: aiResponse,
    //     isUser: false,
    //     timestamp: new Date(),
    //   };
    //   setMessages((prev) => [...prev, aiMessage]);
    // } catch (error) {
    //   console.error("Error getting AI response:", error);
    //   const errorMessage: Message = {
    //     id: (Date.now() + 1).toString(),
    //     content:
    //       "Sorry, I'm having trouble responding right now. Please try again.",
    //     isUser: false,
    //     timestamp: new Date(),
    //   };
    //   setMessages((prev) => [...prev, errorMessage]);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleCategoryClick = (category: (typeof aiCategories)[0]) => {
    const categoryMessage = `Tell me about ${category.label.toLowerCase()}`;
    setInputValue(categoryMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! Ask Me About Global Football Vault.",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setCurrentChatId(null);
    setIsSidebarOpen(false);
  };

  const groupChatsByDate = (chats: ChatSession[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    return {
      today: chats.filter(
        (chat) => chat.lastMessage.toDateString() === today.toDateString()
      ),
      yesterday: chats.filter(
        (chat) => chat.lastMessage.toDateString() === yesterday.toDateString()
      ),
      previous: chats.filter(
        (chat) => chat.lastMessage < yesterday && chat.lastMessage > weekAgo
      ),
    };
  };

  const groupedChats = groupChatsByDate(chatSessions);

  const SidebarContent = () => (
    <div className='flex flex-col h-full bg-black text-white'>
      {/* Logo */}
      <div className=''>
        <div className='flex items-center justify-center'>
          <Link href='/' className='pt-6'>
            <Image src='/logo.jpg' alt='Logo' width={140} height={40} />
          </Link>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsSidebarOpen(false)}
            className='md:hidden text-gray-400 hover:text-white'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='p-4'>
        <div className='flex items-center justify-between gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={startNewChat}
            className='text-gray-400 hover:text-white hover:bg-gray-800'
          >
            <Search className='h-6 w-6' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={startNewChat}
            className='text-gray-400 hover:text-white hover:bg-gray-800'
          >
            <SquarePen className='h-6 w-6' />
          </Button>
        </div>
      </div>

      {/* Chat History */}
      <ScrollArea className='flex-1 p-4'>
        <div className='space-y-6'>
          {/* Today */}
          {groupedChats.today.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-gray-400 mb-3'>Today</h3>
              <div className='space-y-2'>
                {groupedChats.today.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setCurrentChatId(chat.id);
                      setIsSidebarOpen(false);
                    }}
                    className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                  >
                    {chat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {groupedChats.yesterday.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-gray-400 mb-3'>
                Yesterday
              </h3>
              <div className='space-y-2'>
                {groupedChats.yesterday.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setCurrentChatId(chat.id);
                      setIsSidebarOpen(false);
                    }}
                    className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                  >
                    {chat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Previous 7 Days */}
          {groupedChats.previous.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-gray-400 mb-3'>
                Previous 7 Days
              </h3>
              <div className='space-y-2'>
                {groupedChats.previous.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setCurrentChatId(chat.id);
                      setIsSidebarOpen(false);
                    }}
                    className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                  >
                    {chat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <section className='max-h-screen bg-gradient-to-br from-[#000000] via-[#000000] to-[#0000004c] shadow-black/20  relative overflow-hidden'>
      <div className='flex h-screen'>
        {/* Desktop Sidebar */}
        <div className='hidden md:block w-80'>
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side='left' className='p-0 w-80'>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Chat Area */}
        <div className='flex-1 flex flex-col bg-[#1a1a1a]'>
          {/* Mobile Header */}
          <div className='md:hidden flex items-center justify-between p-4 bg-black/50 border-b border-gray-800'>
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='text-white'>
                  <Menu className='h-6 w-6' />
                </Button>
              </SheetTrigger>
            </Sheet>
            <h1 className='text-white font-semibold'>Football AI Coach</h1>
            <div className='w-10' /> {/* Spacer */}
          </div>

          {/* Messages Area */}
          <ScrollArea className='flex-1 p-4 md:p-8'>
            <div className='flex items-center justify-center min-h-[90vh] w-full'>
              <div className='max-w-4xl mx-auto space-y-6'>
                {/* Welcome Message and Categories */}
                {messages.length === 1 && (
                  <div className='text-center space-y-8'>
                    <h1 className='text-2xl md:text-4xl font-bold text-white mb-8'>
                      Hello! Ask Me About Global Football Vault.
                    </h1>

                    {/* Category Buttons */}
                    <div className='flex flex-wrap justify-center gap-3 md:gap-4'>
                      {aiCategories.map((category) => (
                        <Button
                          key={category.id}
                          onClick={() => handleCategoryClick(category)}
                          variant='outline'
                          className='bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700 hover:text-white text-sm md:text-base px-4 py-2'
                        >
                          <span className='mr-2'>{category.icon}</span>
                          {category.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Messages */}
                {/* {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-2xl px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? "bg-purple-600 text-white"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      <p className='text-sm md:text-base'>{message.content}</p>
                      <p className='text-xs opacity-70 mt-1'>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))} */}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className='flex justify-start'>
                    <div className='bg-gray-800 text-white px-4 py-3 rounded-2xl'>
                      <div className='flex space-x-1'>
                        <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
                        <div
                          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />

                <div className=''>
                  <div className='max-w-4xl mx-auto'>
                    <div className='relative h-32 flex gap-2 md:gap-4 bg-[#2d2d2d] rounded-2xl p-2'>
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Ask Me About Anything Football...'
                        className='flex-1 bg-transparent border-none text-white placeholder-gray-400 outline-none focus:ring-none text-sm md:text-base'
                        disabled={isLoading}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        //   size='icon'
                        className='absolute right-2 bottom-5 h-6 w-6 md:h-10 md:w-10 bg-[#534590] hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-200'
                      >
                        <ArrowRight
                          size={28}
                          className='text-2xl text-white h-4 w-4 md:h-6 md:w-6 -rotate-45'
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Input Area */}
          {/* <div className='p-4 md:p-8 border-t border-gray-800'>
            <div className='max-w-4xl mx-auto'>
              <div className='flex gap-2 md:gap-4 bg-gray-800 rounded-2xl p-2'>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder='Ask Me About Anything Football...'
                  className='flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 text-sm md:text-base'
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size='icon'
                  className='bg-purple-600 hover:bg-purple-700 text-white rounded-xl'
                >
                  <Send className='h-4 w-4 md:h-5 md:w-5' />
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
