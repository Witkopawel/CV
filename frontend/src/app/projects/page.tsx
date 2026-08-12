import { getProjects } from "@/lib/api"; 

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="p-8 max-w-6xl mx-auto w-full">
      <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-3">Moje Projekty</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Zestawienie moich dotychczasowych prac, prototypów i eksploracji technologicznych.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Brak projektów do wyświetlenia.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Upewnij się, że backend Django działa i posiada wpisy w bazie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            // Zamiana wewnętrznego adresu "backend:8000" na publiczny adres Twojego API
            const imageUrl = project.image 
              ? project.image.replace('http://backend:8000', process.env.NEXT_PUBLIC_API_URL || '')
              : null;

            return (
              <article 
                key={project.id} 
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Sekcja zdjęcia na samej górze karty */}
                {imageUrl ? (
                  <div className="w-full h-48 sm:h-56 overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imageUrl} 
                      alt={`Zdjęcie projektu ${project.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 sm:h-56 bg-gray-100 dark:bg-gray-900 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-400">Brak zdjęcia</span>
                  </div>
                )}

                {/* Kontener na tekst i przyciski (dodany padding tutaj, zamiast na całym <article>) */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="mb-6 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
                        Technologie:
                      </span>
                      <p className="text-blue-600 dark:text-blue-300 font-medium">
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
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}