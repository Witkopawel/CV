import Link from "next/link";

export default function AboutTeaser() {
    // Szybkie fakty wyciągnięte z Twojego profilu
    const facts = [
        {
            title: "Arch Linux Enjoyer",
            description: "Codzienna praca w systemie, który wymaga zrozumienia architektury od podszewki. Pełna kontrola nad środowiskiem deweloperskim.",
            icon: (
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            )
        },
        {
            title: "100k+ Kopii",
            description: "Praktyczne, komercyjne doświadczenie w optymalizacji i debugowaniu gier (m.in. Cheap Car Repair) zdobyte w profesjonalnym zespole.",
            icon: (
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            )
        },
        {
            title: "Psychologia Gracza",
            description: "Nie tylko piszę kod. Analizuję gry od strony designu, by zrozumieć, co realnie wpływa na zaangażowanie i zachowanie użytkownika.",
            icon: (
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            )
        },
        {
            title: "Hardware & Arduino",
            description: "Wychodzę poza ekran monitora. Buduję fizyczne układy elektroniczne i łączę je z niskopoziomowym kodem w C++.",
            icon: (
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            )
        }
    ];

    return (
        <section className="relative z-10 w-full bg-[#030712] py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">

            {/* Ozdobny divider */}
            <div className="w-full max-w-5xl flex items-center justify-center mb-16 opacity-30">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            <div className="text-center mb-16 relative z-10">
                <span className="text-blue-500 font-semibold tracking-[0.2em] uppercase text-sm mb-2 block">
                    TL;DR
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Kim <span className="text-gray-400">jestem?</span></h2>
            </div>

            {/* Siatka faktów */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-16 relative z-10">
                {facts.map((fact, index) => (
                    <div
                        key={index}
                        className="group bg-gray-900/30 border border-gray-800 hover:border-gray-600 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.1)] flex flex-col"
                    >
                        <div className="bg-gray-950/80 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-gray-800 group-hover:border-gray-700 transition-colors">
                            {fact.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-3">{fact.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base flex-grow">
                            {fact.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Główny Call to Action */}
            <div className="relative z-10 text-center">
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    To tylko ułamek mojej drogi. Studiuję Informatykę na Politechnice Rzeszowskiej, koduję każdego dnia i nie boję się żadnego wyzwania.
                </p>
                <Link
                    href="/about"
                    className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)]"
                >
                    <span>Zobacz pełne CV</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

        </section>
    );
}