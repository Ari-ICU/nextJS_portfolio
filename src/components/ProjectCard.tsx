"use client";

import React from "react";
import { ExternalLink, Code, Server } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  type: "frontend" | "backend";
}

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const isFrontend = project.type === "frontend";

  return (
    <div
      className={`relative rounded-2xl shadow-lg overflow-hidden
        hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer
        w-full max-w-sm mx-auto bg-white
        ${isFrontend ? "border-l-4 border-indigo-500" : "border-t-4 border-emerald-500"}`}
    >
      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40 hover:opacity-20 transition-opacity duration-500 rounded-t-2xl" />
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
          aria-label={`Visit ${project.title}`}
        >
          <ExternalLink className={`w-6 h-6 ${isFrontend ? "text-indigo-700" : "text-emerald-700"}`} />
        </a>
      </div>

      <div className="p-6 flex flex-col space-y-2 min-h-[12rem]">
        <div className="flex items-center gap-2 text-sm uppercase font-semibold tracking-widest">
          {isFrontend ? (
            <Code className="w-4 h-4 text-indigo-600" />
          ) : (
            <Server className="w-4 h-4 text-emerald-600" />
          )}
          <span className={isFrontend ? "text-indigo-600" : "text-emerald-600"}>
            {project.type}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">{project.title}</h3>
        <p className="text-gray-700 text-base line-clamp-2">{project.description}</p>
      </div>
    </div>
  );
}
