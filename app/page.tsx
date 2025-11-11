import React from 'react';
import Navbar from '@/components/navbar';
import GetStartedButton from '@/components/GetStartedButton';
import TermsServiceButton from '@/components/TermsServiceButton';
import FeatureCard from '@/components/FeatureCard';

const Page = () => {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="flex flex-col gap-2 sm:gap-3 flex-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl"><span className="text-purple-600">Unleash</span> Your Project Potential With Enzo</h1>
          <p className="text-base sm:text-lg lg:text-xl">Empower young creators to transform ideas into successful projects. Collaborate, manage, and grow with our intuitive platform designed for emerging talent</p>
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
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-semibold">
          Our <span className="text-purple-600">Interactive</span> Features
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
          <FeatureCard
            backgroundColor="#E5CCFF"
            title={
              <>
                Create & Manage<br />
                <span className="text-purple-600">Project</span>
              </>
            }
            description="Work together seamlessly with your team in real-time collaboration environments designed for maximum productivity."
          />
          <FeatureCard
            backgroundColor="#7F00FF"
            title={
              <>
                Share & Express<br />
                <span className="text-gold-600">Community</span>
              </>
            }
            description="Track your progress, manage tasks, and stay organized with our intuitive project management tools."
          />
          <FeatureCard
            backgroundColor="#FFCF40"
            title={
              <>
                Climb up to<br />
                <span className="text-purple-600">Leaderboard</span>
              </>
            }
            description="Monitor your project's growth with detailed analytics and insights to make data-driven decisions."
          />
        </div>
      </section>
    </>
  );
};

export default Page;