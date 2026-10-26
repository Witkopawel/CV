export const dynamic = 'force-dynamic';

import Hero from "../../components/Hero";
import ProjectTransition from "../../components/ProjectTransition";
import Projects from "../../components/Projects";
import AboutTeaser from "../../components/AboutTeaser";
import ContactTeaser from "../../components/ContactTeaser";
import { getProjects } from "../../lib/api";
import { getDictionary } from "../../lib/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    
    const projects = await getProjects(lang).catch(() => []);
    
    const dict = await getDictionary(lang);

    return (
        <main className="relative min-h-screen bg-[#030712] font-sans overflow-x-hidden text-gray-100 selection:bg-blue-500">
            <Hero dict={dict.hero} />
            <ProjectTransition />
            <Projects initialProjects={projects} dict={dict.projects} lang={lang}/>
            <AboutTeaser dict={dict.hero.AboutTeaser} lang={lang} />
            <ContactTeaser dict={dict.hero.ContactTeaser} lang={lang} />
        </main>
    );
}
