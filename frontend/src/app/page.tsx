// Typowanie dla TypeScript, aby edytor podpowiadał nam pola
interface Project {
  id: number;
  title: string;
  description: string;
  technology_stack: string;
  github_url: string;
  created_at: string;
}

// Funkcja asynchroniczna do pobierania danych z API Django
async function getProjects() {
  // NEXT_PUBLIC_API_URL jest czytane z pliku .env.local (http://localhost:8000)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/`, {
    cache: 'no-store' // Wymusza pobieranie świeżych danych przy każdym odświeżeniu
  });
  
  if (!res.ok) {
    throw new Error('Nie udało się pobrać danych z API');
  }
  
  return res.json();
}

export default async function Home() {
  const projects: Project[] = await getProjects();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-gray-700 pb-6">
          <h1 className="text-5xl font-bold text-blue-400 mb-3">Moje Portfolio</h1>
          <p className="text-xl text-gray-400">Projekty, prototypy i eksploracje technologiczne</p>
        </header>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-lg">Nie masz jeszcze żadnych projektów.</p>
            <p className="text-gray-500 text-sm mt-2">Dodaj je w panelu administratora Django.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <article 
                key={project.id} 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col"
              >
                <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
                <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mt-auto">
                  <div className="mb-6 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Technologie:
                    </span>
                    <p className="text-blue-300 font-medium">
                      {project.technology_stack}
                    </p>
                  </div>
                  
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                      Zobacz kod źródłowy
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}