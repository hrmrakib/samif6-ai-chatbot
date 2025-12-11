/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

import type React from "react";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Search, Menu, ArrowRight, SquarePen, Trash, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import {
  useCreateChatMutation,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useGetAiChatBySessionQuery,
  useGetAiChatSessionQuery,
  useSerachChatsQuery,
} from "@/redux/features/ai/aiChatAPI";
import { useRouter, useSearchParams } from "next/navigation";
import remarkGfm from "remark-gfm";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeLoader } from "react-spinners";
import { toast } from "sonner";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";

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
  response_id: string;
  query_text: string;
  response_text: string;
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

export default function ChatbotSectionContent() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionDeleteId, setSessionDeleteId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [createSessionMutation, { isLoading: isCreatingSessionLoading }] =
    useCreateSessionMutation();
  const [createChatMutation] = useCreateChatMutation();
  const [deleteSessionMutation] = useDeleteSessionMutation();
  const { data: searchChats, isLoading: searchLoading } = useSerachChatsQuery(
    { q: search, email },
    { skip: !search }
  );
  const sessionId = searchParams.get("session_id");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(
    sessionId
  );
  const router = useRouter();
  const { data: user } = useGetProfileQuery({});
  const { data: allChats, refetch: refetchChats } = useGetAiChatBySessionQuery(
    currentSessionId,
    {
      skip: !currentSessionId,
    }
  );
  const {
    data: allSessions,
    isLoading: sessionLoading,
    refetch: sessionRefetch,
  } = useGetAiChatSessionQuery(email, {
    skip: !email,
  });

  const { today, yesterday, last_week, last_month, last_year } =
    allSessions ?? {};

  useEffect(() => {
    const storedData = localStorage.getItem("samif6_user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setEmail(parsedData.email);
    }
  }, []);

  useLayoutEffect(() => {
    if (currentSessionId) {
      const url = new URL(window.location.href);
      url.searchParams.set("session_id", currentSessionId);
      window.history.replaceState(null, "", url.toString());
    }
  }, [currentSessionId]);

  useEffect(() => {
    if (!currentSessionId) return;

    const chats = allChats?.data ?? [];

    if (!chats.length) {
      setMessages((prev) =>
        prev.filter((m) => !m.response_id || m.response_id === "")
      );
      return;
    }

    setMessages((prev) => {
      const serverMsgs: Message[] = chats.map((m: Message) => ({
        response_id: m.response_id,
        query_text: m.query_text,
        response_text: m.response_text,
      }));

      const pending = prev.filter((m) => !m.response_id);

      const seen = new Set<string>();
      const dedupServer = serverMsgs.filter((m) => {
        if (!m.response_id) return true;
        if (seen.has(m.response_id)) return false;
        seen.add(m.response_id);
        return true;
      });

      return [...dedupServer, ...pending];
    });
  }, [allChats?.data, currentSessionId]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

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

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const makeSession = async (): Promise<string | null> => {
    if (!email) {
      toast.warning("Please login to continue");
      router.push("/login");
      return null;
    }

    if (
      user?.subscribed_plan_status === null ||
      user?.subscribed_plan_status?.plan__name === "free"
    ) {
      toast.warning("Please upgrade your plan to continue");
      router.push("/#membership");
      return null;
    }

    if (currentSessionId) {
      return currentSessionId;
    }

    try {
      const res = await createSessionMutation({ email }).unwrap();

      if (res?.session_id) {
        const newSessionId = res.session_id;
        const url = new URL(window.location.href);
        url.searchParams.set("session_id", newSessionId);
        window.history.replaceState(null, "", url.toString());
        setCurrentSessionId(newSessionId);
        await sessionRefetch();
        return newSessionId;
      }
    } catch (error: any) {
      console.error("Error creating session:", error);
      toast.error(error?.data?.message || "Failed to create session.");
    } finally {
      setIsSidebarOpen(false);
      setOpen(false);
    }

    return null;
  };

  const handleSendMessage = async () => {
    const userInput = inputValue.trim();

    if (!userInput || isLoading) return;

    setIsLoading(true);

    const userMsg: Message = {
      response_id: "",
      query_text: userInput,
      response_text: "",
    };

    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setInputValue("");

    try {
      let activeSessionId = currentSessionId;

      if (!activeSessionId) {
        activeSessionId = await makeSession();
        if (!activeSessionId) {
          setIsLoading(false);
          return;
        }
      }

      const msg = {
        session_id: activeSessionId,
        email: email,
        query_text: userInput,
      };

      const aiResponse = await createChatMutation(msg).unwrap();

      if (aiResponse?.data) {
        const aiMessage: Message = {
          response_id: aiResponse.data.response_id,
          query_text: userInput,
          response_text: aiResponse.data.response_text,
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        await refetchChats();
        await sessionRefetch();
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      const errorMessage: Message = {
        response_id: "error",
        query_text: userInput,
        response_text:
          "Sorry, I'm having trouble responding right now. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
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

  const startNewChat = async () => {
    // Clear current messages immediately for instant UX feedback
    setMessages([]);

    // Reset current session ID before creating a new one
    setCurrentSessionId(null);

    try {
      // Create a brand new session
      const newSessionId = await createSessionMutation({ email }).unwrap();

      if (newSessionId?.session_id) {
        const session_id = newSessionId.session_id;

        // Update state and URL
        setCurrentSessionId(session_id);
        const url = new URL(window.location.href);
        url.searchParams.set("session_id", session_id);
        window.history.replaceState(null, "", url.toString());

        // Refetch sessions list to update sidebar
        await sessionRefetch();

        toast.success("Started a new chat session 🎉");
      } else {
        toast.error("Failed to create new chat session.");
      }
    } catch (error: any) {
      console.error("Error creating new chat:", error);
      toast.error(error?.data?.message || "Unable to start new chat");
    } finally {
      // Close sidebar and scroll down
      setIsSidebarOpen(false);
      setOpen(false);
      scrollToBottom();
    }
  };

  const handleSelectSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    scrollToBottom();
    setIsSidebarOpen(false);
    setOpen(false);
    refetchChats();
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentSessionId(chatId);
    const url = new URL(window.location.href);
    url.searchParams.set("session_id", chatId);
    window.history.replaceState(null, "", url.toString());
    setIsSidebarOpen(false);
    scrollToBottom();
    refetchChats();
  };

  const handleSessionDelete = async (sessionId: string) => {
    setSessionDeleteId(sessionId);
    try {
      const res = await deleteSessionMutation({
        email: email,
        session_id: sessionId,
      }).unwrap();

      if (res?.success) {
        sessionRefetch();
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    } finally {
      setSessionDeleteId(null);
    }
  };

  const renderSessionSection = (label: string, sessions: Session[]) => {
    return (
      <div>
        <h3 className='text-sm font-medium text-gray-400 mb-3'>{label}</h3>
        <div className='space-y-2'>
          {sessions?.map((session) => (
            <div key={session.session_id} className='relative group space-y-1'>
              <button
                onClick={() => handleChatSelect(session.session_id)}
                className='w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
              >
                {session.title}
              </button>
              <button
                onClick={() => handleSessionDelete(session.session_id)}
                className='absolute right-2 top-2 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-wait'
                disabled={sessionDeleteId === session.session_id}
              >
                <Trash className='h-5 w-5 hover:text-red-500' />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
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
          <div className='flex items-center justify- mb-4'>
            {sessionLoading && <p>loading ....</p>}
          </div>

          {today?.length > 0 &&
            renderSessionSection("Today", allSessions?.today)}
          {yesterday?.length > 0 &&
            renderSessionSection("Yesterday", allSessions?.yesterday)}
          {last_week?.length > 0 &&
            renderSessionSection("Last Week", allSessions?.last_week)}
          {last_month?.length > 0 &&
            renderSessionSection("Last Month", allSessions?.last_month)}
          {last_year?.length > 0 &&
            renderSessionSection("Last Year", allSessions?.last_year)}
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
          {/* Chat Search */}
          <div className='p-4'>
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
                      onValueChange={(value) => setSearch(value)}
                      placeholder='Search chats…'
                      className='h-12 border-0 bg-transparent text-gray-100 placeholder:text-neutral-500 focus:ring-0'
                    />
                  </Command>
                </div>

                <Command className='bg-transparent'>
                  <CommandList className='max-h-[60vh]'>
                    <CommandEmpty className='py-6 text-neutral-400'>
                      No results found.
                    </CommandEmpty>

                    <div className='px-2'>
                      <button
                        type='button'
                        disabled={isCreatingSessionLoading}
                        onClick={() => startNewChat()}
                        className='my-2 w-full h-11 flex items-center justify-center rounded-lg bg-neutral-800/70 hover:bg-neutral-200 text-neutral-100 hover:text-gray-900 disabled:cursor-wait'
                      >
                        + New chat
                      </button>
                    </div>
                    <CommandSeparator className='bg-neutral-800' />

                    <CommandGroup heading='Chats' className='p-2 flex flex-col'>
                      {searchChats?.results && searchChats.results.length > 0
                        ? searchChats.results.map(
                            (chat: { session_id: string; title: string }) => (
                              <button
                                key={chat.session_id}
                                onClick={() =>
                                  handleSelectSession(chat?.session_id)
                                }
                                className='w-full flex items-center pl-2.5 mb-1 h-11 rounded-lg bg-neutral-800/70 text-neutral-100 cursor-pointer'
                              >
                                <User className='mr-2 h-4 w-4 text-neutral-300' />
                                <p>{chat.title}</p>
                              </button>
                            )
                          )
                        : allSessions?.today?.map(
                            (chat: { session_id: string; title: string }) => (
                              <button
                                key={chat.session_id}
                                onClick={() =>
                                  handleSelectSession(chat?.session_id)
                                }
                                className='w-full flex items-center pl-2.5 mb-1 h-11 rounded-lg bg-neutral-800/70 text-neutral-100 cursor-pointer'
                              >
                                <User className='mr-2 h-4 w-4 text-neutral-300' />
                                <p>{chat.title}</p>
                              </button>
                            )
                          )}

                      {searchLoading && (
                        <div className='w-full flex items-center justify-center'>
                          <FadeLoader color='white' />
                        </div>
                      )}
                    </CommandGroup>
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
                {(allChats?.data?.length ?? 0) === 0 &&
                  messages.length === 0 && (
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
                  )}

                {messages.map((chat) => (
                  <div
                    key={
                      chat.response_id ||
                      `${chat.query_text}-${chat.response_text}`
                    }
                  >
                    {chat.response_id && (
                      <h3 className='text-lg font-medium text-gray-300 mb-2'>
                        🙋🏻‍♂️ {chat.query_text}
                      </h3>
                    )}

                    <div className='space-y-4'>
                      {typeof chat.response_text === "string" &&
                        chat.response_text.length > 0 && (
                          <div className='flex justify-end'>
                            <div className='max-w-xs md:max-w-2xl px-4 py-3 rounded-2xl bg-gray-800 text-white'>
                              <ReactMarkdown
                                children={chat.response_text}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  ul: ({ children }) => (
                                    <ul className='list-disc pl-6 text-sm text-gray-200 text-wrap'>
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className='list-decimal pl-6 text-sm text-gray-200 text-wrap'>
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children }) => (
                                    <li className='py-1 text-lg text-gray-200 text-wrap'>
                                      {children}
                                    </li>
                                  ),
                                  p: ({ children }) => (
                                    <p className='text-base text-gray-200 mb-2 text-wrap'>
                                      {children}
                                    </p>
                                  ),
                                  strong: ({ children }) => (
                                    <strong className='text-white text-lg text-wrap'>
                                      {children}
                                    </strong>
                                  ),
                                  em: ({ children }) => (
                                    <em className='italic text-yellow-300 text-lg text-wrap'>
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
                ))}

                {/* <h3 className='text-lg font-medium text-gray-300 mb-2'>
                  {inputTitleTemp && "🙋🏻‍♂️ " + inputTitleTemp}
                </h3> */}

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
                        onChange={(e) => {
                          setInputValue(e.target.value);
                        }}
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
