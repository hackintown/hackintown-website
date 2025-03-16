"use client";
import { Clock, Facebook, Instagram, Twitter } from "lucide-react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImPower } from "react-icons/im";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function TopNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Initial time set
    setCurrentTime(new Date().toLocaleString());

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Optimize scroll handling for better performance
    const controlNavbar = () => {
      // Hide TopNav when scrolling down past threshold, show when scrolling up
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    // Use passive event listener for better scroll performance
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: "cubic-bezier(0.45, 0, 0.55, 1)", // Smooth easing
  };

  // Trending items - IT company focused content
  const trendingItems = [
    "Hackintown launches new AI-powered development platform",
    "Join our upcoming webinar on cloud infrastructure optimization",
    "New client case study: 300% performance improvement with our solutions",
  ];

  // Social media hover animations
  const socialIconVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={cn(
        "bg-background/95 backdrop-blur-sm border-b border-border/20 transition-all duration-300 ease-in-out",
        !isVisible && "-translate-y-full"
      )}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex flex-col md:flex-row items-center justify-between py-2">
        {/* Left: Trending label + slider */}
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ImPower className="size-3 sm:size-4 text-primary" />
          </motion.div>
          <span className="bg-primary text-primary-foreground text-xs sm:text-sm px-2 py-1 rounded font-medium">
            Trending
          </span>
          <div className="w-64 md:w-96 overflow-hidden">
            <Slider {...settings}>
              {trendingItems.map((item, idx) => (
                <div key={idx}>
                  <p className="text-xs sm:text-sm truncate text-foreground/80 hover:text-foreground cursor-pointer transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Right: date/time + social icons */}
        <div className="flex items-center text-xs sm:text-sm space-x-4">
          <div className="flex items-center bg-muted/50 px-2 py-1 rounded">
            <Clock size={16} className="mr-1 text-primary" />
            <span className="text-foreground/80">{currentTime}</span>
          </div>

          {/* Social icons with enhanced animations */}
          <motion.div
            whileHover="hover"
            variants={socialIconVariants}
            className="cursor-pointer text-blue-600 hover:text-primary transition-colors"
          >
            <Facebook className="size-4 sm:size-5 text-foreground/80" />
          </motion.div>
          <motion.div
            whileHover="hover"
            variants={socialIconVariants}
            className="cursor-pointer text-sky-400 hover:text-primary transition-colors"
          >
            <Twitter className="size-4 sm:size-5 text-foreground/80" />
          </motion.div>
          <motion.div
            whileHover="hover"
            variants={socialIconVariants}
            className="cursor-pointer text-pink-500 hover:text-primary transition-colors"
          >
            <Instagram className="size-4 sm:size-5 text-foreground/80" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
