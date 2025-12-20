"use client";

import React, { useEffect, useState, useRef } from "react";
import FeatureCard from "./FeatureCard";
import { Card } from "../store/cards";

export const InfiniteCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Card[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      // make the scroller full-bleed so cards can span the viewport
      className={`scroller relative z-20 w-screen max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}
    >
      <div
        ref={scrollerRef}
        // remove min-w-full on the inner wrapper so items line up horizontally
        className={`flex gap-8 py-6 w-max flex-nowrap ${start ? "animate-scroll" : ""} ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
      >
        {items.map((item, idx) => (
          <FeatureCard
            key={item.id + idx}
            index={idx + 1}
            title={item.title}
            subtitle={item.subtitle}
            gradient={item.gradient}
            link={item.link}
            image={item.image}
            badges={item.badges}
            // use responsive min-widths (viewport-based) so cards fill the screen
            className="min-w-[280px] sm:min-w-[40vw] md:min-w-[33vw] lg:min-w-[28vw] max-w-[92vw] relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-0 py-0"
          />
        ))}
      </div>
    </div>
  );
};
