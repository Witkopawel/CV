// @ts-nocheck
﻿import Hero from "../components/Hero";
import ProjectTransition from "../components/ProjectTransition";
import Projects from "../components/Projects";
import AboutTeaser from "../components/AboutTeaser";
import ContactTeaser from "../components/ContactTeaser";
import { getProjects } from "../lib/api";

export default async function Home() {
    const projects = await getProjects();

    return (
        <main className="relative min-h-screen bg-[#030712] font-sans overflow-x-hidden text-gray-100 selection:bg-blue-500/30">
            <Hero />
            <ProjectTransition />
            <Projects initialProjects={projects} />
            <AboutTeaser />
            <ContactTeaser />
        </main>
    );
}