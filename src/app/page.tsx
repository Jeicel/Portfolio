// app/page.tsx

"use client";

import React from "react";
import Image from "next/image";

// Components & Blocks
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import TrueFocus from "@/blocks/TextAnimations/TrueFocus/TrueFocus";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import CircularText from "@/blocks/TextAnimations/CircularText/CircularText";
import TiltedCard from "@/blocks/Components/TiltedCard/TiltedCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillTag from "@/components/SkillTag";

// Animation complete callback
const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

// Skill arrays
const devSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "MySQL",
  "JSON",
  "GitHub",
  "Vercel",
  "VS Code",
];

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center h-full relative pt-20">
        {/* Threads Background */}
        <div
          style={{ width: "100%", height: "600px", position: "absolute", bottom: "50" }}
          className="hidden md:block"
        >
          <Threads amplitude={2.5} distance={0} enableMouseInteraction={false} />
        </div>

        <div
          style={{ width: "100%", height: "600px", position: "absolute", bottom: "50" }}
          className="md:hidden opacity-10"
        >
          <Threads amplitude={2.5} distance={0} enableMouseInteraction={false} />
        </div>

        {/* Hero Section */}
        <div className="w-full flex justify-center items-center my-4 md:mt-15 text-center font-bold relative px-4 md:px-0">
          <BlurText
            text="Jeicel Ortega"
            delay={150}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="lg:text-9xl md:text-7xl text-4xl text-center"
          />
        </div>

        <div className="font-bold text-center opacity-0 animate-fadeIn mt-1 md:mt-3">
          <TrueFocus
            sentence="Learning   Building   Growing"
            manualMode={true}
            blurAmount={5}
            borderColor="cyan"
            animationDuration={0.3}
            pauseBetweenAnimations={1}
          />
        </div>

        {/* Fade-in animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
            animation-delay: 0.8s;
          }
        `}</style>

        {/* Circular Scroll Text */}
        <div className="w-full items-center mt-8 mb-4 relative h-[300px] hidden md:block">
          <CircularText
            text="SCROLL-DOWN*SCROLL-DOWN*"
            onHover="slowDown"
            spinDuration={5}
            className="absolute left-45 bottom-10"
          />
          <Image
            src="/logo/Jeicel_logo.png"
            alt="Jeicel's Logo"
            width={20}
            height={20}
            className="m-10 transition-all duration-300 hover:scale-150 hover:rotate-10 hover:brightness-125 absolute left-44 bottom-9"
          />
        </div>

        {/* Tech Stack Section */}
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center w-full md:w-9xl md:mt-35 mt-10 md:space-x-50 space-x-0">
          <div className="flex flex-col w-full max-w-lg px-4 md:px-0 mt-10 mb-20 space-y-8">
             {/* Profile Image - Mobile */}
            <div className="md:hidden mt-10 mb-20 flex justify-center">
              <TiltedCard
                imageSrc="/photos/profile2.png"
                altText="Jeicel"
                captionText="Jeicel Mae A. Ortega"
                containerHeight="400px"
                containerWidth="300px"
                imageHeight="400px"
                imageWidth="300px"
                rotateAmplitude={10}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <p className="bg-transparent px-4 py-2 border-1 border-dashed rounded-lg opacity-50 font-bold m-5 absolute">
                    Jeicel
                  </p>
                }
              />
            </div>
            {/* DEVELOP Card */}
            <div className="relative p-6 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 custom-corner-border">
              <h3 className="text-white font-bold md:text-2xl text-lg tracking-wide mb-3">
                DEVELOP
              </h3>
              <p className="text-gray-400 md:text-md text-sm mt-2 leading-relaxed mb-5 text-justify">
                I develop and design web-based systems using HTML, CSS, JavaScript, Python,
                and MySQL, often working with JSON for data exchange and integration. My work
                focuses on building responsive, user-centered applications that combine
                functionality and visual appeal. I handle both front-end and back-end
                development, ensuring smooth interaction between interfaces and databases. By
                integrating modern frameworks and efficient coding practices, I aim to create
                systems that are reliable, scalable, and easy to maintain.
              </p>
              <h4 className="text-cyan-300 font-semibold mb-3 text-base">
                Skillset &amp; tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {devSkills.map((skill) => (
                  <SkillTag key={skill} skillName={skill} />
                ))}
              </div>
            </div>
          </div>

            {/* Profile Image - Desktop */}
            <div className="hidden md:block mt-10 mb-20">
              <TiltedCard
                imageSrc="/photos/profile2.png"
                altText="Jeicel"
                captionText="Jeicel Mae A. Ortega"
                containerHeight="600px"
                containerWidth="500px"
                imageHeight="600px"
                imageWidth="500px"
                rotateAmplitude={10}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <p className="bg-transparent px-4 py-2 border-1 border-dashed rounded-lg opacity-50 font-bold m-5 absolute top-5 left-85">
                    Jeicel
                  </p>
                }
              />
            </div>
        </div>

        {/* Experience Section */}
        <div className="flex w-full items-center justify-center p-4 md:mt-25 mt-5">
          <BlurText
            text="My Experience"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="md:text-7xl text-3xl font-extrabold"
          />
        </div>

        {/* ✅ Fixed: Wrapped ExperienceTimeline in a relative container */}
        <div className="relative w-full flex justify-center">
          <ExperienceTimeline />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex w-full items-center justify-center p-4 border-t border-white/[.15] text-white/50 text-sm font-light mt-20">
        <p>&copy; {new Date().getFullYear()} Jeicel Mae A. Ortega. All rights reserved.</p>
      </footer>
    </>
  );
}
