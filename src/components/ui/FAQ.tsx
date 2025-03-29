"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Server,
  Shield,
  Cloud,
  Code,
  Database,
  Headphones,
  Check,
  HelpCircle,
  Bot,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ChatbotFAQ from "@/components/ui/chatbot-faq";
import TextWithLines from "./TextWithLines";

type Step = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
};

export default function WizardFAQ() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const steps: Step[] = [
    {
      id: "cloud",
      title: "Cloud Services",
      description: "Learn about our cloud migration and management solutions",
      icon: <Cloud className="h-6 w-6" />,
      questions: [
        {
          id: "cloud-1",
          question: "What cloud platforms do you support?",
          answer:
            "We support all major cloud platforms including AWS, Microsoft Azure, Google Cloud Platform, IBM Cloud, and Oracle Cloud. Our certified cloud architects can help you design, migrate, and manage multi-cloud or hybrid cloud environments tailored to your specific business requirements.",
        },
        {
          id: "cloud-2",
          question: "How long does a typical cloud migration take?",
          answer:
            "The timeline for cloud migration varies based on the complexity of your infrastructure, application dependencies, and data volume. A small to medium business migration typically takes 2-4 months, while enterprise-level migrations may take 6-12 months or longer. We use a phased approach to minimize disruption and ensure business continuity throughout the process.",
        },
        {
          id: "cloud-3",
          question: "How do you handle cloud security?",
          answer:
            "Our cloud security approach includes identity and access management, network security, encryption, vulnerability management, and continuous monitoring. We implement security best practices for each cloud platform, conduct regular security assessments, and ensure compliance with relevant regulations. Our security operations center provides 24/7 monitoring to detect and respond to potential threats.",
        },
      ],
    },
    {
      id: "security",
      title: "Cybersecurity",
      description: "Explore our comprehensive security solutions",
      icon: <Shield className="h-6 w-6" />,
      questions: [
        {
          id: "security-1",
          question: "What security assessments do you offer?",
          answer:
            "We offer a comprehensive range of security assessments including vulnerability assessments, penetration testing, security architecture reviews, code security reviews, and compliance gap analyses. Our assessments are conducted by certified security professionals using industry-standard methodologies and proprietary tools to identify vulnerabilities and provide actionable remediation recommendations.",
        },
        {
          id: "security-2",
          question: "How do you protect against ransomware?",
          answer:
            "Our ransomware protection strategy includes advanced threat detection systems, email filtering, endpoint protection, regular security awareness training, and comprehensive backup solutions with air-gapped storage. We implement network segmentation to limit lateral movement, utilize behavioral analysis to detect suspicious activities, and maintain detailed incident response plans to ensure rapid recovery if an attack occurs.",
        },
        {
          id: "security-3",
          question: "What is your incident response process?",
          answer:
            "Our incident response process follows the NIST framework: Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Post-Incident Activities. We maintain a 24/7 security operations center for continuous monitoring, have dedicated incident response teams ready to deploy, and use automated playbooks for common scenarios to ensure rapid response. Throughout the process, we maintain clear communication with stakeholders and provide detailed post-incident reports with recommendations to prevent future occurrences.",
        },
      ],
    },
    {
      id: "development",
      title: "Software Development",
      description: "Discover our custom software development services",
      icon: <Code className="h-6 w-6" />,
      questions: [
        {
          id: "dev-1",
          question: "What development methodologies do you use?",
          answer:
            "We primarily employ Agile methodologies (Scrum and Kanban) for software development, allowing for iterative progress, regular feedback, and flexibility. For certain projects with well-defined requirements, we may use a modified Waterfall approach. Our development process incorporates DevOps practices, continuous integration/continuous deployment (CI/CD), and automated testing to ensure high-quality deliverables.",
        },
        {
          id: "dev-2",
          question: "How do you ensure software quality?",
          answer:
            "We ensure software quality through a comprehensive approach that includes code reviews, automated unit and integration testing, performance testing, security testing, and user acceptance testing. Our development teams follow coding standards and best practices, and we use static code analysis tools to identify potential issues early. We maintain separate development, testing, and production environments, and implement continuous monitoring to quickly identify and address any issues in production.",
        },
        {
          id: "dev-3",
          question: "What technologies do your developers specialize in?",
          answer:
            "Our development teams specialize in a wide range of technologies including JavaScript/TypeScript (React, Angular, Node.js), Python, Java, .NET, PHP, Ruby, mobile development (iOS, Android, React Native, Flutter), cloud-native development, and blockchain. We also have expertise in database technologies (SQL, NoSQL), AI/ML frameworks, and IoT development. We continuously invest in training to ensure our teams stay current with emerging technologies and best practices.",
        },
      ],
    },
    {
      id: "infrastructure",
      title: "IT Infrastructure",
      description: "Learn about our infrastructure management services",
      icon: <Server className="h-6 w-6" />,
      questions: [
        {
          id: "infra-1",
          question: "How do you approach infrastructure modernization?",
          answer:
            "Our infrastructure modernization approach begins with a comprehensive assessment of your current environment, identifying opportunities for improvement in performance, reliability, security, and cost-efficiency. We develop a roadmap that may include server consolidation, virtualization, containerization, or cloud migration. Implementation is typically phased to minimize disruption, with careful planning for data migration, application compatibility, and user training.",
        },
        {
          id: "infra-2",
          question: "What monitoring solutions do you provide?",
          answer:
            "We provide comprehensive monitoring solutions that cover infrastructure health, application performance, security, and user experience. Our monitoring stack includes tools for real-time alerting, trend analysis, capacity planning, and automated remediation of common issues. We implement custom dashboards tailored to different stakeholder needs, from technical teams to executive management, providing visibility into system performance and business impact.",
        },
        {
          id: "infra-3",
          question: "How do you ensure high availability?",
          answer:
            "We ensure high availability through redundant architecture, load balancing, automated failover mechanisms, and geographic distribution of resources. Our designs eliminate single points of failure across compute, storage, network, and power systems. We implement proactive monitoring to identify potential issues before they cause outages, conduct regular disaster recovery testing, and maintain detailed runbooks for rapid response to any service disruptions.",
        },
      ],
    },
    {
      id: "data",
      title: "Data Management",
      description: "Explore our data management and analytics solutions",
      icon: <Database className="h-6 w-6" />,
      questions: [
        {
          id: "data-1",
          question: "How do you handle data migration projects?",
          answer:
            "Our data migration approach follows a structured methodology that minimizes risk and ensures data integrity. We begin with a comprehensive assessment of source and target systems, followed by data mapping, cleansing, and validation. We develop a detailed migration strategy that includes pilot migrations, validation protocols, and rollback procedures. During implementation, we use specialized migration tools, perform incremental transfers when possible, and conduct thorough testing at each stage.",
        },
        {
          id: "data-2",
          question: "What data analytics capabilities do you offer?",
          answer:
            "We offer comprehensive data analytics capabilities including data warehousing, business intelligence, predictive analytics, and machine learning solutions. Our services cover the entire analytics lifecycle from data collection and preparation to visualization and actionable insights. We implement modern data platforms that enable real-time analytics, self-service reporting, and advanced analytics models tailored to your specific business challenges and opportunities.",
        },
        {
          id: "data-3",
          question: "How do you ensure data quality and governance?",
          answer:
            "We ensure data quality and governance through a combination of technical controls and organizational processes. This includes implementing data quality rules, validation checks, and cleansing procedures to maintain accuracy and consistency. Our governance framework establishes clear data ownership, access controls, retention policies, and compliance measures. We deploy metadata management tools to maintain data catalogs and lineage tracking, enabling better understanding and trust in your data assets.",
        },
      ],
    },
    {
      id: "support",
      title: "Technical Support",
      description: "Learn about our technical support services",
      icon: <Headphones className="h-6 w-6" />,
      questions: [
        {
          id: "support-1",
          question: "What support tiers do you offer?",
          answer:
            "We offer multiple support tiers to meet different business needs and budgets. Our Standard tier provides business hours support with next business day response for non-critical issues. The Premium tier offers 24/7 support for critical issues with guaranteed response times of 2-4 hours. Our Enterprise tier provides 24/7 support with 15-30 minute response times for critical issues, dedicated support engineers, and proactive monitoring and maintenance.",
        },
        {
          id: "support-2",
          question: "How do you handle escalations?",
          answer:
            "Our escalation process ensures that complex or time-sensitive issues receive appropriate attention. Initial support requests are handled by Level 1 technicians who resolve common issues. If needed, issues are escalated to Level 2 specialists with deeper technical expertise, and further to Level 3 senior engineers or developers for the most complex problems. Throughout the escalation process, we maintain clear communication about status, expected resolution times, and any required customer actions.",
        },
        {
          id: "support-3",
          question: "Do you provide on-site support?",
          answer:
            "Yes, we provide on-site support options for clients who require physical presence for certain issues or regular maintenance. This can be arranged on an as-needed basis or as part of a managed services agreement with scheduled on-site visits. Our field technicians are equipped to handle hardware installations, network configurations, physical security implementations, and hands-on training. On-site support availability may vary by geographic location.",
        },
      ],
    },
  ];

  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentStepIndex(currentStepIndex + 1);
      setExpandedQuestions([]);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentStepIndex(currentStepIndex - 1);
      setExpandedQuestions([]);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const goToStep = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentStepIndex(index);
      setExpandedQuestions([]);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // Custom navigation button component
  const NavigationButton = ({
    onClick,
    disabled,
    direction,
    children,
  }: {
    onClick: () => void;
    disabled: boolean;
    direction: "prev" | "next";
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled || isTransitioning}
      className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all
                ${
                  disabled || isTransitioning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:translate-y-[-2px]"
                }
                ${
                  direction === "prev"
                    ? "bg-white text-primary border border-primary hover:bg-primary/5"
                    : "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md"
                }
            `}
      aria-label={direction === "prev" ? "Previous step" : "Next step"}
    >
      {direction === "prev" && <ChevronLeft className="h-4 w-4" />}
      {children}
      {direction === "next" && <ChevronRight className="h-4 w-4" />}
    </button>
  );

  return (
    <div className="py-10 bg-background relative">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <TextWithLines text="Frequently Asked Questions" className="mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked&nbsp;
            <span className="text-primary mt-2">Questions</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-light max-w-2xl mx-auto">
            Find answers to common questions about our IT services, support
            options, and solutions
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-sm sm:text-base">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm sm:text-base">{currentStep.title}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step navigation */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              disabled={isTransitioning}
              className={`
                                flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all
                                ${
                                  isTransitioning
                                    ? "cursor-not-allowed"
                                    : "hover:scale-105"
                                }
                                ${
                                  currentStepIndex === index
                                    ? "bg-primary text-primary-foreground text-sm border-primary"
                                    : "bg-card hover:bg-muted/50 border-muted-foreground/20"
                                }
                            `}
              aria-label={`Go to ${step.title}`}
            >
              <div className="mb-2">{step.icon}</div>
              <span className="text-xs md:text-sm">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Current step content */}
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-card border rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {currentStep.icon}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                {currentStep.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {currentStep.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentStep.questions.map((q) => (
              <div
                key={q.id}
                className="rounded-lg overflow-hidden border border-border shadow-sm"
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">
                      {q.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedQuestions.includes(q.id) ? 90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedQuestions.includes(q.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 pt-0 border-t">
                        <div className="flex gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {q.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Custom navigation buttons */}
        <div className="flex justify-between">
          <NavigationButton
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            direction="prev"
          >
            Previous
          </NavigationButton>

          <NavigationButton
            onClick={nextStep}
            disabled={currentStepIndex === steps.length - 1}
            direction="next"
          >
            Next
          </NavigationButton>
        </div>
      </div>

      {/* Chatbot floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className={`
                        h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all
                        ${
                          isChatbotOpen
                            ? "bg-destructive text-destructive-foreground rotate-90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }
                    `}
          aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
        >
          {isChatbotOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Bot className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Chatbot dialog */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] sm:w-[400px] md:w-[450px] max-w-md mx-auto"
          >
            <ChatbotFAQ />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
