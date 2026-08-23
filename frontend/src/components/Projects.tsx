"use client";

import Link from "next/link";
import { useState } from "react";
// Dostosuj ścieżkę w zależności od dokładnej struktury, np. "../data/projects.json"
import projectsDataRaw from "../../data/projects.json";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    placeholderGradient: string;
    link: string;
}

const projectsData = projectsDataRaw as Project[];

export default function Projects() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
    };

    const setSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section id="projects" className="relative z-10 min-h-screen bg-[#030712] py-20 px-4 flex flex-col justify-center items-center overflow-hidden">

            <div className="relative z-20 text-center mb-12 md:mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Wybrane <span className="text-blue-500">Projekty</span></h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6 opacity-50"></div>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
                    Przekrój moich kompetencji: od silników gier i wirtualnej rzeczywistości, przez skonteneryzowany backend, aż po układy sprzętowe.
                </p>
            </div>

            {/* Kontener perspektywy 3D - kluczowy dla efektu "rolki" */}
            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-[550px] md:h-[450px] [perspective:2000px]">

                {projectsData.map((project, index) => {
                    // Logika obliczająca pozycję na "rolce"
                    const isCurrent = index === currentSlide;
                    const isPrev = index === (currentSlide - 1 + projectsData.length) % projectsData.length;
                    const isNext = index === (currentSlide + 1) % projectsData.length;

                    // Domyślny stan dla kart, które są ukryte z tyłu
                    let positionClass = "opacity-0 z-0 pointer-events-none [transform:translateX(0)_scale(0.5)_rotateY(180deg)]";

                    if (isCurrent) {
                        // Karta aktywna (na samym środku przodu)
                        positionClass = "opacity-100 z-20 [transform:translateX(0)_scale(1)_rotateY(0deg)]";
                    } else if (isPrev) {
                        // Karta poprzednia (po lewej, lekko z tyłu, obrócona)
                        positionClass = "opacity-20 hover:opacity-40 blur-[2px] z-10 cursor-pointer [transform:translateX(-65%)_scale(0.85)_rotateY(35deg)] md:[transform:translateX(-50%)_scale(0.8)_rotateY(40deg)]";
                    } else if (isNext) {
                        // Karta następna (po prawej, lekko z tyłu, obrócona)
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
                            {/* Zawartość Karty */}
                            <div className="w-full h-full flex flex-col md:flex-row items-stretch bg-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

                                {/* Część Wizualna (Obraz) */}
                                <div className={`w-full md:w-5/12 h-48 md:h-full bg-gradient-to-br ${project.placeholderGradient} relative flex items-center justify-center`}>
                                    <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                                    <span className="relative z-10 text-white/50 font-bold text-xl md:text-2xl uppercase tracking-widest text-center">
                                        Miejsce na<br />Zdjęcie
                                    </span>
                                </div>

                                {/* Część Tekstowa */}
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

                                    <div className={!isCurrent ? "pointer-events-none" : ""}>
                                        <Link href={project.link} className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full font-medium transition-colors border border-white/5 text-sm md:text-base">
                                            Przeanalizuj kod
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })}

                {/* --- STRZAŁKI NAWIGACYJNE --- */}
                {/* Z-index: 30 gwarantuje, że przyciski są zawsze na samym wierzchu */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all z-30 backdrop-blur-md shadow-xl"
                    aria-label="Poprzedni projekt"
                >
                    <svg className="w-6 h-6 md:w-7 md:h-7 pr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all z-30 backdrop-blur-md shadow-xl"
                    aria-label="Następny projekt"
                >
                    <svg className="w-6 h-6 md:w-7 md:h-7 pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

            </div>

            {/* Kropki nawigacyjne */}
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