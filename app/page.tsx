// page.tsx
"use client";

import { useState } from "react";
import DynamicFrameLayout from "@/components/DynamicFrameLayout";
import PartnerGrid from "@/components/PartnerGrid";
import { ppEditorialNewUltralightItalic, inter } from "./fonts";

export default function Home() {
  const [headerSize] = useState(1.2);
  const [textSize] = useState(0.8);

  return (
    <div className={`min-h-screen bg-[#141414] p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">
        {/* Left Content */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-16">
            <h1
              className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]`}
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              ACM
              <br />
              Official
              <br />
              Partners
            </h1>
            <div
              className={`${inter.className} flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                <p> We extend our heartfelt appreciation to our sponsors, whose generous support has played a crucial role in our success. Their contributions empower us to continue innovating, growing, and making a lasting impact. Through their partnership, we have been able to reach new milestones, enhance our initiatives, and create meaningful opportunities. </p> <p> Our sponsors are not just supporters—they are an integral part of our mission. Their belief in our vision fuels our progress, allowing us to develop groundbreaking solutions and expand our reach. With every step forward, we recognize the vital role they play in shaping a brighter future. </p> <p> As we look ahead, we invite new sponsors to join us in this journey. Your support will drive innovation, strengthen our initiatives, and help us make an even greater difference. Let’s build something remarkable together. </p>
                <div className="h-px bg-white/10 w-full" />
              </div>
            </div>
          </div>
          <a
            href="#"
            className="inline-block px-6 py-3 text-white/70 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors text-center w-full max-w-[260px] text-sm mt-16"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
          </a>
        </div>

        {/* Right Content */}
        <div className="w-full">
          {/* Existing component */}
          <DynamicFrameLayout />

          {/* Render the dynamic partner grid */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Partners</h2>
            <PartnerGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
