"use client";

import { useEffect, useState } from "react";

const fullText = `> SYSTEM_BOOT_SEQUENCE_INIT...
> OS: ARCH_LINUX
> MOUNTING_ENV: UNITY_VR, NEXT.JS, DJANGO
> COMPILING_C#_SCRIPTS... OK.
> STARTING_DOCKER_DAEMON...
> STILL READING? NICE.`;

const chars = fullText.split('');

export default function ProjectTransition() {
    const [displayedText, setDisplayedText] = useState("");
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const startScroll = 50;
            const endScroll = 500;

            if (scrollY < startScroll) {
                setDisplayedText("");
                setOpacity(1);
                return;
            }
            const progress = Math.min(1, (scrollY - startScroll) / (endScroll - startScroll));
            const charCount = Math.floor(progress * chars.length);
            setDisplayedText(chars.slice(0, charCount).join(''));

            if (scrollY > 700) {
                setOpacity(Math.max(0, 1 - (scrollY - 780) / 300));
            } else {
                setOpacity(1);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (

        <div
            className="absolute top-[85vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-none z-[15] pointer-events-none flex justify-center overflow-hidden transition-opacity duration-300"
            style={{ opacity: opacity }}
        >
            <pre className="font-mono text-2xl md:text-3xl lg:text-5xl font-bold text-emerald-500/4 whitespace-pre-wrap leading-tight tracking-widest text-center">
                {displayedText}
                {displayedText.length > 0 && displayedText.length < chars.length && (
                    <span className="animate-pulse inline-block w-4 h-8 md:w-8 md:h-16 bg-emerald-500/20 ml-2 align-middle"></span>
                )}
            </pre>
        </div>
    );
}
