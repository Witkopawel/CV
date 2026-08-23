import Hero from "../components/Hero"; // Upewnij się, że ścieżka do folderu jest poprawna
import Projects from "../components/Projects";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#030712] font-sans overflow-x-hidden text-gray-100 selection:bg-blue-500/30">
            <Hero />
            <Projects />
        </main>
    );
}