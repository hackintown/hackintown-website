"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion"; // Added for subtle animations

const Footer: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [subscribed, setSubscribed] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000); // Reset subscription message
        }
    };

    const currentYear = new Date().getFullYear();

    // Animation variants for subtle fade-in effects
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <footer className="relative overflow-hidden bg-background py-12 text-foreground">
            {/* Enhanced Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-70 pointer-events-none" />

            {/* Main Footer Container */}
            <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                {/* Company Info Section */}
                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                        Hackintown
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Empowering innovation with cutting-edge IT solutions for a digital future.
                    </p>
                    <div className="flex space-x-4">
                        {[
                            { href: "https://www.twitter.com/hackintown", Icon: FaTwitter },
                            { href: "https://www.linkedin.com/company/hackintown", Icon: FaLinkedin },
                            { href: "https://www.github.com/hackintown", Icon: FaGithub },
                        ].map(({ href, Icon }, idx) => (
                            <Link
                                key={idx}
                                href={href}
                                target="_blank"
                                className="group text-muted-foreground transition-all duration-300 hover:text-primary"
                            >
                                <Icon className="h-6 w-6 transform transition-transform group-hover:scale-110" />
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Links Section */}
                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: true }}
                >
                    <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {[
                            { href: "/about", label: "About Us" },
                            { href: "/services", label: "Services" },
                            { href: "/careers", label: "Careers" },
                            { href: "/contact", label: "Contact" },
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Services Section */}
                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: true }}
                >
                    <h4 className="text-lg font-semibold text-foreground">Our Services</h4>
                    <ul className="space-y-2 text-sm">
                        {[
                            { href: "/services/cloud", label: "Cloud Solutions" },
                            { href: "/services/ai", label: "AI & Machine Learning" },
                            { href: "/services/devops", label: "DevOps" },
                            { href: "/services/cybersecurity", label: "Cybersecurity" },
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Newsletter Signup Section */}
                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: true }}
                >
                    <h4 className="text-lg font-semibold text-foreground">Stay Updated</h4>
                    <p className="text-sm text-muted-foreground">
                        Join our newsletter for exclusive tech updates.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
                        >
                            Subscribe
                        </button>
                    </form>
                    {subscribed && (
                        <motion.p
                            className="text-sm text-success"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Subscription successful!
                        </motion.p>
                    )}
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto px-4 mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
                <p>
                    © {currentYear} Hackintown. All rights reserved. |{" "}
                    <Link href="/privacy" className="hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>{" "}
                    |{" "}
                    <Link href="/terms" className="hover:text-primary transition-colors">
                        Terms of Service
                    </Link>
                </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/20 blur-3xl md:h-64 md:w-64" />
            <div className="absolute top-0 left-0 h-32 w-32 -translate-x-1/4 -translate-y-1/4 rounded-full bg-highlight/20 blur-3xl md:h-48 md:w-48" />
        </footer>
    );
};

export default Footer;