"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { inject, track } from "@vercel/analytics";
import ProjectCard from "./ProjectCard";

// Define the Project type
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
    title: "Frontend department of CS ",
    description: "A responsive frontend website for the CS department, built with React.js and Tailwind CSS. Features smooth animations using Framer Motion and a clean, modern UI.",
    link: "https://csd-website-xi.vercel.app/home",
    image: "/assets/rupp.png",
    type: "frontend",
  },
  {
    id: "2",
    title: "Admin Dashboard",
    description: "A responsive admin dashboard using React.js, connected to a Laravel REST API with authentication and API token security for admin access only.",
    link: "https://csd-dashboard.vercel.app/menu",
    image: "/assets/dashboard.png",
    type: "frontend",
  },
  {
    id: "3",
    title: "E-commerce Template",
    description: "A responsive React-based e-commerce frontend using a template and integrated with a Fake API for product and cart simulation.",
    link: "https://ecommerce-react-template-name-furni.vercel.app/",
    image: "/assets/rtemplate.png",
    type: "frontend",
  },
   {
    id: "4",
    title: "E-commerce Template",
    description: "A responsive React-based e-commerce frontend using a template and integrated with a Fake API for product and cart simulation.",
    link: "https://react-template-seven-ochre.vercel.app/",
    image: "/assets/rt.png",
    type: "frontend",
  },
   {
    id: "5",
    title: "Tic Tac Toe Game",
    description: "A simple and interactive Tic Tac Toe game built with React.js, featuring responsive design and clean state management.",
    link: "https://github.com/Ari-ICU/JS_Tic-Tac-Toe",
    image: "/assets/ox.png",
    type: "frontend",
  },
  {
    id: "6",
    title: "School Management API",
    description: "A Laravel-based API for managing school records, including student profiles and attendance tracking.",
    link: "#",
    image: "/assets/api.png",
    type: "backend",
  },
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};


export default function Projects() {
  const [projects] = useState(initialProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  useEffect(() => {
    inject();
    track("Projects Section Viewed");
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-full sm:max-w-3xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            My Projects
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
            Explore a collection of my work, showcasing innovative frontend dashboards and client-side applications.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6 sm:gap-8"
        >
          {currentProjects.map((project) => (
            <motion.div key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-8 sm:mt-10 lg:mt-12 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300
                  ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-indigo-100 border border-gray-300"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}