"use client";

import { motion } from "framer-motion";
import { Github, Facebook, Send } from "lucide-react";
import { useEffect } from "react";
import { inject, track } from "@vercel/analytics";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/Ari-ICU",
    icon: <Github size={28} />,
  },
  {
    name: "Telegram",
    url: "https://t.me/JFrog_Wp",
    icon: <Send size={28} />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/n.jfrog/",
    icon: <Facebook size={28} />,
  },
];

export default function Contact() {
  useEffect(() => {
    inject();
    track("Contact Section Viewed");
  }, []);

  const socialItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.7,
          }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg px-4 sm:px-8"
        >
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-10 p-8">
            {/* Left Side */}
            <div className="text-center md:text-left max-w-lg">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-8">
                I’m open to new opportunities and collaborations. Let’s connect
                via email or social media!
              </p>
              <motion.a
                href="mailto:thoeurn.ratha.kh@gmail.com"
                className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl shadow-md hover:bg-indigo-700 transition"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send email"
                onClick={() => track("Email Clicked")}
              >
                Email Me
              </motion.a>
            </div>

            {/* Right Side */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {socials.map(({ name, url, icon }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-gray-600 hover:text-indigo-600 transition transform hover:scale-110"
                  variants={socialItemVariants}
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300, damping: 10 },
                  }}
                  onClick={() => track(`${name} Clicked`)}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
