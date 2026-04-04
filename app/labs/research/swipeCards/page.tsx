"use client";

import { Container } from "@/components/container";
import { motion, useMotionValue, useTransform } from "motion/react";
import React, { Dispatch, SetStateAction, useState } from "react";

const SwipeCardsPage = () => {
  const [cards, setCards] = useState<Card[]>(cardData);

  return (
    <Container className="grid place-items-center">
      {cards.map((card) => {
        return (
          <Card key={card.id} cards={cards} setCards={setCards} card={card} />
        );
      })}
    </Container>
  );
};

export default SwipeCardsPage;

const Card = ({
  card,
  cards,
  setCards,
}: {
  card: Card;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = card.id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : card.id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setCards((pv) => pv.filter((v) => v.id !== card.id));
      console.log(cards);
    }
  };

  return (
    <motion.div
      className={`${card.cardColor} h-96 w-72 rounded-lg hover:cursor-grab active:cursor-grabbing origin-bottom z-0`}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.44s transform",
        boxShadow: isFront ? "var(--shadow-lg)" : undefined
      }}
      animate={{
        scale: isFront ? 1: 0.98,
      }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

type Card = {
  id: number;
  cardColor: string;
};

const cardData: Card[] = [
  {
    id: 1,
    cardColor: "bg-white",
  },
  {
    id: 2,
    cardColor: "bg-blue-500",
  },
  {
    id: 3,
    cardColor: "bg-red-500",
  },
  {
    id: 4,
    cardColor: "bg-green-500",
  },
  {
    id: 5,
    cardColor: "bg-amber-500",
  },
  {
    id: 6,
    cardColor: "bg-cyan-500",
  },
  {
    id: 7,
    cardColor: "bg-pink-500",
  },
];
