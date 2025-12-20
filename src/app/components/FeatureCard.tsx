"use client";

import React from "react";

type Props = {
  index?: number;
  title: string;
  subtitle: string;
  icon?: string;
  gradient: string;
  link: string;
  image?: string;
  badges?: string[];
  className?: string;
};

const FeatureCard = ({ index, title, subtitle, gradient, link, image, badges = [], className = "" }: Props) => {
  const handleClick = () => {
    window.location.href = link;
  };

  return (
    <div className={`group flex flex-col site-card rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_10px_30px_-12px_rgba(16,185,129,0.12)] transition-all duration-500 ${className}`}>
      {/* Header image with gradient fallback */}
      <div className="h-56 w-full relative flex items-center justify-center overflow-hidden bg-card">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
        )}

        {/* Number bubble */}
        {typeof index !== "undefined" && (
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="text-6xl font-black text-muted group-hover:text-foreground transition-colors duration-500 italic">
              {String(index).padStart(2, "0")}
            </div>
          </div>
        )}

        {/* Shine overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <h4 className="text-xl md:text-2xl font-black text-foreground tracking-tight text-center mb-4 group-hover:text-foreground transition-colors duration-300">
          {title}
        </h4>
        
        <div className="space-y-2 mb-6 flex-1">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted group-hover:text-foreground transition-colors">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-from)' }} />
              {b}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button onClick={handleClick} className="w-full py-4 rounded-2xl btn-gradient font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
            VISIT PLATFORM
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            {['USER', 'STAFF', 'ADMIN'].map((role) => (
              <button 
                key={role}
                className="py-2.5 rounded-xl bg-transparent border border-card text-[10px] font-bold text-muted hover:bg-card hover:text-foreground transition-all"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;