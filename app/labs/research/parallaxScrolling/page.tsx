"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const ParallaxScrollingPage = () => {
  return (
    <div>
        <Nav />
        <Hero />
        <div className="h-screen"></div>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-5 flex items-center justify-between px-6 py-3 ">
      <h1 className="text-3xl">X</h1>
      <button
        onClick={() => {
          document.getElementById("scroll")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="text-md text-neutral-400 hover:text-neutral-300 cursor-pointer"
      >
        SCROLL DOWN
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      className="w-full relative"
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
    >
      <CenterImage />
      <ParallaxImages />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );
  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    ["170%", "100%"],
  );
  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [25, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        opacity,
        backgroundSize,
        clipPath,
        backgroundImage:
          "url(https://images.unsplash.com/vector-1744267026518-01b3d6223978?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pt-50">
      <ParallaxImg
        src="https://images.unsplash.com/vector-1746289637048-9d19d3aeb16d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="boat"
        start={-200}
        end={-280}
        className="w-1/3 ml-5"
      />
      <ParallaxImg
        src="https://plus.unsplash.com/premium_vector-1737341702349-ea381e6d8336?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="boat"
        start={-300}
        end={-50}
        className="w-1/3 ml-140"
      />
      <ParallaxImg
        src="https://plus.unsplash.com/premium_vector-1718144007451-24106d4209f8?q=80&w=1704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="boat"
        start={-400}
        end={-750}
        className="w-3/5 ml-15"
      />
      <ParallaxImg
        src="https://images.unsplash.com/vector-1769974172406-9d5a4ae5bd0c?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="boat"
        start={-800}
        end={-600}
        className="w-1/3 ml-10"
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;
  useMotionValueEvent(transform, "change", (latest) => console.log(latest));

  return (
    <motion.img
      style={{ opacity, transform }}
      ref={ref}
      src={src}
      alt={alt}
      className={className}
    />
  );
};

export default ParallaxScrollingPage;
