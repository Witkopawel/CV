"use client";

import { useEffect, useState } from "react";

// Dopasowany, klimatyczny log startowy
const fullText = `> SYSTEM_BOOT_SEQUENCE_INIT...
> OS: ARCH_LINUX // CORE_LOADED
> MOUNTING_ENV: UNITY_VR, NEXT.JS, DJANGO
> COMPILING_C#_SCRIPTS... OK.
> STARTING_DOCKER_DAEMON...
> RENDER_ENGINE_ONLINE.`;

// Konsekwentnie używamy split('') do operowania na znakach
const chars = fullText.split('');

export default function ProjectTransition() {
    const [displayedText, setDisplayedText] = useState("");
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Punkt startowy pisania (znika strzałka Hero)
            const startScroll = 50;
            // Koniec pisania (moment, w którym jesteś już nad karuzelą)
            const endScroll = 500;

            if (scrollY < startScroll) {
                setDisplayedText("");
                setOpacity(1);
                return;
            }

            // Generowanie tekstu
            const progress = Math.min(1, (scrollY - startScroll) / (endScroll - startScroll));
            const charCount = Math.floor(progress * chars.length);
            setDisplayedText(chars.slice(0, charCount).join(''));

            // Fade-out: kiedy użytkownik zaczyna zjeżdżać niżej w głąb projektów (np. scroll > 700px), 
            // tekst powoli i naturalnie zanika, by nie śmiecić tła karuzeli
            if (scrollY > 700) {
                setOpacity(Math.max(0, 1 - (scrollY - 780) / 300));
            } else {
                setOpacity(1);
            }
        };

        // { passive: true } poprawia wydajność event listenera podczas scrollowania
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        /* 
            Kluczowa zmiana architektoniczna:
            - absolute i top-[100vh] ustawia element dokładnie na łączeniu sekcji.
            - -translate-y-1/2 przesuwa go do góry o połowę własnej wysokości, więc w połowie leży na Hero, a w połowie na Projektach.
            - z-[15] gwarantuje, że prześwituje nad tłami obu sekcji, ale pod tekstami.
            - pointer-events-none sprawia, że jest całkowicie "przezroczysty" dla myszki.
        */
        <div
            className="absolute top-[85vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-none z-[15] pointer-events-none flex justify-center overflow-hidden transition-opacity duration-300"
            style={{ opacity: opacity }}
        >
            {/* 
                Stylizacja tła: ogromna czcionka, niska przezroczystość (text-slate-500/10).
                Maska radialna sprawia, że krawędzie tekstu gładko giną w mroku.
            */}
            <pre className="font-mono text-2xl md:text-3xl lg:text-5xl font-bold text-emerald-500/4 whitespace-pre-wrap leading-tight tracking-widest text-center">
                {displayedText}

                {/* Olbrzymi kursor terminalowy */}
                {displayedText.length > 0 && displayedText.length < chars.length && (
                    <span className="animate-pulse inline-block w-4 h-8 md:w-8 md:h-16 bg-emerald-500/20 ml-2 align-middle"></span>
                )}
            </pre>
        </div>
    );
}