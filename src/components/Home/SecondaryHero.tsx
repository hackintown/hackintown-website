"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

interface ISecondaryHero {
    _id: string;
    tagline: string;
    title: string;
    description: string;
    imageUrl: string;
    ctaLabel: string;
    ctaLink: string;
    phoneNumber: string;
    phoneText: string;
    stats: Array<{ value: string; label: string }>;
    createdAt: string;
    updatedAt: string;
}

export default function SecondaryHero() {

    const [heroData, setHeroData] = useState<ISecondaryHero | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Fetch hero data
    const fetchHeroData = useCallback(async () => {
        try {
            console.log("Fetching secondary hero data...");
            const response = await fetch("/api/secondary-hero");
            console.log("Response status:", response.status);

            if (!response.ok) {
                console.error("Failed to fetch secondary hero data:", response.statusText);
                throw new Error("Failed to fetch secondary hero data");
            }

            const data = await response.json();
            console.log("Received data:", data);

            // Check if data has the expected structure
            if (!data || typeof data !== 'object') {
                console.error("Invalid data format received:", data);
                setIsLoading(false);
                return;
            }

            // Ensure stats is an array
            if (!Array.isArray(data.stats)) {
                data.stats = [];
            }

            setHeroData(data);
            setIsLoading(false);

            // Manually trigger the animation after data is loaded
            if (isInView) {
                controls.start("visible");
            }
        } catch (error) {
            console.error("Error fetching secondary hero data:", error);
            setIsLoading(false);
        }
    }, [controls, isInView]);

    useEffect(() => {
        fetchHeroData();
    }, [fetchHeroData]);

    useEffect(() => {
        if (isInView && !isLoading && heroData) {
            // Force animation to start when component is in view and data is loaded
            controls.start("visible");
        }
    }, [controls, isInView, isLoading, heroData]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    // If still loading or no data, show a minimal placeholder
    if (isLoading) {
        return (
            <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 xl:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse flex flex-col lg:flex-row lg:items-center">
                        <div className="w-full lg:w-1/2 z-10 space-y-4">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        </div>
                        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 h-[400px]">
                            <div className="h-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // If no data was found, don't render anything
    if (!heroData) {
        return null;
    }

    return (
        <section
            id="home"
            className="relative overflow-hidden py-16 md:py-20 lg:py-24 xl:py-32"
            ref={ref}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    animate={controls}
                    className="flex flex-col lg:flex-row lg:items-center"
                >
                    {/* Left Content */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-1/2 z-10"
                    >
                        <motion.span
                            variants={itemVariants}
                            className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary"
                        >
                            {heroData.tagline}
                        </motion.span>

                        <motion.h1
                            variants={itemVariants}
                            className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                        >
                            {heroData.title}
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mb-8 text-base md:text-lg text-foreground/80 max-w-xl font-poppins"
                        >
                            {heroData.description}
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                className=""
                                rightIcon={<IoIosArrowForward />}
                            >
                                {heroData.ctaLabel}
                            </Button>

                            <div className="flex flex-col">
                                <Link
                                    href="#"
                                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Call us {heroData.phoneNumber}
                                </Link>
                                <span className="text-sm text-muted-foreground">
                                    {heroData.phoneText}
                                </span>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6"
                        >
                            {heroData.stats.map((stat, index) => (
                                <div key={index} className="flex flex-col">
                                    <span className="text-2xl md:text-3xl font-bold text-primary">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Image and Shapes */}
                    <div className="relative w-full lg:w-1/2 mt-12 lg:mt-0 h-[400px] md:h-[500px] lg:h-[600px]">
                        {/* Background Shapes */}
                        <div className="absolute right-0 top-0 w-full h-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute right-0 top-0 w-full h-full"
                            >
                                <div className="absolute -left-10 top-1/4 w-24 h-24 rounded-full bg-primary/10 blur-xl"></div>
                                <div className="absolute right-1/4 bottom-1/4 w-32 h-32 rounded-full bg-secondary/10 blur-xl"></div>
                                <div className="absolute right-10 top-10 w-16 h-16 rounded-full bg-accent/10 blur-lg"></div>
                            </motion.div>

                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="relative z-10 h-full"
                            >
                                <div className="relative h-full w-full">
                                    <Image
                                        src={heroData.imageUrl}
                                        alt="Hero Image"
                                        fill
                                        className="object-contain object-center"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                <div className="absolute -left-10 top-1/3 hidden lg:block">
                                    <div className="w-16 h-16 border-2 border-primary/30 rounded-lg rotate-12"></div>
                                </div>
                                <div className="absolute right-1/4 bottom-1/4 hidden lg:block">
                                    <div className="w-8 h-8 bg-secondary/20 rounded-full"></div>
                                </div>
                                <div className="absolute right-10 top-1/4 hidden lg:block">
                                    <div className="w-12 h-12 border-2 border-accent/30 rounded-full"></div>
                                </div>
                            </motion.div>

                            {/* Floating Cards */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="absolute left-0 top-1/4 hidden md:block z-10"
                            >
                                <div className="bg-card p-4 rounded-lg shadow-lg w-48">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="text-primary text-lg">✓</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">TypeScript Ready</p>
                                            <p className="text-xs text-muted-foreground">Full type safety</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 }}
                                className="absolute right-0 bottom-1/3 hidden md:block z-10"
                            >
                                <div className="bg-card p-4 rounded-lg shadow-lg w-48">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                            <span className="text-secondary text-lg">⚡</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Next.js 15</p>
                                            <p className="text-xs text-muted-foreground">Server components</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 right-0 -z-10 opacity-50 dark:opacity-30">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.2">
                        <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
                    </g>
                    <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
                            <stop stopColor="var(--color-primary)" />
                            <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            <div className="absolute bottom-0 left-0 -z-10 opacity-50 dark:opacity-30">
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.2">
                        <circle cx="150" cy="150" r="150" fill="url(#paint1_radial)" />
                    </g>
                    <defs>
                        <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(150 150) rotate(90) scale(150)">
                            <stop stopColor="var(--color-secondary)" />
                            <stop offset="1" stopColor="var(--color-secondary)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
}
