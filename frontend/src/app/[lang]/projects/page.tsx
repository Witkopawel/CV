export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getProjects } from "../../../lib/api";
import { getDictionary } from "../../../lib/dictionaries";
import type { Locale } from "../../../i18n.config";

export default async function ProjectsListPage({
    params
}: {
    params: Promise<{ lang: Locale }>
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const projects = await getProjects(lang).catch(() => []);
    const fallbackGradients = [
        "from-blue-600 to-purple-600", 
        "from-emerald-500 to-teal-800", 
        "from-orange-500 to-red-700", 
        "from-indigo-600 to-blue-900"
    ];

    return (
        <main className="min-h-screen bg-[#030712] font-sans text-gray-100 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mb-16">
                <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 mb-8 font-medium text-sm tracking-widest uppercase transition-colors">
                    ← {dict.projectsList.backHome}
                </Link>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
                    {dict.projectsList.titleStart} <span className="text-blue-500">{dict.projectsList.titleHighlight}</span>
                </h1>
            </div>

            {projects.length === 0 ? (
                <p className="text-center text-gray-500 py-10">{dict.projectsList.empty}</p>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link href={`/${lang}/projects/${project.id}`} key={project.id} className="group flex flex-col bg-gray-900/40 border border-gray-800 hover:border-gray-600 rounded-3xl overflow-hidden backdrop-blur-md transition-all">
                            <div className={`w-full h-48 bg-gradient-to-br ${fallbackGradients[project.id % fallbackGradients.length]} relative flex items-center justify-center overflow-hidden`}>
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <span className="relative z-10 text-white/50 font-bold uppercase tracking-widest">{dict.projectsList.preview}</span>
                                )}
                            </div>
                            <div className="p-8 flex flex-col flex-grow bg-[#030712]/50">
                                <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">{project.technology_stack || project.category}</span>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
