"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame, useSpring } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Card } from "../store/cards";

export const InfiniteCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: Card[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // We use 3 sets of items to ensure there's always content visible while dragging and looping
  const duplicatedItems = useMemo(() => [...items, ...items, ...items], [items]);

  const x = useMotionValue(0);

  // Calculate duration based on speed
  const getDuration = () => {
    switch (speed) {
      case "fast": return 60;
      case "normal": return 120;
      case "slow": return 300; // 5 minutes for a full loop - very slow!
      default: return 120;
    }
  };

  const duration = getDuration();

  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      clearResumeTimeout();
      resumeTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 5000);
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      clearResumeTimeout();
      setIsPaused(true);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    clearResumeTimeout();
    setIsPaused(true);
  };

  useEffect(() => {
    return () => clearResumeTimeout();
  }, []);

  useAnimationFrame((t, delta) => {
    if (isPaused || isDragging || !scrollerRef.current) return;

    const totalWidth = scrollerRef.current.scrollWidth;
    const oneSetWidth = totalWidth / 3;

    // Pixel speed (pixels per millisecond)
    // We want to cover 'oneSetWidth' in 'duration' seconds
    const pixelSpeed = oneSetWidth / (duration * 1000);
    const moveBy = delta * pixelSpeed;

    let currentX = x.get();

    if (direction === "left") {
      currentX -= moveBy;
    } else {
      currentX += moveBy;
    }

    // Infinite loop logic:
    // If we go past the end of the middle set, snap back/forward
    if (currentX <= -oneSetWidth * 2) {
      currentX += oneSetWidth;
    } else if (currentX >= -oneSetWidth) {
      // Keep it centered in the middle set if possible
      // Actually, for right scroll, we snap if we go too far right
      if (currentX >= 0) {
        currentX -= oneSetWidth;
      }
    }

    x.set(currentX);
  });

  // Handle initial positioning to start in the middle set
  useEffect(() => {
    if (scrollerRef.current) {
      const oneSetWidth = scrollerRef.current.scrollWidth / 3;
      x.set(-oneSetWidth);
    }
  }, [items, x]);

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 w-screen max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        drag="x"
        style={{ x }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // Allow free dragging, we handle the loop in useAnimationFrame
        dragConstraints={{ left: -10000, right: 10000 }}
        ref={scrollerRef}
        className="flex gap-8 py-6 w-max flex-nowrap"
      >
        {duplicatedItems.map((item, idx) => (
          <FeatureCard
            key={`${item.id}-${idx}`}
            index={(idx % items.length) + 1}
            title={item.title}
            subtitle={item.subtitle}
            gradient={item.gradient}
            link={item.link}
            image={item.image}
            badges={item.badges}
            className="min-w-[280px] sm:min-w-[50vw] md:min-w-[40vw] lg:min-w-[30vw] xl:min-w-[25vw] max-w-[92vw] relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-0 py-0"
          />
        ))}
      </motion.div>
    </div>
  );
};
