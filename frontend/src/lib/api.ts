// Typowanie przeniesione do warstwy współdzielonej
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technology_stack: string;
  github_url: string;
  image: string | null;
  created_at: string;
}

// Dedykowana funkcja do pobierania projektów
export async function getProjects(): Promise<Project[]> {
  // Używamy wyłącznie bezpiecznego połączenia wewnątrz sieci Dockera (SSR)
  const apiUrl = process.env.INTERNAL_API_URL;
  
  if (!apiUrl) {
    console.warn("Brakuje zmiennej INTERNAL_API_URL w konfiguracji środowiska.");
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/api/projects/`, {
      cache: 'no-store' // Pobiera zawsze świeże dane. W produkcji można pomyśleć o 'force-cache' i 'next: { revalidate: 3600 }'
    });

    if (!res.ok) {
      throw new Error(`API odpowiedziało statusem: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Błąd podczas pobierania projektów z backendu:", error);
    // Zwracamy pustą tablicę, aby UI mogło obsłużyć brak danych zamiast wyrzucać crash strony
    return [];
  }
}
export async function getProjectById(id: string): Promise<Project | null> {
    // 1. Zamiast ryzykować błędy sieciowe (301, brak slasha) dla pojedynczego ID w Dockerze,
    // korzystamy z niezawodnej funkcji pobierającej wszystko.
    const allProjects = await getProjects();

    // 2. Szukamy projektu lokalnie (w pamięci serwera Next.js).
    // Rzutujemy oba ID na string, aby uniknąć błędów porównania (np. "1" vs 1).
    const foundProject = allProjects.find(p => String(p.id) === String(id));

    // 3. Jeśli znajdziemy - zwracamy projekt. Jeśli nie - zwracamy null.
    return foundProject || null;
}