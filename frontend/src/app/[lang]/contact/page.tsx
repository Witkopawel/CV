export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getDictionary } from "../../../lib/dictionaries";
import ContactForm from "../../../components/ContactForm";
import type { Locale } from "../../../i18n.config";

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const resolvedParams = await params;
    const lang = resolvedParams.lang;
    const dict = await getDictionary(lang);
    const contactDict = dict.contactForm;

    return (
        <main className="min-h-screen bg-[#030712] font-sans overflow-x-hidden text-gray-100 selection:bg-blue-500/30 flex items-center justify-center relative py-20 px-4 sm:px-6 lg:px-8">

            {/* Tło - spójne z komponentem Hero (TWÓJ KOD) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
                <div className="absolute inset-0 bg-gray-950/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000_100%)]"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                {/* Lewa kolumna: Tekst i informacje kontaktowe */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    
                    {/* Dodałem guzik powrotu na górze dla wygody użytkownika (opcjonalne) */}
                    <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 mb-8 font-medium text-sm tracking-widest uppercase transition-colors">
                        ← {dict.projectsList.backHome}
                    </Link>

                    <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-md shadow-2xl">
                        <span className="text-[11px] sm:text-xs font-semibold text-gray-300 uppercase tracking-widest">
                            {contactDict.badge}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                        {contactDict.titleStart} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                            {contactDict.titleHighlight}
                        </span>
                    </h1>

                    <p className="mt-2 text-lg text-gray-400 max-w-lg font-light tracking-wide mb-10">
                        {contactDict.description}
                    </p>

                    {/* Bezpośrednie linki (Socials) */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                        <Link href="mailto:twoj@email.com" className="inline-flex items-center justify-center gap-3 text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-md">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {contactDict.emailBtn}
                        </Link>
                        <Link href="https://github.com/TwojGithub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-md">
                            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.684-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
                            {contactDict.githubBtn}
                        </Link>
                    </div>
                </div>

                {/* Prawa kolumna: Tło formularza (Glassmorphism) i Formularz */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        
                        {/* Wstrzyknięcie komponentu klienta z formularzem */}
                        <ContactForm dict={contactDict} />
                        
                    </div>
                </div>

            </div>
        </main>
    );
}
