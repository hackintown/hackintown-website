"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";

// Type Definitions
type Message = {
  id: string;
  content: string;
  sender: "bot" | "user";
  timestamp: number;
};

type FAQItem = {
  question: string;
  answer: string;
  keywords: string[];
};

// Utility function for fuzzy matching
const calculateMatchScore = (query: string, keywords: string[]): number => {
  const normalizedQuery = query.toLowerCase().split(" ");
  return keywords.reduce((score, keyword) => {
    return normalizedQuery.some((word) => word.includes(keyword.toLowerCase()))
      ? score + 1
      : score;
  }, 0);
};

export default function AdvancedChatbotFAQ() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("chatHistory");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "welcome",
            content:
              "Hello! I'm Hackintown's advanced IT assistant. Ask me about our custom software, cloud services, or anything else!",
            sender: "bot",
            timestamp: Date.now(),
          },
        ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqData: FAQItem[] = [
    {
      question: "What services does Hackintown provide?",
      answer:
        "Hackintown specializes in Custom Software Development (MVP Development, Custom Web Development, Mobile App Development, Bar Code Solutions, E-Commerce) and Cloud Services (AWS Development, Cloud Architecture, DevOps Services, Cloud Security). We deliver tailored solutions to meet your business needs.",
      keywords: [
        "services",
        "software development",
        "cloud",
        "custom",
        "hackintown",
      ],
    },
    {
      question: "What is Hackintown's MVP Development service?",
      answer:
        "Hackintown's MVP Development service helps you build scalable minimum viable products with core features to test your ideas quickly and efficiently. We focus on rapid development and iterative feedback to ensure your product succeeds.",
      keywords: [
        "mvp",
        "development",
        "minimum viable product",
        "scalable",
        "hackintown",
      ],
    },
    {
      question: "Does Hackintown offer custom web and mobile app development?",
      answer:
        "Yes, Hackintown provides Custom Web Development for modern web applications and Custom Mobile App Development for native and cross-platform apps. We create user-friendly, high-performance solutions tailored to your requirements.",
      keywords: [
        "web development",
        "mobile app",
        "custom",
        "apps",
        "hackintown",
      ],
    },
    {
      question: "What are Hackintown's Bar Code Solutions?",
      answer:
        "Hackintown's Bar Code Solutions include custom software for inventory management and tracking systems. We design efficient, reliable tools to streamline your business operations.",
      keywords: ["barcode", "inventory", "tracking", "solutions", "hackintown"],
    },
    {
      question: "Can Hackintown build an E-Commerce platform for my business?",
      answer:
        "Yes, Hackintown offers custom E-Commerce solutions to create online stores with features like secure payments, product management, and user-friendly interfaces, designed to boost your sales.",
      keywords: ["e-commerce", "online store", "custom", "sales", "hackintown"],
    },
    {
      question: "What cloud services does Hackintown offer?",
      answer:
        "Hackintown provides AWS Development, Cloud Architecture, DevOps Services (CI/CD and automation), and Cloud Security. We help you design, deploy, and secure scalable cloud infrastructures.",
      keywords: [
        "cloud",
        "aws",
        "devops",
        "security",
        "architecture",
        "hackintown",
      ],
    },
    {
      question: "How does Hackintown ensure cloud security?",
      answer:
        "Hackintown's Cloud Security services include advanced protection measures, encryption, regular audits, and compliance with industry standards to safeguard your cloud-based systems from threats.",
      keywords: [
        "cloud security",
        "protection",
        "secure",
        "threats",
        "hackintown",
      ],
    },
    {
      question: "Which industries does Hackintown serve?",
      answer:
        "Hackintown serves industries like Beauty & Salon, Home Services, Handyman, Car Washing, Taxi Apps, Food Delivery, Grocery Delivery, and On-Demand services, delivering industry-specific app and software solutions.",
      keywords: ["industries", "sectors", "on-demand", "apps", "hackintown"],
    },
    {
      question: "Can Hackintown develop an on-demand app for my business?",
      answer:
        "Yes, Hackintown excels in On-Demand app development, including solutions for Beauty & Salon, Home Services, Handyman, Car Washing, Taxi, Food Delivery, and Grocery Delivery. We build apps that connect your services to customers seamlessly.",
      keywords: ["on-demand", "app", "development", "services", "hackintown"],
    },
    {
      question:
        "Does Hackintown offer solutions for food and grocery delivery?",
      answer:
        "Hackintown provides custom Food Delivery and Grocery Delivery app development, enabling businesses to offer convenient ordering and delivery services with real-time tracking and secure payments.",
      keywords: [
        "food delivery",
        "grocery delivery",
        "app",
        "custom",
        "hackintown",
      ],
    },
    {
      question: "What is Hackintown's expertise in taxi app development?",
      answer:
        "Hackintown develops Taxi Apps with features like ride booking, driver tracking, and payment integration, providing reliable and user-friendly solutions for transportation businesses.",
      keywords: ["taxi app", "ride", "booking", "development", "hackintown"],
    },
    {
      question: "How can Hackintown help with beauty and salon services?",
      answer:
        "Hackintown builds Beauty & Salon apps that allow customers to book appointments, browse services, and pay online, helping salons streamline operations and enhance customer experience.",
      keywords: ["beauty", "salon", "app", "booking", "hackintown"],
    },
    {
      question:
        "What support does Hackintown offer for home services and handyman apps?",
      answer:
        "Hackintown creates Home Services and Handyman Apps for scheduling professional maintenance, repairs, and installations, connecting service providers with customers efficiently.",
      keywords: [
        "home services",
        "handyman",
        "app",
        "scheduling",
        "hackintown",
      ],
    },
    {
      question: "Does Hackintown provide car washing app development?",
      answer:
        "Yes, Hackintown develops Car Washing Apps with features like service booking, location tracking, and payment options, making car cleaning convenient for users.",
      keywords: ["car washing", "app", "booking", "development", "hackintown"],
    },
    {
      question: "How do I contact Hackintown for support or inquiries?",
      answer:
        "You can reach Hackintown at (555) 123-4567, email us at info@hackintown.com, or visit our Contact Us page at /contact-us. We're here to assist with all your questions!",
      keywords: ["contact", "support", "inquiry", "help", "hackintown"],
    },
    {
      question: "What can I learn about Hackintown from the Insights section?",
      answer:
        "The Insights section includes About Us, Blog, Awards & Recognition, Careers, Partnership opportunities, and FAQs. It's a great way to learn about our team, achievements, and how we can collaborate.",
      keywords: [
        "insights",
        "about us",
        "blog",
        "careers",
        "partnership",
        "hackintown",
      ],
    },
    {
      question: "Does Hackintown offer career opportunities?",
      answer:
        "Yes, Hackintown is always looking for talent! Check our Careers page at /careers for current openings and join our team of innovative IT experts.",
      keywords: ["careers", "jobs", "hiring", "team", "hackintown"],
    },
    {
      question: "Can my company partner with Hackintown?",
      answer:
        "Hackintown welcomes partnerships! Visit /partnership to explore collaboration opportunities and how we can work together to deliver cutting-edge solutions.",
      keywords: [
        "partnership",
        "collaborate",
        "business",
        "solutions",
        "hackintown",
      ],
    },
    {
      question: "Where can I see Hackintown's past projects?",
      answer:
        "Explore our Portfolio at /portfolio to see examples of our custom software, cloud solutions, and on-demand apps we've built for clients across various industries.",
      keywords: ["portfolio", "projects", "work", "examples", "hackintown"],
    },
    {
      question: "How do I get started with Hackintown?",
      answer:
        "To begin, contact us via /contact-us or email info@hackintown.com. We'll discuss your needs, propose a tailored solution, and kick off your project with Hackintown!",
      keywords: ["get started", "begin", "contact", "project", "hackintown"],
    },
  ];

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Advanced answer finder with scoring
  const findAnswer = (query: string): string => {
    const normalizedQuery = query.toLowerCase();

    // Direct question match
    const directMatch = faqData.find(
      (item) => item.question.toLowerCase() === normalizedQuery
    );
    if (directMatch) return directMatch.answer;

    // Score-based keyword matching
    const scoredMatches = faqData
      .map((item) => ({
        ...item,
        score: calculateMatchScore(normalizedQuery, item.keywords),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scoredMatches.length > 0) {
      return scoredMatches[0].answer;
    }

    // Fallback response with context suggestion
    const lastUserMessage = messages
      .filter((m) => m.sender === "user")
      .slice(-2, -1)[0];
    return lastUserMessage
      ? "I couldn't find a match. Did you mean something related to '" +
          lastUserMessage.content +
          "'? Try rephrasing or ask about our services!"
      : "I don't have an answer for that yet. Try asking about our IT services, cloud solutions, or contact us at info@hackintown.com!";
  };

  // Simulate typing effect
  const typeMessage = async (content: string): Promise<string> => {
    return new Promise((resolve) => {
      let currentText = "";
      const interval = setInterval(() => {
        if (currentText.length < content.length) {
          currentText = content.slice(0, currentText.length + 1);
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (
              lastMessage.sender === "bot" &&
              lastMessage.id.startsWith("typing-")
            ) {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: currentText },
              ];
            }
            return prev;
          });
        } else {
          clearInterval(interval);
          resolve(content);
        }
      }, 20); // Adjust typing speed here
    });
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API delay and typing
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API delay
    const botResponseContent = findAnswer(input);
    const botMessage: Message = {
      id: `typing-${Date.now()}`,
      content: "",
      sender: "bot",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, botMessage]);
    await typeMessage(botResponseContent);

    // Finalize bot message
    setMessages((prev) => {
      const updated = prev.slice(0, -1);
      return [
        ...updated,
        {
          ...prev[prev.length - 1],
          id: (Date.now() + 1).toString(),
          content: botResponseContent,
        },
      ];
    });
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTyping) handleSend();
  };

  // Dynamic suggested questions based on conversation
  const getSuggestedQuestions = () => {
    const lastBotMessage =
      messages.filter((m) => m.sender === "bot").slice(-1)[0]?.content || "";
    if (lastBotMessage.includes("services")) {
      return [
        "What is MVP Development?",
        "Can you build an E-Commerce platform?",
        "What cloud services do you offer?",
      ];
    }
    return [
      "What services does Hackintown provide?",
      "How do I contact Hackintown?",
      "Which industries do you serve?",
    ];
  };

  return (
    <div className="w-full max-w-3xl mx-auto border rounded-xl shadow-sm overflow-hidden bg-card">
      <div className="border-b p-3 sm:p-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <Bot className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
          <h2 className="font-semibold text-sm sm:text-base">
            Hackintown IT Assistant
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Your advanced guide to Hackintown&apos;s IT solutions
        </p>
      </div>

      <div className="h-[350px] sm:h-[400px] overflow-y-auto p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  {message.sender === "bot" ? (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`
                    rounded-lg p-3 
                    ${
                      message.sender === "bot"
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }
                  `}
                >
                  {message.content}
                  <span
                    className={`cn{
                    message.sender === "bot" ? "text-muted-foreground" : "text-primary-foreground"
                  } text-xs block mt-1`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted text-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            Try asking:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {getSuggestedQuestions().map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(question);
                  setTimeout(() => handleSend(), 100);
                }}
                className="text-xs sm:text-sm bg-muted hover:bg-muted/80 text-muted-foreground px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 sm:p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 text-sm"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            disabled={input.trim() === "" || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
