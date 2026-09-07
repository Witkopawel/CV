"use client";

import Link from "next/link";
import { useState } from "react";
import type { ApiProject } from "../lib/api"; // Bezpieczny import typu

const fallbackGradients = [
    "from-blue-600 to-purple-600",
    "from-emerald-500 to-teal-800",
    "from-orange-500 to-red-700",
    "from-indigo-600 to-blue-900"
];

export default function Projects({ initialProjects }: { initialProjects: ApiProject[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Awaryjny wygląd, gdy baza jest całkowicie pusta
    if (!initialProjects || initialProjects.length === 0) {
        return (
            <section id="projects" className="relative z-10 min-h-[50vh] bg-[#030712] py-20 flex flex-col justify-center items-center">
                <div className="w-full max-w-2xl bg-gray-900/40 border border-gray-800 rounded-2xl p-10 text-center backdrop-blur-sm">
                    <div className="inline-block p-4 rounded-full bg-gray-800/50 mb-4">
                        <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full inline-block"></span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Brak projektów w bazie</h3>
                    <p className="text-gray-400 text-sm">Zaloguj się do panelu Django (127.0.0.1:8000/admin) i dodaj pierwszy projekt, aby aktywować moduł 3D.</p>
                </div>
            </section>
        );
    }

    const nextSlide = () => setCurrentSlide((prev) => (prev === initialProjects.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? initialProjects.length - 1 : prev - 1));
    const setSlide = (index: number) => setCurrentSlide(index);

    return (
        <section id="projects" className="relative z-10 min-h-screen bg-[#030712] py-20 px-4 flex flex-col justify-center items-center overflow-hidden">
            <div className="relative z-20 text-center mb-12 md:mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Wybrane <span className="text-blue-500">Projekty</span></h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6 opacity-50"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-[550px] md:h-[450px] [perspective:2000px]">
                {initialProjects.map((project, index) => {
                    const isCurrent = index === currentSlide;
                    const isPrev = index === (currentSlide - 1 + initialProjects.length) % initialProjects.length;
                    const isNext = index === (currentSlide + 1) % initialProjects.length;
                    
                    let positionClass = "opacity-0 z-0 pointer-events-none [transform:translateX(0)_scale(0.5)_rotateY(180deg)]";
                    
                    if (isCurrent) positionClass = "opacity-100 z-20 [transform:translateX(0)_scale(1)_rotateY(0deg)]";
                    else if (isPrev) positionClass = "opacity-20 hover:opacity-40 blur-[2px] z-10 cursor-pointer [transform:translateX(-65%)_scale(0.85)_rotateY(35deg)] md:[transform:translateX(-50%)_scale(0.8)_rotateY(40deg)]";
                    else if (isNext) positionClass = "opacity-20 hover:opacity-40 blur-[2px] z-10 cursor-pointer [transform:translateX(65%)_scale(0.85)_rotateY(-35deg)] md:[transform:translateX(50%)_scale(0.8)_rotateY(-40deg)]";

                    const gradient = fallbackGradients[project.id % fallbackGradients.length];

                    return (
                        <div key={project.id} onClick={() => { if (isPrev) prevSlide(); if (isNext) nextSlide(); }} className={`absolute w-full md:w-[75%] lg:w-[60%] h-full transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] ${positionClass}`}>
                            <div className="w-full h-full flex flex-col md:flex-row items-stretch bg-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
                                <div className={`w-full md:w-5/12 h-48 md:h-full bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden`}>
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
                                    ) : (
                                        <span className="relative z-10 text-white/50 font-bold text-xl uppercase tracking-widest text-center">Bez Wizualizacji</span>
                                    )}
                                </div>
                                <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center relative">
                                    <span className="text-blue-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">{project.technology_stack}</span>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">{project.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 flex-grow line-clamp-4">{project.description}</p>
                                    <div className={!isCurrent ? "pointer-events-none" : ""}>
                                        <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full font-medium transition-colors border border-white/5 text-sm md:text-base">
                                            Przeanalizuj kod
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <button onClick={prevSlide} className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-30 shadow-xl">
                    <svg className="w-6 h-6 pr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextSlide} className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-30 shadow-xl">
                    <svg className="w-6 h-6 pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            <div className="flex justify-center gap-3 mt-12 md:mt-20 z-20 relative">
                {initialProjects.map((_, index) => (
                    <button key={index} onClick={() => setSlide(index)} className={`h-2 rounded-full transition-all duration-500 ${currentSlide === index ? "bg-blue-500 w-8" : "bg-gray-700 w-2 hover:bg-gray-500"}`} />
                ))}
            </div>
        </section>
    );
}