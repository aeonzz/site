"use client";

import * as React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "./config/site";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".svg", { translateY: -25, rotate: 30, ease: "expo.out" }, 0)
      .to(".svg", { opacity: 0, ease: "expo.out" }, ">")
      .to(".line1", { width: 0, duration: 2, ease: "expo.out" }, 0)
      .to(".line2", { height: 0, duration: 2, ease: "expo.out" }, 0)
      .to(".text", { height: "100%", ease: "power1.in" });
    ScrollTrigger.create({
      trigger: ".hero",
      pin: true,
      start: "center center",
      end: "200% center",
      // markers: true,
      scrub: true,
      animation: tl,
    });

    const tl2 = gsap.timeline();
    tl2
      .to(
        ".line3",
        {
          duration: 10,
          height: "90%",
          ease: "expo.out",
        },
        0
      )
      .to(
        ".line4",
        {
          duration: 10,
          height: "90%",
          ease: "expo.out",
        },
        0
      )
      .to(
        ".line5",
        {
          duration: 10,
          height: "90%",
          ease: "expo.out",
        },
        0
      )
      .to(
        ".line6",
        {
          duration: 10,
          width: "90%",
          ease: "expo.out",
        },
        0
      )
      .to(
        ".line7",
        {
          duration: 10,
          width: "90%",
          ease: "expo.out",
        },
        0
      );
    ScrollTrigger.create({
      trigger: ".section2",
      pin: true,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: tl2,
    });

    gsap.from(".projects", {
      scrollTrigger: {
        trigger: ".section2",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      ease: "expo.out",
      translateY: 100,
    });

    gsap.to(".cta", {
      scrollTrigger: {
        trigger: ".section3",
        start: "top bottom",
        scrub: true,
      },
      translateY: 300,
      duration: 5,
      ease: "expo.out",
    });

    gsap.to(".section3container", {
      scrollTrigger: {
        trigger: ".footer",
        scrub: true,
      },
      scale: 0.9,
      ease: "expo.out",
      borderBottomRightRadius: "8rem",
      borderBottomLeftRadius: "8rem",
      transformOrigin: "top",
    });
  });

  return (
    <main className="relative">
      <section className="relative hero flex items-end justify-center min-h-screen overflow-hidden p-[10vmin] md:p-[20vmin]">
        <div className="absolute line1 w-full left-0 bottom-[50%] bg-border h-[0.5px]" />
        <div className="absolute right-2/5 top-0 line2 bg-border h-full w-px" />
        <div className="relative flex flex-col w-full md:gap-10">
          {/* <svg
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
          </svg> */}
          <h1 className="scroll-m-20 relative font-medium tracking-tight leading-none text-[15vmin] md:text-[9vmin] max-w-1/2 md:max-w-full">
            <span className="text absolute bottom-0 w-full h-0 bg-background" />
            Christian E. Caneos
          </h1>
          <div className="flex">
            <h3 className="relative scroll-m-20 ml-auto tracking-tight text-xs max-w-1/3 text-accent-foreground/60  leading-relaxed">
              <span className="text absolute bottom-0 w-full h-0 bg-background" />
              Aspiring frontend developer, enthusiastic about learning and
              passionate about creating exceptional user experiences.
            </h3>
          </div>
        </div>
      </section>
      <section className="section2 h-screen -mt-[450px]">
        <div className=" relative w-full h-screen flex items-center">
          <div className="line3 w-px h-0 bg-border absolute top-0 left-1/4" />
          <div className="line4 w-px h-0 bg-border absolute bottom-0 left-2/4" />
          <div className="line5 w-px h-0 bg-border absolute top-0 left-3/4" />
          <div className="line6 w-0 h-[0.5px] bg-border absolute left-0 top-1/3" />
          <div className="line7 w-0 h-[0.5px] bg-border absolute right-0 top-2/3" />
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center aspect-square"
            >
              <div className="projects w-3/4 h-1/2 flex flex-col gap-2">
                <Link
                  href={project.href}
                  target="_blank"
                  className="text-lg scroll-m-20 font-medium leading-none hover:underline"
                >
                  {project.header}
                </Link>
                <p className="text-accent-foreground/60 text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section3 h-screen z-10 bg-foreground">
        <div className="section3container relative flex items-start justify-center bg-background h-full origin-top">
          <div className="cta text-center">
            <p className="text-[10vmin] md:text-[3vmin] font-medium scroll-m-20">
              Ready to bring your ideas to life? <br />
              Get in Touch.
            </p>
          </div>
        </div>
      </section>
      <section className="footer bg-foreground px-10 -mt-1 w-full pt-3 pb-8">
        <div className="w-full flex items-center justify-between">
          <p className="text-background font-medium text-xs">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/in/christian-caneos-a17514214/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background text-xs hover:underline"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/aeonzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background text-xs hover:underline"
            >
              GitHub
            </Link>
            <Link
              href="mailto:christiancaneos1@gmail.com"
              className="text-background text-xs hover:underline"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
