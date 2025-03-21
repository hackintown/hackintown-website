"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FlipWords } from "../ui/flip-words";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CardSkeleton } from "../ui/skeleton";
import { IoIosArrowForward } from "react-icons/io";

interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  image: string;
}

interface IHeroSlide {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  createdAt: string;
  updatedAt: string;
}

export default function Hero() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flipWordsRef = useRef<{ startAnimation: () => void }>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<IHeroSlide[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Default values for hero content
  const [heroContent, setHeroContent] = useState({
    badge: "Trusted by Global Enterprise Leaders",
    title: "Professional IT Solutions for",
    description: "Comprehensive IT services including custom software development, cloud solutions, enterprise systems, and digital transformation. From MVF development to full-scale enterprise solutions, we deliver excellence.",
    flipWords: [
      "Mobile App Development",
      "Custom Development",
      "Cloud Architecture",
      "Digital Transformation",
      "DevOps Excellence",
    ],
    buttonText: "Talk to an Expert",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hero slides
        const slidesResponse = await fetch("/api/hero-slides");
        if (slidesResponse.ok) {
          const slidesData = await slidesResponse.json();
          setSlides(slidesData);
        }

        // Fetch hero content
        const contentResponse = await fetch("/api/hero");
        if (contentResponse.ok) {
          const contentData = await contentResponse.json();
          setHeroContent(contentData);
        }

        // Fetch team members
        const teamResponse = await fetch("/api/team-members");
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          setTeamMembers(teamData);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //Scroll to Contact Section
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("get-in-touch");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSlideChange = (_: number, next: number) => {
    setCurrentSlide(next);
    setIsAnimating(true);

    setTimeout(() => {
      if (flipWordsRef.current) {
        flipWordsRef.current.startAnimation();
      }
    }, 100);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: handleSlideChange,
    fade: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  // Format team members for AnimatedTooltip component
  const formattedTeamMembers = teamMembers.map((member, index) => ({
    id: index,
    name: member.name,
    designation: member.designation,
    image: member.image,
  }));

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative mx-auto px-4 py-20 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5"
              >
                <span className="text-sm font-medium text-primary">
                  {heroContent.badge}
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight xl:text-[2.5rem]">
                {heroContent.title}
                <span className="inline-block">
                  <FlipWords
                    words={heroContent.flipWords}
                    ref={flipWordsRef}
                    duration={4000}
                    className="text-primary"
                    isAnimating={isAnimating}
                    onAnimationComplete={() => setIsAnimating(false)}
                  />
                </span>
              </h1>

              <p className="max-w-2xl text-base font-thin xl:text-lg text-foreground">
                {heroContent.description}
              </p>
            </div>

            <div>
              <Button
                size="lg"
                variant="primary"
                rightIcon={<IoIosArrowForward />}
                onClick={handleScrollToContact}
              >
                {heroContent.buttonText}
              </Button>
            </div>

            {formattedTeamMembers.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <AnimatedTooltip items={formattedTeamMembers} />
                  <div className="text-xs sm:text-sm text-foreground px-2">
                    Meet our leadership team with
                    <span className="font-semibold text-foreground">
                      20+ years
                    </span>
                    of combined experience
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="w-full relative flex justify-center items-center mt-8 lg:mt-0 mx-auto max-w-[320px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full max-w-2xl relative px-4 sm:px-6 lg:px-0">
              {isLoading ? (
                <CardSkeleton className="w-full h-[300px] rounded-lg" />
              ) : slides.length > 0 ? (
                <>
                  <Slider
                    ref={sliderRef}
                    {...sliderSettings}
                    className="overflow-hidden"
                  >
                    {slides.map((src, index) => (
                      <div key={index} className="relative p-2">
                        <Image
                          src={src.imageUrl}
                          alt={`Slide ${index + 1}`}
                          width={500}
                          height={300}
                          className="w-full h-full transform transition-transform duration-500 max-h-[450px] object-contain"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </Slider>
                  <div className="mt-4 sm:mt-6 flex justify-center items-center gap-1 sm:gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300",
                          currentSlide === index
                            ? "bg-primary w-4 sm:w-6"
                            : "bg-primary/20"
                        )}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">No slides available</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}