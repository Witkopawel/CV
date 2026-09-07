import Link from "next/link";
import { getProjects } from "../../lib/api";

export default async function ProjectsListPage() {
    const projects = await getProjects();
    const fallbackGradients = ["from-blue-600 to-purple-600", "from-emerald-500 to-teal-800", "from-orange-500 to-red-700", "from-indigo-600 to-blue-900"];

    return (
        <main className="min-h-screen bg-[#030712] font-sans text-gray-100 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mb-16">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 mb-8 font-medium text-sm tracking-widest uppercase">
                    Wróć do bazy
                </Link>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
                    Katalog <span className="text-blue-500">Projektów</span>
                </h1>
            </div>

            {projects.length === 0 ? (
                <p className="text-center text-gray-500 py-10">Baza projektów jest pusta.</p>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link href={`/projects/${project.id}`} key={project.id} className="group flex flex-col bg-gray-900/40 border border-gray-800 hover:border-gray-600 rounded-3xl overflow-hidden backdrop-blur-sm transition-all hover:-translate-y-2">
                            <div className={`w-full h-48 bg-gradient-to-br ${fallbackGradients[project.id % fallbackGradients.length]} relative flex items-center justify-center overflow-hidden`}>
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-500 group-hover:scale-105" />
                                ) : (
                                    <span className="relative z-10 text-white/50 font-bold uppercase tracking-widest">Podgląd</span>
                                )}
                            </div>
                            <div className="p-8 flex flex-col flex-grow bg-[#030712]/50">
                                <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">{project.technology_stack}</span>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400">{project.title}</h3>
                                <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}