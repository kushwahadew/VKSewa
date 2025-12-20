"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCardsStore } from "../store/cards";
import FeatureCard from "../components/FeatureCard";

export default function CardPreview(){
  const params = useSearchParams();
  const id = params.get("id") || "";
  const { cards } = useCardsStore();
  const card = useMemo(()=> cards.find(c=>c.id===id) || cards[0], [cards, id]);
  if (!card) return null;
  return (
    <div className="p-4 bg-transparent min-h-[540px]">
      <FeatureCard index={card.order || 1} title={card.title} subtitle={card.subtitle} gradient={card.gradient} link={card.link} image={card.image} badges={card.badges} />
    </div>
  );
}
