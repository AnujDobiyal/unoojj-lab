"use client";

import { Container } from "@/components/container";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

const TypeWritterEffect = () => {
  //examples lines to test the effects
  const examples = [
    "This Typewritter effect is so COOL!!!",
    "Smooth text animation best for Portfolio Websites;",
    "I should Impliment it somewhere, But Where???",
  ];

  //which example we are showing currently
  const [examplesIndex, setExamplesIndex] = useState(0);

  //delay b/w each letter and total duration of each letter's absolute box
  const LETTER_DELAY = 0.1;
  const BOX_FADE_DURATION = 0.125;

  //delay duration b/w each examples
  const FADE_DELAY = 5;
  const MAIN_FADE_DURATION = 0.25;

  // total duration of each example
  const SWAP_DELAY_IN_MS = 5500;

  useEffect(() => {
    const interval = setInterval(() => {
      setExamplesIndex((prev) => (prev + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="flex w-full bg-white justify-center items-center">
      <h1 className="text-4xl text-neutral-900 font-semibold tracking-tight">
        {/* mapping each letter of example */}
        {examples[examplesIndex].split("").map((l, i) => (
          //Parent span of l span render's each element in dom then fades after FADE_DELAY time
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${examplesIndex}-${i}`}
            className="relative"
          >
            {/* each letter comes one by one */}
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            {/* absolute box for each letter to give the typewritter effect */}
            <motion.span
              initial={{
                display: "none",
              }}
              animate={{
                display: ["none", "block", "none"],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-0.75 left-px right-0 top-0.75 bg-neutral-950 "
            />
          </motion.span>
        ))}
      </h1>
    </Container>
  );
};

export default TypeWritterEffect;
