"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { i18n } from '../i18n.config';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Zamykanie menu po kliknięciu gdziekolwiek indziej na stronie
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!pathname) return null;

    // Wyciągamy obecny język z adresu (np. "pl" z "/pl/projects")
    const currentLocale = pathname.split('/')[1];

    // Funkcja dynamicznie podmieniająca prefix językowy w URL
    const getTargetUrl = (targetLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = targetLocale;
        return segments.join('/');
    };

    // Zapis i zamknięcie menu
    const handleLanguageChange = (targetLocale: string) => {
        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
        setIsOpen(false);
    };

    // Opcjonalnie: Słownik pełnych nazw, żeby w menu pisało "Polski" a nie tylko "PL"
    const languageNames: Record<string, string> = {
        pl: "Polski",
        en: "English",
        de: "Deutsch", // Gotowe na przyszłość
        es: "Español",
        fr: "Français"
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Przycisk Główny */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/40 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 hover:bg-gray-800 backdrop-blur-md transition-all font-bold text-sm uppercase shadow-lg"
                aria-label="Wybierz język"
            >
                {currentLocale}
            </button>

            {/* Rozwijane Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-32 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50">
                    {/* Mapujemy wszystkie języki zdefiniowane w i18n.config.ts */}
                    {i18n.locales.map((locale) => (
                        <Link
                            key={locale}
                            href={getTargetUrl(locale)}
                            onClick={() => handleLanguageChange(locale)}
                            className={`block px-4 py-2 text-sm transition-colors ${
                                currentLocale === locale 
                                ? "text-blue-400 font-bold bg-gray-800/50" 
                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                            }`}
                        >
                            {languageNames[locale] || locale.toUpperCase()}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
