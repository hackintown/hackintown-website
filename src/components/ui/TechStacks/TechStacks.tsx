"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { techStacks } from "./constant";
import TextWithLines from "../TextWithLines";
const TechStackTabs = () => {


    const [activeTab, setActiveTab] = useState(techStacks[0]);
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-8 lg:mb-16 flex flex-col items-center justify-center"
                >
                    <TextWithLines text="Tech Stack" className="mb-4" />
                    <h2 className="title">
                        Tech Stack&nbsp;
                        <span className="text-primary">We Use</span>
                    </h2>
                    <p className="sub-title">
                        We use the latest technology and industry expertise to build top-end
                        Android and iOS-based applications that add value to the business and
                        user experience.
                    </p>
                </motion.div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 w-fit mx-auto">
                    {techStacks.map((tab) => (
                        <button
                            key={tab.name}
                            onMouseEnter={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-base lg:text-lg font-medium transition-all duration-300 relative group ${activeTab.name === tab.name
                                ? "text-primary"
                                : "text-foreground/70 hover:text-primary"
                                }`}
                        >
                            {tab.name}
                            {/* Active/Hover indicator */}
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform transition-all duration-300 ${activeTab.name === tab.name
                                    ? "scale-x-100"
                                    : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl p-4 md:p-6 lg:p-8 bg-card/50 backdrop-blur-sm shadow-sm border border-border overflow-hidden"
                >
                    <div
                        className="relative w-full"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Main scroll container */}
                        <div className="relative w-full overflow-hidden py-4">
                            <div className={`flex gap-8 min-w-full ${isPaused ? 'pause-animation' : 'animate-scroll-left'}`}>
                                {activeTab.content.concat(activeTab.content).map((item, index) => (
                                    <motion.div
                                        key={`scroll-${index}`}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="flex flex-col items-center text-center min-w-[130px] max-w-[160px] p-4 flex-shrink-0"
                                    >
                                        <div className="w-24 h-24 p-4 bg-background rounded-lg shadow-md border border-border/80 flex items-center justify-center hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                                            <Image
                                                src={item.icon}
                                                alt={item.name}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="mt-4 text-sm font-medium text-foreground">{item.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStackTabs;