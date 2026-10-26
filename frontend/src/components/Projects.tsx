"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "../lib/dictionaries";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image?: string | null;
    technology_stack?: string;
    placeholderGradient?: string;
    link?: string;
}

interface ProjectsProps {
    initialProjects: Project[];
    dict: Dictionary['projects'];
    lang: string;
}

export default function Projects({ initialProjects, dict, lang }: ProjectsProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const projectsData = initialProjects || [];

    const nextSlide = () => {
        if (projectsData.length === 0) return;
        setCurrentSlide((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (projectsData.length === 0) return;
        setCurrentSlide((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
    };

    const setSlide = (index: number) => {
        setCurrentSlide(index);
    };

    if (projectsData.length === 0) {
        return (
            <section id="projects" className="relative z-10 min-h-screen bg-[#030712] py-20 px-4 flex justify-center items-center">
                <p className="text-gray-400 text-lg">Brak projektów / No projects</p>
            </section>
        );
    }

    return (
        <section id="projects" className="relative z-10 min-h-screen bg-[#030712] py-20 px-4 flex flex-col justify-center items-center overflow-hidden">

            <div className="relative z-20 text-center mb-12 md:mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {dict.titleStart} <span className="text-blue-500">{dict.titleHighlight}</span>
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6 opacity-50"></div>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
                    {dict.subtitle}
                </p>
            </div>

            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-[550px] md:h-[450px] [perspective:2000px]">

                {projectsData.map((project, index) => {
                    const isCurrent = index === currentSlide;
                    const isPrev = index === (currentSlide - 1 + projectsData.length) % projectsData.length;
                    const isNext = index === (currentSlide + 1) % projectsData.length;

                    let positionClass = "opacity-0 z-0 pointer-events-none [transform:translateX(0)_scale(0.5)_rotateY(180deg)]";

                    if (isCurrent) {
                        positionClass = "opacity-100 z-20 [transform:translateX(0)_scale(1)_rotateY(0deg)]";
                    } else if (isPrev) {
                        positionClass = "opacity-20 hover:opacity-40 blur-[2px] z-10 cursor-pointer [transform:translateX(-65%)_scale(0.85)_rotateY(35deg)] md:[transform:translateX(-50%)_scale(0.8)_rotateY(40deg)]";
                    } else if (isNext) {
                        positionClass = "opacity-20 hover:opacity-40 blur-[2px] z-10 cursor-pointer [transform:translateX(65%)_scale(0.85)_rotateY(-35deg)] md:[transform:translateX(50%)_scale(0.8)_rotateY(-40deg)]";
                    }

                    return (
                        <div
                            key={project.id}
                            onClick={() => {
                                if (isPrev) prevSlide();
                                if (isNext) nextSlide();
                            }}
                            className={`absolute w-full md:w-[75%] lg:w-[60%] h-full transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] ${positionClass}`}
                        >
                            <div className="w-full h-full flex flex-col md:flex-row items-stretch bg-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

                                <div className={`w-full md:w-5/12 h-48 md:h-full bg-gradient-to-br ${project.placeholderGradient || "from-blue-500 to-purple-600"} relative flex items-center justify-center`}>
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                                            <span className="relative z-10 text-white/50 font-bold text-xl md:text-2xl uppercase tracking-widest text-center">
                                                Preview
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center relative">
                                    <span className="text-blue-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className={!isCurrent ? "pointer-events-none mt-6" : "mt-6"}>
                                        <Link 
                                            href={`/${lang}/projects/${project.id}`} 
                                            className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                                        >
                                            <span>{dict?.viewProject || "Zobacz projekt"}</span>
                                            <svg 
                                                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })}

                <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 transition-colors"
                    aria-label="Poprzedni projekt"
                >
                    <svg className="w-6 h-6 md:w-7 md:h-7 pr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 transition-colors"
                    aria-label="Następny projekt"
                >
                    <svg className="w-6 h-6 md:w-7 md:h-7 pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

            </div>

            <div className="flex justify-center gap-3 mt-12 md:mt-20 z-20 relative">
                {projectsData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setSlide(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${currentSlide === index ? "bg-blue-500 w-8" : "bg-gray-700 w-2 hover:bg-gray-500"}`}
                        aria-label={`Przejdź do projektu ${index + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}
