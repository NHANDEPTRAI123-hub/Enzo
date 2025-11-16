'use client';

import React, { useState } from 'react';
import AnimatedContent from './AnimatedContent';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'What is Enzo and who is it for?',
    answer: 'Enzo is an AI-powered project management platform designed specifically for young creators and emerging talent. It helps you collaborate with teams, manage tasks effortlessly, and share your ideas with a global community.',
  },
  {
    id: 2,
    question: 'How does the AI task generation work?',
    answer: 'Our AI analyzes your project goals and automatically generates relevant tasks with suggested priorities and timelines. It learns from your workflow patterns to provide increasingly accurate recommendations over time.',
  },
  {
    id: 3,
    question: 'Is Enzo free to use?',
    answer: 'Enzo offers a free tier with essential features for individual creators and small teams. Premium plans with advanced AI capabilities, unlimited projects, and priority support are available for growing teams.',
  },
  {
    id: 4,
    question: 'Can I collaborate with my team in real-time?',
    answer: 'Yes! Enzo supports real-time collaboration with live updates, instant messaging, group chats, and synchronized task management. Your team can work together seamlessly from anywhere.',
  },
  {
    id: 5,
    question: 'How does the leaderboard work?',
    answer: 'The leaderboard ranks users based on project completion, community engagement, and peer recognition. Gain points by completing tasks, sharing quality content, and receiving likes from other creators.',
  },
  {
    id: 6,
    question: 'Is my data secure on Enzo?',
    answer: 'Absolutely. We use industry-standard encryption, secure cloud storage, and regular security audits to protect your data. Your privacy is our top priority, and we never share your information without consent.',
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq">
      {/* Header */}
      <AnimatedContent
        distance={50}
        direction="vertical"
        duration={0.8}
        delay={0}
        threshold={0.1}
      >
        <div className="text-center">
          <h2 className="text-black mb-3 sm:mb-4">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-black max-w-2xl mx-auto">
            Everything you need to know about Enzo. Can&apos;t find what you&apos;re looking for? Feel free to reach out to our support team.
          </p>
        </div>
      </AnimatedContent>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto w-full">
        {faqData.map((faq, index) => (
          <AnimatedContent
            key={faq.id}
            distance={50}
            direction="vertical"
            duration={0.6}
            delay={0.1 + index * 0.05}
            threshold={0.1}
          >
            <div
              className="mb-4 sm:mb-6 rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: openId === faq.id ? 'var(--bento-purple-light)' : '#FFFFFF',
                border: '1px solid',
                borderColor: openId === faq.id ? 'var(--feature-card-purple-dark)' : '#E6E1E1',
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 lg:p-7 text-left transition-colors hover:bg-purple-50/30"
                aria-expanded={openId === faq.id}
              >
                <h3
                  className="font-medium flex-1 pr-4"
                  style={{ color: 'var(--text-black)' }}
                >
                  {faq.question}
                </h3>
                
                {/* Icon */}
                <div
                  className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full transition-all duration-300 ${
                    openId === faq.id ? 'rotate-180 bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      openId === faq.id ? 'text-white' : 'text-gray-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 lg:pb-7 pt-0">
                  <p
                    className="leading-relaxed"
                    style={{ color: 'var(--text-gray)' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={0.8}
          delay={0.5}
          threshold={0.1}
        >
          <div className="text-center p-6 sm:p-8 lg:p-10 bg-linear-to-r from-purple-50 to-purple-100/50">
            <h3 className="font-semibold mb-3 text-black">
              Still have questions?
            </h3>
            <p className="mb-5 sm:mb-6" style={{ color: 'var(--text-gray)' }}>
              Our support team is always ready to help you get started with Enzo
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700">
              Contact Support
            </button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default FAQ;
