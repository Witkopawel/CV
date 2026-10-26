"use client";

import { useState, useEffect } from "react";
import type { Dictionary } from "../lib/dictionaries";

interface HeroProps {
    dict: Dictionary['hero'];
}

export default function Hero({ dict }: HeroProps) {
    const [isScrollIndicatorVisible, setIsScrollIndicatorVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrollIndicatorVisible(false);
            } else {
                setIsScrollIndicatorVisible(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
                <div className="absolute inset-0 bg-gray-950/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000_100%)]"></div>
                <div className="absolute bottom-0 left-0 w-full h-48 md:h-64 bg-gradient-to-b from-transparent to-[#030712]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-[-8vh]">
                <div className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-md shadow-2xl">
                    <span className="text-[11px] sm:text-xs font-semibold text-gray-300 uppercase tracking-widest">
                        {dict.badge}
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                    {dict.titleStart} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                        {dict.titleHighlight}
                    </span>
                </h1>

                <p className="mt-2 text-lg md:text-2xl text-gray-400 max-w-2xl font-light tracking-wide">
                    {dict.subtitle}
                </p>
            </div>

            {/* Wskaźnik Scrollowania */}
            <div
                className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce transition-opacity duration-500 ${isScrollIndicatorVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <button
                    onClick={scrollToProjects}
                    className="flex flex-col items-center group cursor-pointer bg-transparent border-none p-0 outline-none"
                    aria-label={dict.scrollAriaLabel}
                >
                    <span className="text-sm text-gray-500 font-medium mb-2 tracking-wider uppercase group-hover:text-blue-400 transition-colors">
                        {dict.scrollText}
                    </span>
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
