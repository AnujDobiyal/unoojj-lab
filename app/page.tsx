import { Container } from "@/components/container";
import Link from "next/link";

export default function Home() {
  const links = [
    { name: "Svg Animation", href: "/svg-animation", tag: "research" },
    {
      name: "Neal Perfect Circle",
      href: "/nealPerfectCircle",
      tag: "research",
    },
    {
      name: "Prallax Scrolling",
      href: "/parallaxScrolling",
      tag: "research"
    },
    { name: "Swipe Cards", href: "/swipeCards", tag: "research" },
    { name: "Flipping Card", href: "/flippingCard", tag: "experiments" },
  ];
  return (
    <Container className="bg-neutral-950 md:py-2">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl tracking-tight text-neutral-300 mt-2 ">
          Researched:{" "}
        </h1>
        {links
          .filter((l) => l.tag === "research")
          .map((link) => (
            <Link
              key={link.href}
              href={`labs/${link.tag}/${link.href}`}
              className="ml-10 text-neutral-400 hover:text-neutral-200"
            >
              {link.name}
            </Link>
          ))}

        <h1 className="font-bold text-xl tracking-tight text-neutral-300 mt-2 ">
          Experiments:{" "}
        </h1>
        {links
          .filter((l) => l.tag === "experiments")
          .map((link) => (
            <Link
              key={link.href}
              href={`labs/${link.tag}/${link.href}`}
              className="ml-10 text-neutral-400 hover:text-neutral-200"
            >
              {link.name}
            </Link>
          ))}
      </div>
    </Container>
  );
}
