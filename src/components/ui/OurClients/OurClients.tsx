"use client";

import { motion } from "framer-motion";
import { InfiniteMovingCards } from "../infinite-moving-cards";
import { PARTNERS_DATA } from "./constants";
import TextWithLines from "../TextWithLines";
export const OurClients = () => {
  // Memoize the motion component props
  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 },
  } as const;

  // Memoize the shared card props
  const cardBaseProps = {
    speed: "normal",
    className: "opacity-75 hover:opacity-100 transition-opacity duration-300",
  } as const;

  return (
    <section className="py-10 lg:py-20 bg-primary/5 overflow-hidden">
      <div className="container">
        <motion.div {...motionProps} className="text-center mb-16">
          <TextWithLines text="Our Clients" className="mb-4" />
          <h2 className="title">
            Our&nbsp;
            <span className="text-primary mt-2">Clients</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-light max-w-2xl mx-auto">
            Our portfolio holds the work of some of the most reputed enterprise
            & startup brands. All it is missing is YOU!
          </p>
        </motion.div>

        <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <InfiniteMovingCards
            items={[...PARTNERS_DATA.left, ...PARTNERS_DATA.left, ...PARTNERS_DATA.left, ...PARTNERS_DATA.left]}
            direction="left"
            {...cardBaseProps}
          />
          <InfiniteMovingCards
            items={[...PARTNERS_DATA.right, ...PARTNERS_DATA.right, ...PARTNERS_DATA.right, ...PARTNERS_DATA.right]}
            direction="right"
            {...cardBaseProps}
          />
        </div>
      </div>
    </section>
  );
};