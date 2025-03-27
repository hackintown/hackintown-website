"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRightIcon } from 'lucide-react';
import { FaServer, FaShieldAlt, FaCode, FaUserCog } from 'react-icons/fa';
import TextWithLines from '../ui/TextWithLines';

const WhyChooseUs: React.FC = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    React.useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

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

    const features = [
        {
            icon: <FaServer className="w-6 h-6" />,
            title: "Enterprise Infrastructure",
            description: "Scalable and secure infrastructure solutions designed for business growth and operational efficiency."
        },
        {
            icon: <FaShieldAlt className="w-6 h-6" />,
            title: "Advanced Cybersecurity",
            description: "Comprehensive protection against evolving threats with proactive monitoring and rapid incident response."
        },
        {
            icon: <FaCode className="w-6 h-6" />,
            title: "Custom Software Development",
            description: "Tailored applications built with cutting-edge technologies to address your unique business challenges."
        },
        {
            icon: <FaUserCog className="w-6 h-6" />,
            title: "24/7 Technical Support",
            description: "Round-the-clock expert assistance ensuring minimal downtime and maximum productivity."
        }
    ];

    return (
        <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background to-background/50" ref={ref}>
            <div className="container mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="flex flex-col md:flex-row items-center gap-12 xl:gap-20"
                >
                    {/* Left Image Section - Hidden on mobile */}
                    <motion.div
                        variants={itemVariants}
                        className="hidden md:block md:w-1/2 relative"
                    >
                        <div className="relative z-10 grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                    <Image
                                        src="https://base.demo.nextjstemplates.com/_next/image?url=%2Fimages%2Fabout%2Fabout-01.png&w=384&q=75"
                                        alt="Server Infrastructure"
                                        width={290}
                                        height={343}
                                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-primary/30 to-transparent"></div>
                                </div>
                                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                    <Image
                                        src="https://base.demo.nextjstemplates.com/_next/image?url=%2Fimages%2Fabout%2Fabout-02.png&w=384&q=75"
                                        alt="Software Development"
                                        width={290}
                                        height={343}
                                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                                </div>
                            </div>
                            <div className="space-y-6 mt-12">
                                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                    <Image
                                        src="https://base.demo.nextjstemplates.com/_next/image?url=%2Fimages%2Fabout%2Fabout-03.png&w=384&q=75"
                                        alt="Cybersecurity"
                                        width={290}
                                        height={485}
                                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-highlight/20 mix-blend-overlay"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-highlight/30 to-transparent"></div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced decorative elements */}
                        <div className="absolute -left-10 top-1/4 w-24 h-24 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
                        <div className="absolute right-1/4 bottom-1/4 w-32 h-32 rounded-full bg-secondary/20 blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                        <div className="absolute -z-10 -left-4 top-1/3">
                            <div className="w-16 h-16 border-2 border-primary/40 rounded-lg rotate-12 animate-rotating"></div>
                        </div>
                        <div className="absolute -z-10 right-10 bottom-20">
                            <div className="w-12 h-12 border-2 border-highlight/40 rounded-full animate-rotating" style={{ animationDuration: "15s" }}></div>
                        </div>

                        {/* Additional tech-themed decorative elements */}
                        <div className="absolute -z-10 left-1/4 bottom-10">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/40 animate-pulse" style={{ animationDuration: "3s" }}>
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="absolute -z-10 right-1/3 top-10">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary/40">
                                <path d="M20 4L12 12M12 12L4 20M12 12L20 20M12 12L4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Circuit-like pattern */}
                        <div className="absolute -z-20 left-0 top-0 w-full h-full opacity-10">
                            <div className="absolute left-1/4 top-1/4 w-32 h-[1px] bg-primary rotate-45"></div>
                            <div className="absolute left-1/3 top-1/2 w-24 h-[1px] bg-secondary -rotate-30"></div>
                            <div className="absolute right-1/4 bottom-1/3 w-40 h-[1px] bg-highlight rotate-15"></div>
                            <div className="absolute left-10 bottom-20 w-3 h-3 rounded-full border border-primary/50"></div>
                            <div className="absolute right-20 top-40 w-2 h-2 rounded-full bg-secondary/50"></div>
                        </div>
                    </motion.div>

                    {/* Right Content Section */}
                    <motion.div
                        variants={itemVariants}
                        className="md:w-1/2"
                    >

                        <TextWithLines text="Why Choose Us" className='mb-4' />
                        <motion.h2
                            variants={itemVariants}
                            className="mb-6 text-3xl font-bold text-foreground lg:text-4xl xl:text-5xl leading-tight"
                        >
                            Enterprise IT Solutions <br className="hidden md:block" />
                            <span className="text-primary">Tailored for Your Success</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-muted-foreground mb-10"
                        >
                            With over 15 years of industry experience, we deliver cutting-edge IT solutions that drive business growth and operational excellence. Our team of certified experts ensures your technology infrastructure is secure, scalable, and aligned with your strategic objectives.
                        </motion.p>

                        {/* Features Grid */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex flex-col p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                        >
                            <Link
                                href="/services"
                                passHref
                            >
                                <Button variant="primary" size="lg" className="group" rightIcon={
                                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                }>
                                    EXPLORE OUR SERVICES
                                </Button>
                            </Link>

                            <Link
                                href="/contact"
                                passHref
                            >
                                <Button variant="outline" size="lg">
                                    SCHEDULE A CONSULTATION
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Elements - Enhanced */}
            <div className="absolute top-0 right-0 -z-10 opacity-30 dark:opacity-20">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.2">
                        <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
                    </g>
                    <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
                            <stop stopColor="var(--color-primary)" />
                            <stop offset="0.5" stopColor="var(--color-secondary)" />
                            <stop offset="1" stopColor="var(--color-highlight)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            {/* Additional tech-themed background elements */}
            <div className="absolute bottom-0 left-0 -z-10 opacity-20 dark:opacity-10">
                <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,50 L90,50" stroke="var(--color-primary)" strokeWidth="0.5" />
                    <path d="M50,10 L50,90" stroke="var(--color-secondary)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="40" stroke="var(--color-highlight)" strokeWidth="0.5" strokeDasharray="5,5" />
                    <circle cx="50" cy="50" r="20" stroke="var(--color-primary)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="5" fill="var(--color-secondary)" opacity="0.5" />
                </svg>
            </div>
        </section>
    );
};

export default WhyChooseUs;