import Link from "next/link";
import type { Dictionary } from "../lib/dictionaries";

interface ContactProps {
    dict: Dictionary['hero']['ContactTeaser'];
    lang: string;
}

export default function ContactTeaser({ dict, lang }: ContactProps) {
    return (
        <section className="relative z-10 w-full bg-[#030712] py-32 px-4 sm:px-6 lg:px-8 flex justify-center items-center overflow-hidden">

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-gray-800 bg-gray-900/40 backdrop-blur-xl p-10 md:p-16 text-center shadow-2xl overflow-hidden group">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        {dict.teaserTitleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{dict.teaserTitleHighlight}</span>
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        {dict.teaserDescription}
                    </p>

                    {/* Przyciski Akcji */}
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">

                        <Link
                            href={`/${lang}/contact`}
                            className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-gray-100 text-gray-950 hover:bg-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)] hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {dict.teaserCta}
                        </Link>

                        <a
                            href="https://github.com/TwojProfil" // TODO: Zmień na swój link docelowy
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 rounded-full font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-700/50 transition-all hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            {dict.githubText}
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
}
