"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showTopButton, setShowTopButton] = useState(false);

  // Debounced scroll handler for smoother button visibility
  useEffect(() => {
    interface DebounceFunction {
      (fn: () => void, delay: number): () => void;
    }

    const debounce: DebounceFunction = (fn, delay) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fn, delay);
      };
    };
    const handleScroll = debounce(() => {
      setShowTopButton(window.scrollY > 100); // Show button earlier (100px)
    }, 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {/* Fixed "Back to Top" Button */}
      <motion.a
        href="#home"
        role="button"
        aria-label="Back to Top"
        title="Return to top of page"
        initial="hidden"
        animate={showTopButton ? "visible" : "hidden"}
        className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-40 bg-amber-500/90 backdrop-blur-sm text-gray-900 font-semibold w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 ${showTopButton ? "" : "pointer-events-none"}`}
        whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 } }}
        whileTap={{ scale: 0.9 }}
        aria-hidden={!showTopButton}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 sm:h-7 sm:w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          whileHover="hover"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </motion.svg>
      </motion.a>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.6 }}
        viewport={{ once: true }}
        className="py-10  bg-gradient-to-tr from-gray-900 via-gray-800 to-amber-900/20 text-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold">
            © {new Date().getFullYear()} Thoeurn Ratha. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </>
  );
}