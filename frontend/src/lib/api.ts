// Typowanie przeniesione do warstwy współdzielonej
export interface Project {
  id: number;
  title: string;
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