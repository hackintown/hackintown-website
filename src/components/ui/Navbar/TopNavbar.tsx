"use client";
import { Facebook, Instagram, Twitter, Phone, Calendar } from "lucide-react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function TopNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Handle scroll event
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide TopNavbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
  };

  // Updated clinic information items with hearing-specific content
  const clinicInfoItems = [
    "Hearing emergency? Call us at (555) 123-4567",
    "Free hearing assessments for new patients",
    "Same-day hearing aid repairs available",
    "Specialized tinnitus management services",
    "Accepting most insurance plans for hearing care"
  ];

  return (
    <div className={cn(
      "bg-primary  shadow-md transition-transform duration-300 text-foreground/90 fixed w-full top-0 z-[60] py-2",
      !isVisible && "-translate-y-full"
    )}>
      {/* Mobile View */}
      <div className="md:hidden container">
        <div className="flex justify-between items-center">
          <Link href="tel:+918851967714" className="flex items-center text-sm ">
            <Phone size={14} className="mr-1 text-primary-foreground" />
            <span className="font-medium text-primary-foreground font-poppins">+91 8851967714</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/appointment" className="flex items-center text-sm">
              <Calendar size={14} className="mr-1 text-primary-foreground" />
              <span className="font-medium text-primary-foreground font-poppins">Book</span>
            </Link>
            <SocialIcons className="gap-2 text-primary-foreground" iconSize={14} />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block container">
        <div className="flex items-center justify-between">
          {/* Left: Clinic info slider */}
          <div className="flex items-center gap-3">
            <div className="w-96 md:w-72 lg:w-96">
              <Slider {...settings}>
                {clinicInfoItems.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-sm md:text-xs lg:text-sm text-primary-foreground font-light font-poppins">
                      {item}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Right: Contact & Social */}
          <div className="flex items-center gap-6">
            <Link href="/appointment"
              className="flex items-center hover:text-primary-foreground  transition-colors">
              <Calendar size={16} className="mr-1 text-primary-foreground" />
              <span className=" text-sm md:text-xs lg:text-sm text-primary-foreground font-poppins">Book Appointment</span>
            </Link>
            <Link href="tel:+918851967714"
              className="flex items-center hover:text-primary-foreground transition-colors">
              <Phone size={16} className="mr-1 text-primary-foreground" />
              <span className=" text-sm md:text-xs lg:text-sm text-primary-foreground font-poppins">+91 8851967714</span>
            </Link>
            <SocialIcons className="gap-3" iconSize={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Extracted Social Icons component for reusability
const SocialIcons = ({ className = "", iconSize = 16 }) => (
  <div className={cn("flex items-center", className)}>
    {[
      { Icon: Facebook, href: "https://facebook.com" },
      { Icon: Twitter, href: "https://twitter.com" },
      { Icon: Instagram, href: "https://instagram.com" }
    ].map(({ Icon, href }) => (
      <Link key={href} href={href} target="_blank" rel="noopener noreferrer">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
        >
          <Icon size={iconSize} />
        </motion.div>
      </Link>
    ))}
  </div>
);
