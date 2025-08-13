/* eslint-disable react/no-children-prop */

"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Search, Menu, ArrowRight, SquarePen, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import {
  useCreateChatMutation,
  useCreateSessionMutation,
  useGetAiChatBySessionQuery,
  useGetAiChatSessionQuery,
} from "@/redux/features/ai/aiChatAPI";
import { useSearchParams } from "next/navigation";
import remarkGfm from "remark-gfm";
import { FadeLoader } from "react-spinners";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatItem = {
  id: string;
  title: string;
  date: string;
  group: "Yesterday" | "Previous 7 Days" | "Older";
};

export type ChatSearchProps = {
  chats?: ChatItem[];
  onSelectChat?: (id: string) => void;
  onNewChat?: () => void;
  hotkey?: string;
  chatSearchOpen?: boolean;
};

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Session {
  title: string;
  session_id: string;
}

const aiCategories = [
  { id: "nutrition", label: "AI Nutrition", icon: "🥗" },
  { id: "strength", label: "AI Strength", icon: "💪" },
  { id: "training", label: "AI Training & Programs", icon: "🏃" },
  { id: "injury", label: "AI Injury Prevention", icon: "🏥" },
  { id: "analytics", label: "AI Analytics", icon: "📊" },
];

export default function ChatbotSection() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [createSessionMutation] = useCreateSessionMutation();
  const [createChatMutation] = useCreateChatMutation();
  const {
    data: allChats,
    refetch,
    isLoading: chatLoading,
  } = useGetAiChatBySessionQuery(sessionId, {
    skip: !sessionId,
  });

  const {
    data: allSessions,
    isLoading: sessionLoading,
    refetch: sessionRefetch,
  } = useGetAiChatSessionQuery(email, {
    skip: !email,
  });

  console.log("api not responding", allChats);

  console.log("allSessions:", allSessions);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    const mail = localStorage.getItem("samif6_user_email");
    if (mail) {
      setEmail(mail);
    }
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSelect(value: string) {
    setOpen(false);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const makeSession = async () => {
    try {
      const res = await createSessionMutation({ email }).unwrap();
      if (res?.session_id) {
        // set on urlbar using nextjs
        const url = new URL(window.location.href);
        url.searchParams.set("session_id", res.session_id);
        window.history.replaceState(null, "", url.toString());
      }
      console.log(res);
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setIsSidebarOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);

    let currentSessionId: string | null | void = sessionId;

    if (!currentSessionId) {
      currentSessionId = await makeSession();
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const msg = {
      session_id: currentChatId || currentSessionId,
      email: email,
      query_text: inputValue,
    };

    try {
      const aiResponse = await createChatMutation(msg).unwrap();

      console.log({ aiResponse });

      if (aiResponse?.session_id) {
        refetch();
        sessionRefetch();
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse?.data?.[0]?.response_text ?? "No response found.",
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content:
          "Sorry, I'm having trouble responding right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
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
    makeSession();
  };

  const handleChatSelect = (chatId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("session_id", chatId);
    window.history.replaceState(null, "", url.toString());
    setCurrentChatId(chatId);
    setIsSidebarOpen(false);
    refetch();
    scrollToBottom();
  };

  const toggleDropdown = (sessionId: string) => {
    setDropdownVisible((prev) => (prev === sessionId ? null : sessionId));
  };

  // Handle editing session title
  const handleEditSession = (sessionId: string) => {
    setEditingSessionId(sessionId);
    const session = allSessions?.today?.find((s) => s.session_id === sessionId);
    if (session) setNewTitle(session.title);
  };

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
            onClick={() => setOpen(true)}
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
          {/* Displaying Today's Sessions */}
          <div className='flex items-center justify-center mb-4'>
            {sessionLoading && (
              <FadeLoader
                color={"#cccccc"}
                loading={true}
                speedMultiplier={1.2}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            )}
          </div>

          <div className='space-y-2'>
            {allSessions?.today?.map((session: Session) => (
              <div
                key={session.session_id}
                className='relative group space-y-1'
              >
                <button
                  onClick={() => handleChatSelect(session.session_id)}
                  className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                >
                  {editingSessionId === session.session_id ? (
                    <input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className='bg-gray-700 text-white rounded-md p-2 w-full'
                      autoFocus
                    />
                  ) : (
                    session.title
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(session.session_id);
                  }}
                  className='absolute right-2 top-2 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <Trash className='h-5 w-5  hover:text-red-500' />
                </button>
              </div>
            ))}
          </div>

          {/* Displaying Yesterday's Sessions */}
          {allSessions?.yesterday?.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-gray-400 mb-3'>
                Yesterday
              </h3>
              <div className='space-y-2'>
                {allSessions?.yesterday?.map((session: Session) => (
                  <button
                    key={session.session_id}
                    onClick={() => handleChatSelect(session?.session_id)}
                    className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                  >
                    {session.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Displaying Previous Week's Sessions */}
          {allSessions?.last_week?.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-gray-400 mb-3'>
                Last Week
              </h3>
              <div className='space-y-2'>
                {allSessions?.last_week?.map((session: Session) => (
                  <button
                    key={session.session_id}
                    onClick={() => handleChatSelect(session?.session_id)}
                    className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                  >
                    {session.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Displaying last_month Sessions */}
          {allSessions?.last_month?.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-gray-400 mb-3'>
                Last Month
              </h3>
              <div className='space-y-2'>
                {allSessions?.last_month?.map((session: Session) => (
                  <button
                    key={session.session_id}
                    onClick={() => handleChatSelect(session?.session_id)}
                    className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                  >
                    {session.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Displaying last_year Sessions */}
          {allSessions?.last_year?.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-gray-400 mb-3'>
                Last Year
              </h3>
              <div className='space-y-2'>
                {allSessions?.last_year?.map((session: Session) => (
                  <button
                    key={session.session_id}
                    onClick={() => handleChatSelect(session?.session_id)}
                    className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                  >
                    {session.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  console.log("allChats?.data", allChats?.data?.length);

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
          {/* Chat Search */}
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent
                className={cn(
                  "gap-0 p-0 overflow-hidden border-neutral-800",
                  "sm:max-w-2xl bg-neutral-900 text-neutral-100"
                )}
              >
                {/* Header with close */}
                <div className='relative border-b border-neutral-800'>
                  <button
                    aria-label='Close'
                    onClick={() => setOpen(false)}
                    className='absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                  >
                    <X className='h-4 w-4' />
                  </button>
                  <Command className='bg-transparent'>
                    <CommandInput
                      placeholder='Search chats…'
                      className='h-12 border-0 bg-transparent text-neutral-100 placeholder:text-neutral-500 focus:ring-0'
                    />
                  </Command>
                </div>

                <Command className='bg-transparent'>
                  <CommandList className='max-h-[60vh]'>
                    <CommandEmpty className='py-6 text-neutral-400'>
                      No results found.
                    </CommandEmpty>

                    <CommandGroup heading='' className='px-2 py-3'>
                      <CommandItem
                        value='new'
                        onSelect={handleSelect}
                        className='mb-1 h-11 rounded-lg bg-neutral-800/70 text-neutral-100 hover:bg-neutral-800 data-[selected=true]:bg-neutral-800'
                      >
                        <Plus className='mr-2 h-4 w-4 text-neutral-300' />
                        New chat
                      </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className='bg-neutral-800' />
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>

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
            <div className='w-10' />
          </div>

          {/* Messages Area */}
          <ScrollArea className='flex-1 p-4 md:p-8 mb-24'>
            <div className='relative flex items-center justify-center min-h-[90vh] w-full'>
              <div className='w-full max-w-4xl mx-auto space-y-6'>
                {/* Welcome Message and Categories */}
                {allChats?.data?.length === 0 ||
                  (!sessionId && (
                    <div className='text-center space-y-8'>
                      <h1 className='text-2xl md:text-4xl font-bold text-white mb-8'>
                        Hello! Ask Me About Global Football Vault.
                      </h1>

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
                  ))}

                {/* Welcome Message and Categories */}
                <div className='flex items-center justify-center mb-4'>
                  {chatLoading ? (
                    <FadeLoader
                      color={"#cccccc"}
                      loading={true}
                      speedMultiplier={1.2}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : null}
                </div>

                {allChats?.data?.length === 0 ? (
                  <div className='flex items-center justify-center mb-4'>
                    <h2 className='text-[30px] font-medium text-gray-300 mb-2'>
                      No Chat Found
                    </h2>
                  </div>
                ) : null}

                {allChats?.data?.map(
                  (chat: {
                    response_id: string;
                    query_text: string;
                    response_text: string;
                  }) => (
                    <div key={chat?.response_id}>
                      <h3 className='text-lg font-medium text-gray-300 mb-2'>
                        🙋🏻‍♂️ {chat?.query_text}{" "}
                      </h3>
                      <div className='space-y-4'>
                        {typeof chat?.response_text === "string" && (
                          <div
                            className={`flex ${
                              true ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-xs md:max-w-2xl px-4 py-3 rounded-2xl ${
                                true
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-800 text-white"
                              }`}
                            >
                              <ReactMarkdown
                                children={chat?.response_text}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  ul: ({ children }) => (
                                    <ul className='list-disc pl-6 text-sm text-gray-200'>
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className='list-decimal pl-6 text-sm text-gray-200'>
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children }) => (
                                    <li className='py-1 text-lg text-gray-200'>
                                      {children}
                                    </li>
                                  ),
                                  p: ({ children }) => (
                                    <p className='text-base text-gray-200 mb-2'>
                                      {children}
                                    </p>
                                  ),
                                  strong: ({ children }) => (
                                    <strong className='text-white text-lg'>
                                      {children}
                                    </strong>
                                  ),
                                  em: ({ children }) => (
                                    <em className='italic text-yellow-300 text-lg'>
                                      {children}
                                    </em>
                                  ),
                                  br: () => <br className='my-2' />,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}

                {/* Loading Indicator */}
                {isLoading ? (
                  <div className='flex justify-start pb-40'>
                    <div className='bg-gray- text-white px-4 py-3 rounded-2xl'>
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
                ) : null}

                <div ref={messagesEndRef} />

                <div
                  className={`${
                    sessionId &&
                    "fixed bottom-6 left-[58.5%] transform -translate-x-1/2 block"
                  } w-full`}
                >
                  <div className='w-full max-w-4xl mx-auto'>
                    <div className='w-full relative max-h-80 flex gap-2 md:gap-4 bg-[#2d2d2d] rounded-2xl p-2'>
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Ask Me About Anything Football...'
                        className='w-full p-2.5 flex-1 bg-transparent border-none text-white placeholder-gray-400 outline-none focus:ring-0 text-sm md:text-base resize-none max-h-[250px] overflow-y-auto'
                        rows={1}
                        style={{
                          height: "auto",
                          minHeight: "6rem",
                          width: "100%",
                        }}
                        ref={(el) => {
                          if (el) {
                            el.style.height = "auto";
                            el.style.height = `${Math.min(
                              el.scrollHeight,
                              250
                            )}px`;
                          }
                        }}
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
        </div>
      </div>
    </section>
  );
}
