"use client";

import { Container } from "@/components/container";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

const SvgAnimationPage = () => {
  return (
    <div>
      <div className="bg-black h-screen flex justify-center items-center" >
        <h2 className="text-7xl tracking-wide text-neutral-500">
          Scroll Down 
        </h2>
      </div>
      <Container className="bg-green-900 max-w-screen flex items-center justify-center">
        <h1 className="text-6xl max-w-2xl font-bold text-neutral-950">
          Learn this SVG animation from {" "}
          <span className="relative">
            <Link
              target="_blank"
              href="https://youtu.be/qNX1-T74kLI?si=0h2Cwv8xWHPk2q2m"
              className="text-white"
            >
              here
            </Link>
            <CurvedArrowSvg />
          </span>
        </h1>
      </Container>
      <div className="bg-black h-screen" />
    </div>
  );
};

export default SvgAnimationPage;

const CurvedArrowSvg = () => {
  return (
    //This svg animation is very simple
    <svg
      width="120"
      height="120"
      viewBox="0 0 190 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 left-5 -top-25"
    >
      <motion.path
      //you just need to initial make pathlenght 0
        initial={{
          pathLength: 0,
        }}
        //then make pathlenght 1 in animate or whileInView depending upon you requirement
        whileInView={{
          pathLength: 1,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        d="M176 33.3088C176 33.3088 165.158 10 127.528 10C57.3705 10 57.3705 69.3315 57.3705 69.3315V197M57.3705 197L105.843 142.436M57.3705 197L14.0004 142.436"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        className="stroke-yellow-400"
      />
    </svg>
  );
};
