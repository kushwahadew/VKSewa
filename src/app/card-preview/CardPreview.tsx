"use client";

import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCardsStore } from "@/app/store/cards";
import FeatureCard from "@/app/components/FeatureCard";

export default function CardPreview() {
  const params = useSearchParams();
  const id = params.get("id") || "";
  const { cards, fetchCards, loading } = useCardsStore();

  useEffect(() => {
    if (cards.length === 0 && !loading) {
      fetchCards();
    }
  }, [cards.length, fetchCards, loading]);

  const card = useMemo(() => cards.find(c => c.id === id) || cards[0], [cards, id]);

  if (loading && cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[540px]">
        <div className="w-8 h-8 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="p-4 bg-transparent min-h-[540px]">
      <FeatureCard index={card.order || 1} title={card.title} subtitle={card.subtitle} gradient={card.gradient} link={card.link} image={card.image} badges={card.badges} />
    </div>
  );
}
