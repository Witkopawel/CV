import Link from "next/link";
import { getProjects } from "../../../../lib/api";
import { getDictionary } from "../../../../lib/dictionaries";
import type { Locale } from "../../../../i18n.config";

export const dynamic = 'force-dynamic';

const getLocalized = (fieldObj: Record<string, string> | string | undefined, lang: string) => {
    if (!fieldObj) return "";
    if (typeof fieldObj === 'string') return fieldObj;

    return fieldObj[lang] || fieldObj['en'] || Object.values(fieldObj)[0] || "";
};

export default async function ProjectDetail({ params }: { params: Promise<{ lang: Locale; id: string }> }) {
    const resolvedParams = await params;
    const lang = resolvedParams.lang;
    const rawId = resolvedParams.id;

    const allProjects = await getProjects(lang);
    const project = allProjects.find(p => String(p.id) === String(rawId));

    if (!project) {
        return (
            <main className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-10 text-center font-sans">
                <div className="bg-gray-900/50 border border-gray-700 p-10 rounded-3xl max-w-xl backdrop-blur-md">
                    <span className="text-4xl mb-4 block">📡</span>
                    <h1 className="text-2xl font-bold text-white mb-4">Nie znaleziono projektu o ID: {rawId}</h1>
                    <p className="text-gray-400 mb-8">
                        Projekt nie znajduje się na liście pobranej z backendu.
                    </p>
                    <Link href={`/${lang}/projects`} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors border border-white/5 font-medium">
                        Wróć do katalogu projektów
                    </Link>
                </div>
            </main>
        );
    }

    const title = getLocalized(project.title, lang);
    const description = getLocalized(project.description, lang);

    return (
        <main className="min-h-screen bg-[#030712] font-sans text-gray-100 overflow-x-hidden selection:bg-blue-500/30">
            <nav className="absolute top-12 md:top-16 left-0 w-full p-6 md:p-10 z-50">
                <Link 
                    href={`/${lang}/projects`} 
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                    <svg 
                        className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Wszystkie projekty
                </Link>
            </nav>

            <section className="relative w-full h-[60vh] md:h-[70vh] bg-gray-900 flex items-end justify-center pb-16 md:pb-24 px-4 overflow-hidden">
                {project.image ? (
                    <img src={project.image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#030712] to-gray-900"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent"></div>

                <div className="relative z-10 max-w-5xl w-full text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
                        {project.technology_stack}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        {title}
                    </h1>
                </div>
            </section>

            <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-6">O projekcie</h2>
                            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-4">Technologie</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technology_stack?.split(',').map((tech: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm border border-gray-700">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.github_url && (
                            <div className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white mb-4">Kod źródłowy</h3>
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium transition-colors border border-white/5"
                                >
                                    Zobacz repozytorium
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
