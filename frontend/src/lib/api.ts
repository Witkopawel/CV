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

export async function getProjects(lang: string = 'en'): Promise<Project[]> {
  const apiUrl = process.env.INTERNAL_API_URL;
  
  if (!apiUrl) {
    return [];
  }
  try {
    const res = await fetch(`${apiUrl}/api/projects/?lang=${lang}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`API odpowiedziało statusem: ${res.status}`);
    }
    const data = await res.json();
    return data.map((project: any) => ({
      ...project,
      title: typeof project.title === 'object' 
        ? (project.title[lang] || project.title['en'] || project.title['pl'] || "") 
        : project.title,
      description: typeof project.description === 'object' 
        ? (project.description[lang] || project.description['en'] || project.description['pl'] || "") 
        : project.description,
    }));

  } catch (error) {
    console.error("", error);
    return [];
  }
}

export async function getProjectById(id: string, lang: string = 'en'): Promise<Project | null> {
    const allProjects = await getProjects(lang);
    const foundProject = allProjects.find(p => String(p.id) === String(id));
    return foundProject || null;
}
