"use client";

import React from "react";
import Image from "next/image";
import Bento from "./Bento";
import DocumentationButton from "./DocumentationButton";
import ViewArticleButton from "./ViewArticleButton";
import SeeTutorialsButton from "./SeeTutorialsButton";
import AnimatedContent from "./AnimatedContent";

const GuideSection = () => {
  return (
    <section className="guide">
      <AnimatedContent
        distance={100}
        direction="vertical"
        duration={0.8}
        delay={0}
        scale={1}
        threshold={0.1}
        className="sm:col-span-2 lg:col-span-3"
      >
        <h2 className="text-center text-black">
          All You Need{" "}
          <span className="text-purple-600 inline-flex items-center gap-1 flex-wrap justify-center">
            To Get Started With Enz
            <Image
              src="/ui/spin.svg"
              alt="O"
              width={32}
              height={32}
              className="inline-block w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
          </span>
        </h2>
      </AnimatedContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <AnimatedContent
          distance={100}
          direction="vertical"
          duration={0.8}
          delay={0.1}
          scale={0.95}
          threshold={0.1}
          className="sm:col-span-2 lg:col-span-3"
        >
          <Bento
            backgroundColor="var(--bento-yellow)"
            topSvgIcon="/ui/yellow-dots.svg"
            mainSvgIcon="/ui/guide.svg"
            customContent={
              <div className="relative z-10 flex flex-col h-full">
                {/* Bottom content container */}
                <div className="flex-1" />
                <div className="flex items-end justify-between gap-4 mt-8">
                  {/* Left side - Text content */}
                  <div className="flex flex-col gap-2">
                    <p
                      className="hidden sm:block"
                      style={{ color: "var(--text-gray)" }}
                    >
                      Guidance on Enzo
                    </p>
                    <h3 className="font-bold hidden sm:block text-black">
                      Documentation
                    </h3>
                  </div>

                  {/* Right side - Button */}
                  <div className="shrink-0">
                    <DocumentationButton />
                  </div>
                </div>
              </div>
            }
          />
        </AnimatedContent>

        <AnimatedContent
          distance={100}
          direction="vertical"
          duration={0.8}
          delay={0.2}
          scale={0.95}
          threshold={0.1}
          className="sm:col-span-1 lg:col-span-2"
        >
          <Bento
            backgroundColor="var(--bento-yellow)"
            backgroundImage="/ui/thumbnail.svg"
            isWhiteText={true}
            customContent={
              <div className="relative z-10 flex flex-col h-full min-h-[250px] sm:min-h-[294px]">
                {/* Top left content */}
                <div className="flex flex-col gap-2">
                  <p className="text-sm sm:text-base text-white">
                    All the how-to&apos;s
                  </p>
                  <h3 className="font-bold text-white">Tutorials</h3>
                </div>

                {/* Bottom content container */}
                <div className="flex-1" />
                <div className="flex items-end justify-between gap-4">
                  {/* Bottom left - YouTube icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14">
                    <Image
                      src="/ui/youtube.svg"
                      alt="YouTube"
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Bottom right - Button */}
                  <div className="shrink-0">
                    <SeeTutorialsButton />
                  </div>
                </div>
              </div>
            }
          />
        </AnimatedContent>

        <AnimatedContent
          distance={100}
          direction="vertical"
          duration={0.8}
          delay={0.3}
          scale={0.95}
          threshold={0.1}
          className="sm:col-span-1 lg:col-span-2"
        >
          <Bento
            backgroundColor="var(--bento-purple-light)"
            customContent={
              <div className="relative z-10 flex flex-col h-full min-h-[250px] sm:min-h-[280px]">
                {/* Globe icon - Behind text */}
                <div className="absolute right-15 lg:right-27 flex items-center z-0 w-60 h-60 sm:w-60 sm:h-60 lg:w-80 lg:h-80">
                  <Image
                    src="/ui/globe.svg"
                    alt="Globe"
                    width={112}
                    height={112}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Top left content - Above globe */}
                <div className="relative z-10 flex flex-col gap-2">
                  <p style={{ color: "var(--text-gray)" }}>
                    A knowledge base of methodology
                  </p>
                  <h3 className="font-bold text-black">
                    Project management concepts
                  </h3>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom right - Button */}
                <div className="relative z-10 flex justify-end">
                  <DocumentationButton
                    backgroundColor="var(--btn-doc-bg-alt)"
                    borderColor="var(--btn-doc-border)"
                  />
                </div>
              </div>
            }
          />
        </AnimatedContent>

        <AnimatedContent
          distance={100}
          direction="vertical"
          duration={0.8}
          delay={0.4}
          scale={0.95}
          threshold={0.1}
          className="sm:col-span-2 lg:col-span-3"
        >
          <Bento
            backgroundColor="var(--bento-purple-dark)"
            centerSvgIcon="/ui/partner.svg"
            isWhiteText={true}
            customContent={
              <div className="relative z-10 flex flex-col h-full min-h-[250px] sm:min-h-[280px]">
                {/* Bottom content container */}
                <div className="flex-1" />
                <div className="flex items-end justify-between gap-4 mt-8">
                  {/* Left side - Text content */}
                  <div className="flex flex-col gap-2">
                    <p className="text-white">Teamwork prioritize</p>
                    <h3 className="font-bold text-white">
                      Why teamwork is important
                    </h3>
                  </div>

                  {/* Right side - Button */}
                  <div className="shrink-0 mt-10">
                    <ViewArticleButton />
                  </div>
                </div>
              </div>
            }
          />
        </AnimatedContent>
      </div>
    </section>
  );
};

export default GuideSection;
