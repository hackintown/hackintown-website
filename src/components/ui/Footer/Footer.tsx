"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [subscribed, setSubscribed] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000); // Reset after 3s
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-sidebar py-12 text-sidebar-foreground">
            {/* Background Gradient Overlay (Futuristic Effect) */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-secondary/20 opacity-50 pointer-events-none" />

            {/* Main Footer Container */}
            <div className="container relative z-10 grid grid-cols-1 gap-8 md:grid-cols-4">
                {/* Company Info Section */}
                <div className="space-y-4">
                    <h3 className="text-xl lg:text-3xl font-semibold text-primary">Hackintown</h3>
                    <p className="text-sm text-muted-foreground">
                        Pioneering IT solutions for a connected world. Innovate with us.
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="group text-accent transition-all duration-300 hover:text-accent/80"
                        >   
                            <FaTwitter className="h-6 w-6 transform transition-transform group-hover:scale-110" />
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="group text-accent transition-all duration-300 hover:text-accent/80"
                        >
                            <FaLinkedin className="h-6 w-6 transform transition-transform group-hover:scale-110" />
                        </Link>
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="group text-accent transition-all duration-300 hover:text-accent/80"
                        >
                            <FaGithub className="h-6 w-6 transform transition-transform group-hover:scale-110" />
                        </Link>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-foreground/80">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/about"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/services"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/careers"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Services Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-foreground/80">Our Services</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/services/cloud"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Cloud Solutions
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/services/ai"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                AI & Machine Learning
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/services/devops"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                DevOps
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/services/cybersecurity"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Cybersecurity
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Newsletter Signup Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-foreground/80">Stay Updated</h4>
                    <p className="text-sm text-muted-foreground">
                        Subscribe to our newsletter for the latest tech insights.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="rounded-md border border-input bg-background/95 px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                        >
                            Subscribe
                        </button>
                    </form>
                    {subscribed && (
                        <p className="text-sm text-success animate-fade-in">
                            Thanks for subscribing!
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="container mt-8 border-t border-sidebar-border pt-6 text-center text-sm text-muted-foreground">
                <p>
                    &copy; {currentYear} TechNova. All rights reserved. |{" "}
                    <Link href="/privacy" className="hover:text-primary">
                        Privacy Policy
                    </Link>{" "}
                    |{" "}
                    <Link href="/terms" className="hover:text-primary">
                        Terms of Service
                    </Link>
                </p>
            </div>

            {/* Floating Tech Orb (Decorative Element) */}
            <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-br from-highlight to-primary/50 opacity-20 blur-3xl md:h-64 md:w-64" />
        </footer>
    );
};

export default Footer;