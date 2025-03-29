"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Phone, Clock, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { NAVIGATION_MENUS } from "../Navbar/constants";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

/**
 * ContactSection Component
 * Renders a contact form with company information and handles form submissions
 * @returns JSX.Element
 */

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessEmail: "",
    companyName: "",
    interestedServices: "",
    launchTimeline: "",
    budget: 5000,
    aboutProject: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/getintouch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessEmail: "",
        companyName: "",
        interestedServices: "",
        launchTimeline: "",
        budget: 5000,
        aboutProject: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getServices = () => {
    const servicesMenu = NAVIGATION_MENUS.find(
      (menu) => menu.name === "Services"
    );
    return servicesMenu?.subMenu || [];
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
                <span className="text-primary block text-4xl sm:text-5xl md:text-6xl font-extrabold">
                  Our
                  <br />
                  Experts
                </span>
              </h2>
              <p className="text-muted-foreground">
                Have questions about your hearing health? Our expert
                audiologists are here to help. Contact us today to schedule a
                consultation or learn more about our services.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Visit Us</h3>
                  <p className="text-muted-foreground text-sm">
                    B-220, 1st Floor,
                    <br />
                    <span className="text-muted-foreground text-sm">
                      New Ashok Nagar,
                    </span>
                    <br />
                    <span className="text-muted-foreground text-sm">
                      New Delhi, INDIA - 110096
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Call Us</h3>
                  <Link
                    href="tel:+919810230650"
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    +91 98102-30650
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email Us</h3>
                  <Link
                    href="mailto:hackintowntech@gmail.com"
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    hackintowntech@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Working Hours
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Mon - Fri: 9:00 AM - 7:00 PM
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Saturday: Closed
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border bg-card p-6 shadow-lg md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    required
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Company (or project) Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    What service(s) are you interested in? *
                  </label>
                  <select
                    name="interestedServices"
                    required
                    value={formData.interestedServices}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select a service</option>
                    {getServices().map((service) => (
                      <option key={service.href} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  When do you want to launch a solution? *
                </label>
                <select
                  name="launchTimeline"
                  required
                  value={formData.launchTimeline}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6+months">6+ months</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Budget *
                </label>
                <div className="mt-2 space-y-2">
                  <Progress
                    value={(formData.budget / 50000) * 100}
                    className="h-2"
                  />
                  <input
                    type="range"
                    name="budget"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${formData.budget.toLocaleString()}</span>
                    <span>$50,000</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  About Project
                </label>
                <textarea
                  name="aboutProject"
                  value={formData.aboutProject}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
