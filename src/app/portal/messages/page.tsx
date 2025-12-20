"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  Search,
  Plus,
  User,
  Clock,
  CheckCheck,
  ArrowLeft,
  Paperclip,
  Loader2,
} from "lucide-react";
import Button from "@/components/Button";

interface Message {
  id: string;
  content: string;
  sender: "patient" | "clinic";
  senderName: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  participant: string;
  participantRole: string;
  messages: Message[];
}

// Mock data - replace with API calls
const mockConversations: Conversation[] = [
  {
    id: "1",
    subject: "Hearing Aid Adjustment Question",
    lastMessage: "Thank you for reaching out. I'll be happy to help you with the adjustment.",
    lastMessageTime: "2 hours ago",
    unread: true,
    participant: "Dr. Sarah Chen",
    participantRole: "Audiologist",
    messages: [
      {
        id: "1a",
        content: "Hi Dr. Chen, I've been experiencing some feedback with my new hearing aids. Is this normal during the adjustment period?",
        sender: "patient",
        senderName: "You",
        timestamp: "Today, 10:30 AM",
        read: true,
      },
      {
        id: "1b",
        content: "Thank you for reaching out. I'll be happy to help you with the adjustment. Some feedback during the initial period is common, especially in quieter environments. Can you describe when you notice it most?",
        sender: "clinic",
        senderName: "Dr. Sarah Chen",
        timestamp: "Today, 11:45 AM",
        read: false,
      },
    ],
  },
  {
    id: "2",
    subject: "Appointment Rescheduling",
    lastMessage: "Your appointment has been rescheduled to January 20th at 2:00 PM.",
    lastMessageTime: "Yesterday",
    unread: false,
    participant: "Reception",
    participantRole: "Front Desk",
    messages: [
      {
        id: "2a",
        content: "Hi, I need to reschedule my appointment on January 15th. Is there availability on the 20th?",
        sender: "patient",
        senderName: "You",
        timestamp: "Yesterday, 9:00 AM",
        read: true,
      },
      {
        id: "2b",
        content: "Of course! I've checked our schedule and we have availability on January 20th. Would 2:00 PM work for you?",
        sender: "clinic",
        senderName: "Reception",
        timestamp: "Yesterday, 10:15 AM",
        read: true,
      },
      {
        id: "2c",
        content: "Yes, that works perfectly. Thank you!",
        sender: "patient",
        senderName: "You",
        timestamp: "Yesterday, 10:30 AM",
        read: true,
      },
      {
        id: "2d",
        content: "Your appointment has been rescheduled to January 20th at 2:00 PM. You'll receive a confirmation email shortly.",
        sender: "clinic",
        senderName: "Reception",
        timestamp: "Yesterday, 10:45 AM",
        read: true,
      },
    ],
  },
  {
    id: "3",
    subject: "Insurance Question",
    lastMessage: "I'll look into this and get back to you within 24 hours.",
    lastMessageTime: "3 days ago",
    unread: false,
    participant: "Billing Department",
    participantRole: "Billing",
    messages: [
      {
        id: "3a",
        content: "I received an invoice but I believe my insurance should cover most of it. Can you help verify?",
        sender: "patient",
        senderName: "You",
        timestamp: "3 days ago, 2:00 PM",
        read: true,
      },
      {
        id: "3b",
        content: "I'll look into this and get back to you within 24 hours. Could you provide your insurance policy number?",
        sender: "clinic",
        senderName: "Billing Department",
        timestamp: "3 days ago, 3:30 PM",
        read: true,
      },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (conv: Conversation) => {
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: false } : c))
    );
    setSelectedConversation({ ...conv, unread: false });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMsg: Message = {
      id: `${selectedConversation.id}-${Date.now()}`,
      content: newMessage,
      sender: "patient",
      senderName: "You",
      timestamp: "Just now",
      read: true,
    };

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMsg],
      lastMessage: newMessage,
      lastMessageTime: "Just now",
    });

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConversation.id
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMessage, lastMessageTime: "Just now" }
          : c
      )
    );

    setNewMessage("");
    setSending(false);
  };

  // Conversation List View
  const ConversationList = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Search & New Message */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button onClick={() => setShowNewMessage(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Conversations */}
      <div className="space-y-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelectConversation(conv)}
              className={`bg-white rounded-xl border border-border p-4 cursor-pointer hover:shadow-md transition-shadow ${
                conv.unread ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold text-foreground ${conv.unread ? "" : "font-normal"}`}>
                        {conv.participant}
                      </h3>
                      <span className="text-xs text-muted">
                        {conv.participantRole}
                      </span>
                    </div>
                    <p className={`text-sm ${conv.unread ? "font-medium text-foreground" : "text-muted"}`}>
                      {conv.subject}
                    </p>
                    <p className="text-sm text-muted truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted">
                    {conv.lastMessageTime}
                  </span>
                  {conv.unread && (
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              No Messages Found
            </h3>
            <p className="text-muted mb-4">
              {searchQuery
                ? "No messages match your search."
                : "You don't have any messages yet."}
            </p>
            <Button onClick={() => setShowNewMessage(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Start a Conversation
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Conversation Detail View
  const ConversationDetail = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[calc(100vh-200px)] min-h-[500px]"
    >
      {/* Header */}
      <div className="bg-white rounded-t-xl border border-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedConversation(null)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {selectedConversation?.participant}
            </h3>
            <p className="text-sm text-muted">
              {selectedConversation?.subject}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 border-x border-border p-4 overflow-y-auto">
        <div className="space-y-4">
          {selectedConversation?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  msg.sender === "patient"
                    ? "bg-primary text-white"
                    : "bg-white border border-border"
                }`}
              >
                <p className={msg.sender === "patient" ? "text-white" : "text-foreground"}>
                  {msg.content}
                </p>
                <div
                  className={`flex items-center gap-2 mt-2 text-xs ${
                    msg.sender === "patient"
                      ? "text-white/70"
                      : "text-muted"
                  }`}
                >
                  <Clock className="h-3 w-3" />
                  {msg.timestamp}
                  {msg.sender === "patient" && msg.read && (
                    <CheckCheck className="h-3 w-3" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-b-xl border border-border p-4">
        <div className="flex items-end gap-2">
          <button className="p-2 text-muted hover:text-foreground transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim() || sending}>
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );

  // New Message Modal
  const NewMessageModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-lg w-full"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          New Message
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              To
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select recipient...</option>
              <option value="reception">Reception / General Inquiry</option>
              <option value="billing">Billing Department</option>
              <option value="audiologist">Your Audiologist</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="What is this about?"
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Type your message..."
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowNewMessage(false)}
          >
            Cancel
          </Button>
          <Button className="flex-1" onClick={() => setShowNewMessage(false)}>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Messages
        </h1>
        <p className="text-muted mt-1">
          Communicate with your care team securely
        </p>
      </motion.div>

      {/* Content */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Conversation List - Always visible on desktop */}
        <div className={`lg:col-span-1 ${selectedConversation ? "hidden lg:block" : ""}`}>
          <ConversationList />
        </div>

        {/* Conversation Detail - Shows on selection */}
        <div className={`lg:col-span-2 ${selectedConversation ? "" : "hidden lg:block"}`}>
          {selectedConversation ? (
            <ConversationDetail />
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center h-[calc(100vh-200px)] min-h-[500px] flex flex-col items-center justify-center">
              <MessageSquare className="h-16 w-16 text-muted mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                Select a Conversation
              </h3>
              <p className="text-muted">
                Choose a conversation from the list to view messages
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessage && <NewMessageModal />}
    </div>
  );
}
