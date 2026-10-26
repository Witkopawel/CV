import Image from "next/image";
import cvDataRaw from "../../../../data/cv.json";

interface Education {
    institution: string;
    degree: string;
    period: string;
}

interface Experience {
    role: string;
    company: string;
    period: string;
    details: string[];
}

interface Hobby {
    title: string;
    description: string;
}

interface CVData {
    personal: {
        name: string;
        title: string;
        phone: string;
        email: string;
        location: string;
        github: string;
        linkedin: string;
        photoPath: string;
    };
    about: string;
    skills: string[];
    languages: string[];
    education: Education[];
    experience: Experience[];
    hobbies: Hobby[];
}

// Rzutowanie surowych danych JSON na nasz interfejs
const cvData = cvDataRaw as CVData;

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 dark:text-gray-200">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <aside className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-700 mb-6 shadow-md">
                        <Image
                            src={cvData.personal.photoPath}
                            alt={`Zdjęcie profilowe ${cvData.personal.name}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 192px, 192px"
                            priority
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{cvData.personal.name}</h1>
                    <h2 className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-8">{cvData.personal.title}</h2>

                    <div className="w-full space-y-4 text-sm mb-8">
                        <h3 className="uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">Kontakt</h3>
                        <p><strong>Tel:</strong> {cvData.personal.phone}</p>
                        <p><strong>Email:</strong> {cvData.personal.email}</p>
                        <p><strong>Lokalizacja:</strong> {cvData.personal.location}</p>
                        <p><strong>GitHub:</strong> {cvData.personal.github}</p>
                        <p><strong>LinkedIn:</strong> {cvData.personal.linkedin}</p>
                    </div>

                    <div className="w-full mb-8">
                        <h3 className="uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">Umiejętności</h3>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {cvData.skills.map((skill, index) => (
                                <span key={index} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="w-full">
                        <h3 className="uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">Języki</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {cvData.languages.map((lang, index) => (
                                <li key={index}>{lang}</li>
                            ))}
                        </ul>
                    </div>
                </aside>
                <section className="w-full md:w-2/3 p-8 md:p-12 space-y-10">

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2 mb-4 inline-block">O mnie</h3>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">{cvData.about}</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2 mb-4 inline-block">Doświadczenie</h3>
                        <div className="space-y-6">
                            {cvData.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{exp.role} <span className="font-normal text-blue-600 dark:text-blue-400">@ {exp.company}</span></h4>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{exp.period}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-5 text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                                        {exp.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2 mb-4 inline-block">Edukacja</h3>
                        {cvData.education.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{edu.institution}</h4>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{edu.period}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{edu.degree}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2 mb-4 inline-block">Hobby</h3>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                            {cvData.hobbies.map((hobby, index) => (
                                <p key={index}>
                                    <strong className="text-gray-800 dark:text-gray-200">{hobby.title}:</strong> {hobby.description}
                                </p>
                            ))}
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}
