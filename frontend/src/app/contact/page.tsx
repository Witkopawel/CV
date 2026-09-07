"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Tutaj w przyszłości dodasz strzał do API Django (np. POST /api/contact/)
        // Symulacja wysyłania:
        setTimeout(() => {
            setIsSubmitting(false);
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#030712] font-sans overflow-x-hidden text-gray-100 selection:bg-blue-500/30 flex items-center justify-center relative py-20 px-4 sm:px-6 lg:px-8">
            
            {/* Tło - spójne z komponentem Hero */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
                <div className="absolute inset-0 bg-gray-950/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000_100%)]"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                
                {/* Lewa kolumna: Tekst i informacje kontaktowe */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-md shadow-2xl">
                        <span className="text-[11px] sm:text-xs font-semibold text-gray-300 uppercase tracking-widest">
                            Otwarty na nowe wyzwania
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                        Zbudujmy coś <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                            NIESAMOWITEGO.
                        </span>
                    </h1>

                    <p className="mt-2 text-lg text-gray-400 max-w-lg font-light tracking-wide mb-10">
                        Masz pomysł na projekt, szukasz programisty do zespołu, czy po prostu chcesz pogadać o technologii, grach lub nowinkach? Zostaw wiadomość.
                    </p>

                    {/* Bezpośrednie linki (Socials) */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                        <Link href="mailto:twoj@email.com" className="inline-flex items-center justify-center gap-3 text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-md">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Wyślij e-mail
                        </Link>
                        <Link href="https://github.com/TwojGithub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-md">
                            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                            GitHub
                        </Link>
                    </div>
                </div>

                {/* Prawa kolumna: Formularz (Glassmorphism) */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        
                        {/* Subtelny glow wewnątrz formularza */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Twoje Imię</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#0a0f1c]/50 border border-gray-800 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="Jan Kowalski"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Adres E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#0a0f1c]/50 border border-gray-800 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="jan@example.com"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Wiadomość</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#0a0f1c]/50 border border-gray-800 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                                    placeholder="Opisz, o czym chcesz porozmawiać..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`mt-2 w-full inline-flex items-center justify-center gap-2 text-white bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl font-medium transition-all border border-white/5 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Wysyłanie...
                                    </>
                                ) : (
                                    <>
                                        Wyślij Wiadomość
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </>
                                )}
                            </button>

                            {/* Komunikaty o statusie wysyłania */}
                            {status === "success" && (
                                <div className="mt-2 text-center text-sm font-medium text-emerald-400 bg-emerald-400/10 py-2.5 rounded-lg border border-emerald-400/20">
                                    Wiadomość została wysłana! Odpowiem najszybciej jak to możliwe.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

            </div>
        </main>
    );
}