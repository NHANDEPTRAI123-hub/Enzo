'use client';

import React from "react";
import Navbar from "@/components/navbar";
import GetStartedButton from "@/components/GetStartedButton";
import TermsServiceButton from "@/components/TermsServiceButton";
import FeatureCard from "@/components/FeatureCard";
import GuideSection from "@/components/GuideSection";
import TeamWorkSection from "@/components/TeamWorkSection";
import Image from "next/image";
import AnimatedContent from "../components/AnimatedContent";

const Page = () => {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="flex flex-col gap-3 sm:gap-3 lg:gap-4 flex-1">
          <h1 className="text-black">
            <span className="text-purple-600">Unleash</span> Your Project
            Potential With Enzo
          </h1>
          <p className="text-black">
            <span className="sm:hidden">
              Empower young creators to transform ideas into successful projects
            </span>
            <span className="hidden sm:inline">
              Empower young creators to transform ideas into successful
              projects. Collaborate, manage, and grow with our intuitive
              platform designed for emerging talent
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3">
            <TermsServiceButton />
            <GetStartedButton />
          </div>
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/ui/hero-img.svg"
            alt="Hero"
            width={800}
            height={600}
            className="w-full h-auto no-dark-invert"
          />
        </div>
      </section>

      <section className="features">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <h2 className="text-left text-black flex items-center gap-2 sm:gap-3 flex-wrap mb-4 sm:mb-6 lg:mb-8">
            Our <span className="text-purple-600">Interactive</span> Features
            <Image
              src="/ui/project.svg"
              alt="Project icon"
              width={60}
              height={60}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 inline-block"
            />
          </h2>
        </AnimatedContent>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.95}
            threshold={0.1}
            delay={0.1}
          >
            <FeatureCard
              backgroundColor="var(--feature-card-purple)"
              title={
                <>
                  Create & Manage
                  <br />
                  <span className="text-purple-600">Project</span>
                </>
              }
              description="Create and manage your project easily and funnily"
              svgIcon="/ui/circle.svg"
              mainIcon="/ui/book.svg"
              buttonColor="var(--feature-btn-purple)"
            />
          </AnimatedContent>

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.95}
            threshold={0.1}
            delay={0.2}
          >
            <FeatureCard
              backgroundColor="var(--feature-card-purple-dark)"
              title={
                <>
                  Share & Express
                  <br />
                  <span className="text-gold-600">Community</span>
                </>
              }
              description="Share and post your idea to people around the world"
              svgIcon="/ui/oval.svg"
              mainIcon="/ui/team.svg"
              buttonColor="var(--feature-btn-light-purple)"
              isWhiteText={true}
            />
          </AnimatedContent>

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.95}
            threshold={0.1}
            delay={0.3}
          >
            <FeatureCard
              backgroundColor="var(--feature-card-yellow)"
              title={
                <>
                  Climb up to
                  <br />
                  <span className="text-purple-600">Leaderboard</span>
                </>
              }
              description="Gain likes and shares from users and climb up to leaderboard"
              svgIcon="/ui/dot.svg"
              mainIcon="/ui/rank.svg"
              buttonColor="var(--feature-btn-yellow)"
            />
          </AnimatedContent>
        </div>
      </section>

      {/* Guide Section */}
      <GuideSection />

      {/* TeamWork Section */}
      <TeamWorkSection />
    </>
  );
};

export default Page;
