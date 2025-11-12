import React from "react";
import Navbar from "@/components/navbar";
import GetStartedButton from "@/components/GetStartedButton";
import TermsServiceButton from "@/components/TermsServiceButton";
import FeatureCard from "@/components/FeatureCard";
import Bento from "@/components/Bento";
import DocumentationButton from "@/components/DocumentationButton";
import Image from "next/image";
import AnimatedContent from "../components/AnimatedContent";

const Page = () => {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="flex flex-col gap-3 sm:gap-3 lg:gap-4 flex-1">
          <h1>
            <span className="text-purple-600">Unleash</span> Your Project
            Potential With Enzo
          </h1>
          <p>
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
            className="w-full h-auto"
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
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-left">
              Our <span className="text-purple-600">Interactive</span> Features
            </h2>
            <Image
              src="/ui/project.svg"
              alt="Project icon"
              width={60}
              height={60}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />
          </div>
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
              backgroundColor="#E5CCFF"
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
              buttonColor="#F2E5FF"
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
              backgroundColor="#7F00FF"
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
              buttonColor="#E5CCFF"
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
              backgroundColor="#FFCF40"
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
              buttonColor="#FFEFC3"
            />
          </AnimatedContent>
        </div>
      </section>

      {/* Guide Section */}
      <section className="guide">
        <h2 className="text-center">
          All You Need{" "}
          <span className="text-purple-600">To Get Started With Enzo</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <AnimatedContent
            distance={50}
            direction="vertical"
            duration={0.6}
            delay={0.1}
            className="sm:col-span-2 lg:col-span-3"
          >
            <Bento
              backgroundColor="#FFCF40"
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
                        className="sm:text-base"
                        style={{ color: "#575656" }}
                      >
                        Guidance on Enzo
                      </p>
                      <h3 className="font-bold">Documentation</h3>
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
            distance={50}
            direction="vertical"
            duration={0.6}
            delay={0.2}
            className="sm:col-span-1 lg:col-span-1"
          >
            <Bento
              title="Set Up Your Projects"
              description="Organize your workflow with customizable boards, tasks, and team collaboration features."
              backgroundColor="#FFCF40"
            />
          </AnimatedContent>

          <AnimatedContent
            distance={50}
            direction="vertical"
            duration={0.6}
            delay={0.3}
            className="sm:col-span-1 lg:col-span-1"
          >
            <Bento
              title="Invite Your Team"
              description="Collaborate seamlessly by inviting team members and assigning roles and permissions."
              backgroundColor="#FCD462"
            />
          </AnimatedContent>

          <AnimatedContent
            distance={50}
            direction="vertical"
            duration={0.6}
            delay={0.4}
            className="sm:col-span-2 lg:col-span-3"
          >
            <Bento
              title="Track Progress"
              description="Monitor your project's progress with real-time updates, analytics, and performance insights."
              backgroundColor="#7F00FF"
              isWhiteText={true}
            />
          </AnimatedContent>
        </div>
      </section>
    </>
  );
};

export default Page;
