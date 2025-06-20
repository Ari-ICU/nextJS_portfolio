"use client";

import { motion } from "framer-motion";
import { inject, track } from "@vercel/analytics";
import { useEffect } from "react";
import type { Variants } from "framer-motion";
import Image from "next/image";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  useEffect(() => {
    inject();
    track("About Section Viewed");
  }, []);

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "PHP & Laravel",
    "Version Control (Git)",
    "Databases (SQL/NoSQL)",
    "REST API Development",
    "CMS (WordPress, Joomla)",
  ];

  return (
    <motion.section
      id="about"
      className="py-16 relative overflow-hidden"
      viewport={{ once: true }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          className="w-full h-full animate-pulse-slow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#818cf8"
            fillOpacity="0.2"
            d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,208C672,224,768,192,864,160C960,128,1056,96,1152,112C1248,128,1344,192,1392,224L1440,256L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-12 sm:mb-16"
        >
          About Me
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row bg-white/30 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          {/* Left side - Profile Image and Intro */}
          <motion.div
            variants={childVariants}
            className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-amber-700 p-8 sm:p-12 flex flex-col items-center justify-center"
          >
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white shadow-lg overflow-hidden mb-6 sm:mb-8 flex items-center justify-center"
              aria-label="Profile picture placeholder"
              role="img"
            >
            
😐
                {/* <Image src="/assets/p2.JPG" alt="" width={160} height={160} /> */}
            </div>
            <p className="text-white text-center text-base sm:text-lg leading-relaxed">
              Junior full-stack developer passionate about building modern web
              applications. Learning and working with React, Next.js, TypeScript
              on the frontend, and Node.js, Express, and Laravel on the backend.
            </p>
          </motion.div>

          {/* Right side - Skills */}
          <motion.div
            variants={childVariants}
            className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  tabIndex={0}
                  className="relative inline-block bg-indigo-100 text-indigo-800 font-medium text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 cursor-default overflow-hidden"
                  role="listitem"
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300, damping: 10 },
                  }}
                >
                  <span className="relative z-10">{skill}</span>
                  <motion.span
                    className="absolute inset-0 bg-indigo-300 opacity-0 rounded-full"
                    whileHover={{
                      opacity: 0.3,
                      scale: 2,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  />
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for slow pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.2;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>
    </motion.section>
  );
}
