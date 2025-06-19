"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { inject, track } from "@vercel/analytics";
import { useEffect } from "react";

import ProjectCard from "./ProjectCard";

// Define the Project type locally if not exported from ProjectCard
type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  type: "frontend" | "backend";
};


const initialProjects: Project[] = [
  {
    id: "1",
    title: "Frontend Portfolio",
    description: "A web app built with Next.js and Tailwind CSS.",
    link: "https://example.com",
    image: "/placeholder.jpg",
    type: "frontend",
  },
  {
    id: "2",
    title: "Admin Dashboard",
    description: "A mobile-friendly dashboard using React.",
    link: "https://example.com",
    image: "/placeholder.jpg",
    type: "frontend",
  },
  {
    id: "3",
    title: "E-commerce API",
    description: "An e-commerce platform with Laravel backend.",
    link: "https://example.com",
    image: "/placeholder.jpg",
    type: "backend",
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};



export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
   useEffect(() => {
      inject();
      track("Contact Section Viewed");
    }, []);
    
  return (
    <section id="projects" className="py-16 ">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center text-gray-900 mb-16"
        >
          My Projects
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project) => (
            <motion.div key={project.id} >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
