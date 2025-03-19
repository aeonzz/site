"use client";

import * as React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".svg", { translateY: -25, rotate: 30 }, 0)
      .to(".svg", { opacity: 0 }, ">")
      .to(".line1", { width: 0, duration: 2 }, 0)
      .to(".line2", { height: 0, duration: 2 }, 0)
      .to(".text", { height: "100%" });
    ScrollTrigger.create({
      trigger: ".hero",
      pin: true,
      start: "center center",
      end: "200% center",
      // markers: true,
      scrub: true,
      animation: tl,
    });

    gsap.to(".section2container", {
      scrollTrigger: {
        trigger: ".section2",
        pin: true,
        start: "top top",
        end: "bottom center",
        markers: true,
        scrub: true,
      },
      opacity: 100,
      scale: 1,
      duration: 1,
    });
  });

  return (
    <main className="relative">
      <section className="relative hero flex items-end justify-center min-h-screen overflow-hidden p-[10vmin] md:p-[20vmin]">
        <div className="absolute line1 w-full left-0 bottom-[40vh] bg-border h-[0.5px]" />
        <div className="absolute right-2/5 top-0 line2 bg-border h-full w-px" />
        <div className="relative flex flex-col w-full md:gap-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="svg lucide lucide-plus absolute top-[1.35rem] -right-[1.35rem]"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="svg lucide lucide-plus absolute -bottom-[2.5rem] -left-[1.35rem]"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <h1 className="scroll-m-20 relative font-medium tracking-tight leading-none text-[15vmin] md:text-[9vmin] max-w-1/2 md:max-w-full">
            <span className="text absolute bottom-0 w-full h-0 bg-background" />
            Christian E. Caneos
          </h1>
          <div className="flex">
            <h3 className="relative scroll-m-20 ml-auto tracking-tight text-xs max-w-1/3 text-accent-foreground/80">
              <span className="text absolute top-0 w-full h-0 bg-background" />
              Aspiring frontend developer, enthusiastic about learning and
              passionate about creating exceptional user experiences.
            </h3>
          </div>
        </div>
      </section>
      <section className="section2 h-[300vh] border p-10">
        <div className="section2container w-full h-1/2 opacity-0 border flex items-start scale-98">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex-1 border aspect-square">
              {index}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
