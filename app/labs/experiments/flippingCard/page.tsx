"use client";

import { Container } from "@/components/container";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FlippingCardPage = () => {
  const [footerTop, setFooterTop] = useState<number | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  const [allSections, setAllSections] = useState<{ id: string; top: number }[]>(
    [],
  );
  const [activeId, setActiveId] = useState<string[]>([]);
  const fixedRef = useRef<HTMLDivElement>(null);
  const [fixedTop, setFixedTop] = useState<number>(35);

  useEffect(() => {
    const handlePostions = () => {
      setFixedTop(fixedRef.current?.getBoundingClientRect().top ?? 35);
      const sections = document.querySelectorAll("section[id]");

      const postions: number[] = [];
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        postions.push(rect.top + window.scrollY);
      });

      setAllSections(
        Array.from(sections).map((section, index) => ({
          id: section.id,
          top: postions[index],
        })),
      );
    };
    handlePostions();
  }, []);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 1);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    allSections.forEach(({ id, top: sectionTop }) => {
      if (latest > sectionTop - fixedTop - 20) {
        setActiveId((prev) => (prev.includes(id) ? prev : [...prev, id]));
      } else {
        setActiveId((prev) => prev.filter((sectionId) => sectionId !== id));
      }
      console.log(latest + fixedTop, sectionTop, fixedTop, activeId);
    });
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.96) {
      const footerTp = allSections.find(
        (section) => section.id === "Footer",
      )?.top;
      setFooterTop(footerTp! - window.scrollY);
      setActiveId((prev) =>
        prev.includes("Footer") ? prev : [...prev, "Footer"],
      );
    } else {
      setFooterTop(null);
    }
  });

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - fixedTop,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { id: "Hero", label: "Hero" },
    { id: "About", label: "About" },
    { id: "Contact", label: "Contact" },
    { id: "Footer", label: "Footer" },
  ];

  return (
    <div className="bg-zinc-100">
        <Container className="border-x-4 flex gap-4 border-x-black pl-6 pr-8 py-8">
          <div className="w-18 md:w-28">
            <FlippingCard
              footerTop={footerTop}
              fixedRef={fixedRef}
              activeId={activeId}
            />

            <nav className="fixed bottom-2 w-18 flex flex-col gap-2 items-center py-4 mask-b-from-98%">
              {navLinks.map((link) => (
                <Btn key={link.id} onClick={() => scrollTo(link.id)}>
                  {link.label}
                </Btn>
              ))}
            </nav>
          </div>
          <div className=" flex-1 space-y-8">
            <SectionCard sectionId="Hero">
              <SectionTitle title="Hero" />
              <SectionContent>
                <h2 className="text-6xl text-white/32 font-bold tracking-wider scale-y-115">
                  Scroll Down
                </h2>
              </SectionContent>
            </SectionCard>

            <SectionCard sectionId="About" className="bg-blue-400">
              <SectionTitle title="About Us" />

              <SectionContent>
                <h2 className="text-6xl text-white/32 font-bold tracking-wider scale-y-115">
                  Scroll Down
                </h2>
              </SectionContent>
            </SectionCard>

            <SectionCard sectionId="Contact" className="bg-green-400">
              <SectionTitle title="Contact Us" />

              <SectionContent>
                <h2 className="text-6xl text-white/32 font-bold tracking-wider scale-y-115">
                  Scroll Down
                </h2>
              </SectionContent>
            </SectionCard>

            <SectionCard sectionId="Footer" className="bg-black border-white">
              <SectionTitle title="Footer" className="border-white" />

              <SectionContent>
                <h2 className="text-6xl text-white/32 font-bold tracking-wider scale-y-115">
                  Scroll Down
                </h2>
              </SectionContent>
            </SectionCard>
          </div>
        </Container>
    </div>
  );
};

const FlippingCard = ({
  footerTop,
  fixedRef,
  activeId,
}: {
  footerTop: number | null;
  fixedRef: React.RefObject<HTMLDivElement | null>;
  activeId: string[] | undefined;
}) => {
  return (
    <motion.div
      className="w-18 h-16 fixed z-10 perspective-distant shadow-[4px_4px_rgba(0,0,0,0.85)]"
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      animate={{
        ...(footerTop && { top: footerTop }),
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      ref={fixedRef}
    >
      <AnimatePresence>
        {activeId?.map((word, idx) => (
          <motion.div
            key={idx}
            style={{
              rotateX: 270,
            }}
            animate={{
              rotateX: 0,
            }}
            exit={{
              rotateX: 270,
              transition: { duration: 0.46, ease: "easeOut" },
            }}
            transition={{
              duration: 0.67,
              ease: "easeOut",
            }}
            className="absolute z-10 inset-0 border border-black bg-white origin-top text-black flex items-center justify-center font-bold text-xl md:text-2xl"
          >
            {word}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const SectionCard = ({
  children,
  sectionId,
  className,
}: {
  children: React.ReactNode;
  sectionId: string;
  className?: string;
}) => {
  return (
    <section
      id={sectionId}
      className={cn(
        "bg-red-400 flex flex-col shadow-[10px_10px_rgba(0,0,0,0.85)] h-128 border border-black",
        className,
      )}
    >
      {children}
    </section>
  );
};

const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn("border-b-2 border-black", className)}>
      <h1 className="font-bold text-xl md:text-2xl px-9 py-5 z-200 text-white">{title}</h1>
    </div>
  );
};

const SectionContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(" flex-1 flex justify-center items-center", className)}>
      {children}
    </div>
  );
};

const Btn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="block cursor-pointer h-8 w-16 text-sm bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-950 hover:scale-105 shadow-[4px_4px_rgba(0,0,0,0.85)]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FlippingCardPage;
