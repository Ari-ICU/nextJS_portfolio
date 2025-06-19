"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { inject, track } from "@vercel/analytics";
import Image from "next/image";



const texts = [
  "Crafting modern web experiences with React, Next.js, and a passion for design.",
  "Building responsive and accessible user interfaces.",
  "Creating smooth animations with Framer Motion.",
  "Delivering performant, scalable web applications.",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    inject();
    track("Contact Section Viewed");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      viewport={{ once: true }}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20 py-12"
    >
      <div className=" max-w-7xl mx-auto px-8  flex flex-col md:flex-row gap-10 items-center justify-center ">
        {/* Right Side - Image (Appears on top in mobile) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-full order-1 md:order-2 md:mt-0"
      >
        <Image
          src="/assets/p1.png"
          alt="Hero Illustration"
          width={500}
          height={368}
          className="w-full h-92 rounded-3xl shadow-2xl object-cover"
          priority
        />
      </motion.div>

      {/* Left Side - Text (Appears below image in mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-full text-center md:text-left space-y-6 order-2 md:order-1 mt-8 md:mt-0"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Hi, I'm{" "}
          <span className="text-amber-500 underline decoration-2 decoration-amber-400">
            Thoeurn Ratha
          </span>
        </h1>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-2xl font-light text-gray-300 min-h-[72px]"
            aria-live="polite"
          >
            {texts[index]}
          </motion.p>
        </AnimatePresence>
        <motion.a
          href="#contact"
          className="inline-block bg-amber-500 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg shadow-amber-500/50 hover:bg-amber-600 transition transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
          aria-label="Get in Touch"
        >
          Get in Touch
        </motion.a>
      </motion.div>
      </div>
    </motion.section>
  );
}
