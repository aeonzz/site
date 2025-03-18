import * as React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".box-c",
      pin: true,
      start: "center center",
      end: "+=300",
      markers: true,
    });
  });
  return (
    <div className="h-screen">
      <div className="h-screen">
        <h3 className="font-medium text-base">Tangina mo.</h3>
      </div>
      <div className="h-screen">
        <div className="box-c size-10 bg-white" data-speed="1.5"></div>
      </div>
    </div>
  );
}
