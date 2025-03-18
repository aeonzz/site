"use client";

import * as React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    const tl = gsap.timeline();
    // tl.to(".welcome", { duration: 1 });
    tl.to(".welcome", { scale: 5, duration: 1 });
    tl.to(".welcome", { scale: 20, duration: 1 });
    tl.to(".welcome", { scale: 40, duration: 2 });
    tl.to(".welcome", { scale: 50, duration: 1 });
    ScrollTrigger.create({
      trigger: ".welcome-container",
      pin: true,
      start: "center center",
      end: "200%",
      markers: true,
      scrub: true,
      animation: tl,
    });
  });

  return (
    <main className="relative ">
      <div className="welcome-container flex items-center justify-center h-screen overflow-hidden">
        <h3 className="welcome font-medium text-base">Welcome.</h3>
      </div>
      <div className="h-[200vh]"></div>
    </main>
  );
}
