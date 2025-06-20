"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { Variants } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const navItems = ["Home", "About", "Projects", "Badges-Certificates", "Contact"];
  const sectionIds = navItems.map((item) => item.toLowerCase());

  // Debounced scroll handler for background
  useEffect(() => {
    const debounce = (fn: () => void, delay: number) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, delay);
      };
    };
    const debouncedHandleScroll = debounce(() => setScrolled(window.scrollY > 20), 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const item = navItems.find(
              (navItem) => navItem.toLowerCase() === id
            );
            if (item) {
              setActiveItem(item);
              window.history.replaceState(null, "", `#${id}`);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.3,
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const item = navItems.find((i) => i.toLowerCase() === hash);
      setActiveItem(item || "Home");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [navItems]);

  const containerVariants: Variants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    closed: { opacity: 0, y: 20, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="font-bold text-2xl tracking-tight">
          <Link href="/">
            <span className={scrolled ? "text-amber-700" : "text-amber-600"}>Thoeurn</span>{" "}
            <span className={scrolled ? "text-gray-800" : "text-gray-400"}>Ratha</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`group relative text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                activeItem === item
                  ? "text-amber-600"
                  : scrolled
                  ? "text-gray-800"
                  : "text-gray-400"
              } hover:text-amber-600`}
              aria-current={activeItem === item ? "page" : undefined}
            >
              {item}
              <motion.span
                className="absolute left-0 bottom-0 h-0.5 bg-amber-600"
                initial={{ width: activeItem === item ? "100%" : "0%" }}
                animate={{ width: activeItem === item ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-gray-400 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-md p-1"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-full bg-white shadow-lg p-8 flex flex-col space-y-8 text-lg z-50"
          >
            <div className="flex justify-between items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="font-bold text-2xl tracking-tight">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <span className="text-amber-600">Thoeurn</span>{" "}
                  <span className="text-gray-400">Ratha</span>
                </Link>
              </motion.div>
              <button
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-md p-1"
              >
                <X size={28} />
              </button>
            </div>

            <motion.div variants={containerVariants} initial="closed" animate="open" exit="closed" className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  variants={itemVariants}
                  onClick={() => {
                    setIsOpen(false);
                    setActiveItem(item);
                  }}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    activeItem === item ? "text-amber-600" : "text-gray-800"
                  } hover:text-amber-600`}
                  aria-current={activeItem === item ? "page" : undefined}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}