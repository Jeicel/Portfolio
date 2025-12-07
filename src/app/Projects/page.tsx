"use client";

import React, { useState } from "react";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import RollingGallery from "@/blocks/Components/RollingGallery/RollingGallery";
import FallingText from "@/blocks/TextAnimations/FallingText/FallingText";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import ProjectEntry from "../Proj/ProjectEntry";

const handleAnimationComplete = () => {
  console.log("Projects page animation completed!");
};

// ✅ Define your projects data
const ProjEntriesData = [
  {
    entryNumber: "01",
    title: "Mabini Tourism",
    category: "Web Development",
    description:
      "The Mabini Tourism Website promotes the tourist attractions of Mabini, Batangas by providing information, images, and maps to guide visitors.",
    imageSrc: "/solutions/Mabini_tourism.png",
    projectLink: "https://mabini-tourism-six.vercel.app/",
  },
  {
    entryNumber: "02",
    title: "The Burger Spot",
    category: "Web Development",
    description:
      "The Burger Spot is a modern, responsive burger restaurant ordering and management system built with vanilla HTML, CSS, and JavaScript. It features customer order placement, real-time order tracking, admin dashboard with sales analytics, and staff order management.",
    imageSrc: "/solutions/The Burger Spot.png",
    projectLink: "https://the-burger-spot.vercel.app/",
  },
  {
    entryNumber: "03",
    title: "NutriBlends Co. - Production Performance Dashboard",
    category: "Business Analytics",
    description:
      "An interactive Google Looker Studio dashboard analyzing production performance metrics including revenue, costs, profit margins, and profitability by product. Features real-time KPIs, cost analysis, and product performance comparisons.",
    imageSrc: "/solutions/Analytics.png",
    projectLink: "https://lookerstudio.google.com/u/0/reporting/347073ab-1f44-432d-9ff1-03492168f8e7/page/p_zeu7qguuxd",
  },
];

const FILTER_CATEGORIES = ["All", "Web Development", "Business Analytics"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? ProjEntriesData
      : ProjEntriesData.filter((proj) => proj.category === selectedCategory);

  return (
    <>
      <main className="flex-grow flex flex-col items-center h-full relative pt-20">
        {/* Background animation - hidden on mobile */}
        <div
          className="hidden md:block"
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            top: "0",
            zIndex: -1,
            opacity: 0.5,
          }}
        >
          <Threads amplitude={2.5} distance={0} enableMouseInteraction={false} />
        </div>

        {/* Header Section */}
        <div className="flex w-full items-center justify-center p-4">
          <BlurText
            text="Projects"
            delay={50}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-3xl md:text-7xl font-extrabold text-center"
          />
        </div>

        <RollingGallery autoplay={true} pauseOnHover={false} />

        {/* Description Section */}
        <div className="flex flex-col w-full max-w-5xl mx-auto p-4 md:p-4 my-10 md:my-20">
          {/* Desktop Falling Text */}
          <div className="hidden md:block">
            <FallingText
              text="Here are some of the projects I’ve worked on:"
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="2rem"
              mouseConstraintStiffness={0.9}
            />
          </div>

          {/* Mobile Falling Text */}
          <div className="md:hidden mb-10">
            <FallingText
              text="Here are some of the projects I’ve worked on:"
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="1rem"
              mouseConstraintStiffness={0.9}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 my-10 md:my-16 justify-center md:justify-start">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "border border-white/30 text-white hover:border-white/60 hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Render Projects */}
          <div className="mt-20 md:mt-40 space-y-20">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((entry) => (
                <ProjectEntry
                  key={entry.entryNumber}
                  entryNumber={entry.entryNumber}
                  title={entry.title}
                  description={entry.description}
                  imageSrc={entry.imageSrc}
                  projectLink={entry.projectLink}
                />
              ))
            ) : (
              <div className="text-center text-white/50 py-20">
                <p className="text-lg">
                  No projects found in the {selectedCategory} category.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="flex w-full items-center justify-center p-4 border-t border-white/[.15] text-white/50 text-sm font-light mt-20">
        <p>
          &copy; {new Date().getFullYear()} Jeicel Mae A. Ortega. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
