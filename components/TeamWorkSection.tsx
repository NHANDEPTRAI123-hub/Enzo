"use client";

import React from "react";
import Image from "next/image";
import AnimatedContent from "./AnimatedContent";

const TeamWorkSection = () => {
  const teamworkItems = [
    {
      id: 1,
      title: "Group chat with teammates",
      description: "Create group chats to communicate with team members",
    },
    {
      id: 2,
      title: "Play games with your team",
      description: "Create games to tighten the bond between team members",
    },
    {
      id: 3,
      title: "AI generated tasks",
      description:
        "With AI-powered task generation, you can effortlessly create tasks",
    },
    {
      id: 4,
      title: "Real-time collaboration",
      description: "Work together seamlessly with live updates and instant feedback",
    },
    {
      id: 5,
      title: "Personalized experience",
      description: "Tailor your workspace to match your team's unique workflow and preferences",
    },
  ];

  return (
    <section className="relative flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <h2 className="text-black flex items-center gap-1 sm:gap-3 flex-wrap">
        Teamwork is now both{" "}
        <span className="text-gold-600">Fun & Professional</span>
        <Image
          src="/ui/fun.svg"
          alt="Fun icon"
          width={48}
          height={48}
          className="relative bottom-1 sm:bottom-2 w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 inline-block"
        />
      </h2>

      {/* Content flex container */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left side - Frame image */}
        <div className="flex-1 w-full lg:w-auto flex items-center justify-center lg:justify-start">
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={true}
            duration={0.8}
            ease="power3.in"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0.1}
          >
            <Image
              src="/ui/frame.png"
              alt="Teamwork Frame"
              width={500}
              height={500}
              className="w-full h-auto max-w-md lg:w-100 lg:h-200"
            />
          </AnimatedContent>
        </div>

        {/* Right side - Timeline with items */}
        <div className="flex-1 w-full flex flex-col relative">
          {teamworkItems.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-6 sm:gap-8 lg:gap-10 relative w-full"
            >
              {/* Timeline column */}
              <div className="flex flex-col items-center shrink-0">
                {/* Dot */}
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 mt-1 mb-1 sm:mt-2 sm:mb-2"
                  style={{ backgroundColor: "var(--teamwork-dot)" }}
                />
                {/* Connecting line - only show if not last item */}
                {index < teamworkItems.length - 1 && (
                  <div
                    className="w-1.5 rounded-full grow my-1"
                    style={{
                      backgroundColor: "var(--teamwork-line)",
                      minHeight: "60px",
                    }}
                  />
                )}
              </div>

              {/* Content column */}
              <div
                className={`flex-1 ${
                  index < teamworkItems.length - 1 ? "pb-6 sm:pb-20" : ""
                }`}
              >
                <AnimatedContent
                  distance={80}
                  direction="horizontal"
                  reverse={false}
                  duration={0.6}
                  ease="power2.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={0.95}
                  threshold={0.1}
                  delay={0.2 + index * 0.1}
                >
                  <h3
                    className="font-semibold mb-2  sm:mb-3"
                    style={{ color: "var(--text-black)" }}
                  >
                    {item.title}
                  </h3>
                </AnimatedContent>
                <AnimatedContent
                  distance={80}
                  direction="horizontal"
                  reverse={false}
                  duration={0.6}
                  ease="power2.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={0.95}
                  threshold={0.1}
                  delay={0.3 + index * 0.1}
                >
                  <p style={{ color: "var(--text-black)" }}>{item.description}</p>
                </AnimatedContent>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamWorkSection;
