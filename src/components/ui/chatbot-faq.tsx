"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

type Message = {
  id: string
  content: string
  sender: "bot" | "user"
}

type FAQItem = {
  question: string
  answer: string
  keywords: string[]
}

export default function ChatbotFAQ() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your IT assistant. Ask me anything about our services, security practices, or technical support.",
      sender: "bot",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const faqData: FAQItem[] = [
    {
      question: "What IT services do you offer?",
      answer:
        "We offer a comprehensive range of IT services including managed IT support, cloud solutions, cybersecurity, software development, data analytics, IT consulting, and digital transformation services. Each service can be customized to meet your specific business needs and objectives.",
      keywords: ["services", "offer", "provide", "it services", "support"],
    },
    {
      question: "How do I get technical support?",
      answer:
        "You can reach our technical support team through multiple channels: 24/7 helpdesk at (555) 123-4567, email at support@techcompany.com, or through our client portal. For urgent issues, we have a dedicated emergency response team available at all times.",
      keywords: ["technical support", "support", "help", "helpdesk", "contact", "assistance"],
    },
    {
      question: "What is your approach to cybersecurity?",
      answer:
        "Our cybersecurity approach is based on a multi-layered defense strategy. We implement advanced threat protection, conduct regular security assessments, provide employee security awareness training, and develop comprehensive incident response plans. We also offer 24/7 security monitoring and stay current with emerging threats to ensure your systems remain protected.",
      keywords: ["cybersecurity", "security", "protection", "threats", "hacking", "secure"],
    },
    {
      question: "Do you offer cloud migration services?",
      answer:
        "Yes, we specialize in cloud migration services. Our team will assess your current infrastructure, develop a tailored migration strategy, and execute a seamless transition to the cloud platform that best suits your needs (AWS, Azure, Google Cloud, or hybrid solutions). We ensure minimal disruption to your operations during the migration process.",
      keywords: ["cloud", "migration", "aws", "azure", "google cloud", "move to cloud"],
    },
    {
      question: "What industries do you serve?",
      answer:
        "We serve a wide range of industries including healthcare, finance, manufacturing, education, retail, professional services, and non-profit organizations. Our team has specialized knowledge in industry-specific regulations and compliance requirements, allowing us to deliver solutions that address the unique challenges of each sector.",
      keywords: ["industries", "sectors", "clients", "companies", "businesses", "serve"],
    },
    {
      question: "How do you ensure data privacy?",
      answer:
        "We ensure data privacy through a combination of technical controls, administrative safeguards, and physical security measures. This includes data encryption (both in transit and at rest), access controls, regular security audits, and strict adherence to privacy regulations such as GDPR, HIPAA, and CCPA. We also provide data privacy training to all our staff and implement data minimization practices.",
      keywords: ["privacy", "data privacy", "gdpr", "hipaa", "confidential", "secure data"],
    },
  ]

  const findAnswer = (query: string): string => {
    const normalizedQuery = query.toLowerCase()

    // First try to find direct question matches
    const directMatch = faqData.find((item) => item.question.toLowerCase() === normalizedQuery)

    if (directMatch) return directMatch.answer

    // Then look for keyword matches
    const keywordMatches = faqData.filter((item) =>
      item.keywords.some((keyword) => normalizedQuery.includes(keyword.toLowerCase())),
    )

    if (keywordMatches.length > 0) {
      // Return the answer with the most keyword matches
      return keywordMatches[0].answer
    }

    // Default response if no matches
    return "I don't have specific information about that. Would you like to ask about our IT services, cybersecurity, cloud solutions, or technical support? Alternatively, you can contact our team directly for more assistance."
  }

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: findAnswer(input),
        sender: "bot",
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Suggested questions
  const suggestedQuestions = [
    "What IT services do you offer?",
    "How do I get technical support?",
    "What is your approach to cybersecurity?",
    "Do you offer cloud migration services?",
  ]

  return (
    <div className="max-w-3xl mx-auto border rounded-xl shadow-sm overflow-hidden bg-card">
      <div className="border-b p-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">IT Support Assistant</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Ask me anything about our IT services and solutions</p>
      </div>

      <div className="h-[400px] overflow-y-auto p-4 flex flex-col gap-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
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
                    ${message.sender === "bot" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}
                  `}
                >
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
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

      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(question)
                  setTimeout(() => handleSend(), 100)
                }}
                className="text-sm bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={handleSend} size="icon" disabled={input.trim() === "" || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

