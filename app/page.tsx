import React from "react";
import Navbar from "@/components/navbar";
import GetStartedButton from "@/components/GetStartedButton";
import TermsServiceButton from "@/components/TermsServiceButton";
import FeatureCard from "@/components/FeatureCard";

const Page = () => {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="flex flex-col gap-2 sm:gap-3 flex-1">
          <h1>
            <span className="text-purple-600">Unleash</span> Your Project
            Potential With Enzo
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            Empower young creators to transform ideas into successful projects.
            Collaborate, manage, and grow with our intuitive platform designed
            for emerging talent
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3">
            <TermsServiceButton />
            <GetStartedButton />
          </div>
        </div>
        <div className="flex-1 w-full">
          <img src="/ui/hero-img.svg" alt="Hero" className="w-full h-auto" />
        </div>
      </section>

      <section className="features">
        <h2 className="text-left">
          Our <span className="text-purple-600">Interactive</span> Features
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
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
        </div>
      </section>
    </>
  );
};

export default Page;
