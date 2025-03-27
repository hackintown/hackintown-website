"use client";

import { useState } from "react";
import { MdEmail, MdArrowForward } from "react-icons/md";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Button } from "../button";
import { ArrowRightIcon } from "lucide-react";

// Form data interface for type safety and documentation
interface FormData {
    fullName: string;
    email: string;
    countryCode: string;
    phone: string;
    companyName: string;
    companySize: string;
    jobTitle: string;
    launchTime: string;
    about: string;
    budget: string;
    source_url: string;
}

/**
 * ContactSection Component
 * Renders a contact form with company information and handles form submissions
 * @returns JSX.Element
 */

export default function ContactSection() {
    // State management for form submission and budget slider
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [budget, setBudget] = useState(5000);
    const pathname = usePathname(); // Used for tracking form source

    // Initialize form data with default values
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        countryCode: "+91",
        phone: "",
        companyName: "",
        companySize: "",
        jobTitle: "",
        launchTime: "",
        about: "",
        budget: "5000",
        source_url: "",
    });

    /**
     * Validates form data before submission
     * @returns string|null - Error message if validation fails, null if valid
     */
    const validateForm = () => {
        if (!formData.fullName) return "Full Name is required";
        if (!formData.email) return "Email is required";
        if (!formData.phone) return "Phone number is required";
        if (!formData.companyName) return "Company Name is required";
        if (!formData.companySize) return "Company Size is required";
        if (!formData.jobTitle) return "Job Title is required";
        if (!formData.launchTime) return "Launch Timeline is required";
        if (!formData.about) return "Project description is required";
        if (!formData.budget) return "Budget is required";
        return null;
    };

    /**
     * Handles changes to the budget slider
     * @param e - Change event from range input
     */
    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(Number(e.target.value));
    };

    /**
     * Handles form submission
     * @param e - Form submission event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate form
            const error = validateForm();
            if (error) {
                toast.error(error);
                setIsSubmitting(false);
                return;
            }
            // API call to submit form data
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    budget: budget.toString(),
                    source_url: `${window.location.origin}${pathname}`,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            // Success toast
            toast.success("Form submitted successfully! We'll get back to you soon.");

            // Reset form to initial state
            setFormData({
                fullName: "",
                email: "",
                countryCode: "+91",
                phone: "",
                companyName: "",
                companySize: "",
                jobTitle: "",
                launchTime: "",
                about: "",
                budget: "5000",
                source_url: "",
            });
            setBudget(5000);
        } catch (error) {
            // Error handling with user feedback
            console.error("Error submitting form:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to submit form. Please try again later."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="get-in-touch" className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left Column */}
                    <div className="space-y-8 max-w-xl">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                Get in Touch with
                                <span className="text-[#0072BC] block text-4xl sm:text-5xl md:text-6xl font-extrabold">
                                    Our
                                    <br />
                                    Experts
                                </span>
                            </h2>
                            <p className="text-gray-600 md:text-lg leading-relaxed">
                                Want to find out how KNK Soft Infotech can help your
                                organization? We&apos;d love to hear from you.
                            </p>
                        </div>

                        {/* Partner Section */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Integrate Towards Innovation
                            </h3>
                            <p className="text-gray-600">
                                Become an KNK Soft Infotech Partner to Launch, Run and Grow Your
                                Business Globally.
                            </p>
                            <Link href="/contact-us" passHref>
                                <button className="group flex items-center text-[#0072BC] font-semibold hover:opacity-80 transition-all duration-200">
                                    Become a Partner
                                    <MdArrowForward className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Contact Info:
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 group">
                                    <MdEmail className="h-5 w-5 text-[#0072BC]" />
                                    <a
                                        href="mailto:sales@knksoftinfotech.com"
                                        className="text-[#0072BC] hover:underline transition-colors"
                                    >
                                        sales@knksoftinfotech.com
                                    </a>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">🇺🇸</span>
                                    <a
                                        href="tel:+15128723364"
                                        className="text-gray-600 hover:text-[#0072BC]"
                                    >
                                        +1 (512) 8723364
                                    </a>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">🇦🇪</span>
                                    <a
                                        href="tel:+971507821690"
                                        className="text-gray-600 hover:text-[#0072BC]"
                                    >
                                        +971 (0) 507821690
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:pl-8">
                        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                Let&apos;s Get to know you
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Form fields with enhanced styling */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, fullName: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC] transition-all duration-200"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Business Email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent"
                                    />
                                </div>

                                <div className="flex space-x-2">
                                    <select
                                        className="w-[100px] px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent"
                                        onChange={(e) =>
                                            setFormData({ ...formData, countryCode: e.target.value })
                                        }
                                        defaultValue="+91"
                                    >
                                        <option value="+91">🇮🇳 +91</option>
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+971">🇦🇪 +971</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent"
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder="Company (or project) Name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent"
                                        onChange={(e) =>
                                            setFormData({ ...formData, companyName: e.target.value })
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="Company Size"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent"
                                        onChange={(e) =>
                                            setFormData({ ...formData, companySize: e.target.value })
                                        }
                                    />
                                </div>

                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent"
                                    onChange={(e) =>
                                        setFormData({ ...formData, jobTitle: e.target.value })
                                    }
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Job Title
                                    </option>
                                    <option value="entrepreneur">Enterprenuer</option>
                                    <option value="manager">Manager</option>
                                    <option value="director">Director</option>
                                    <option value="c-level">C-Level</option>
                                    <option value="student">Student</option>
                                    <option value="other">Other</option>
                                </select>

                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent"
                                    onChange={(e) =>
                                        setFormData({ ...formData, launchTime: e.target.value })
                                    }
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        When do you want to launch a solution?
                                    </option>
                                    <option value="immediately">Immediately</option>
                                    <option value="1month">Within 1 month</option>
                                    <option value="3months">Within 3 months</option>
                                    <option value="6months">Within 6 months</option>
                                </select>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-medium text-gray-700">
                                        <span>Budget</span>
                                        <span className="text-[#0072BC]">
                                            ${budget.toLocaleString()}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="50000"
                                        step="1000"
                                        value={budget}
                                        onChange={handleBudgetChange}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0072BC]"
                                    />
                                </div>

                                <textarea
                                    placeholder="About Project"
                                    className="w-full min-h-[120px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent resize-y"
                                    onChange={(e) =>
                                        setFormData({ ...formData, about: e.target.value })
                                    }
                                />

                                <Button
                                    variant="primary"
                                    type="submit"
                                    size={"lg"}
                                    disabled={isSubmitting}
                                    rightIcon={<ArrowRightIcon />}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}