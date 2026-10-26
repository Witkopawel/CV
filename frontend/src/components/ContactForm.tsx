"use client";

import { useState } from "react";
import { sendContactMessage } from "../app/actions/contact";
import type { Dictionary } from "../lib/dictionaries";

interface ContactFormProps {
    dict: Dictionary['contactForm'];
}

export default function ContactForm({ dict }: ContactFormProps) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

        const result = await sendContactMessage(formData);
        if(result.success){
            setStatus("success");
            setFormData({name: "", email: "", message: ""});
        } else{
            setStatus("error");
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">{dict.nameLabel}</label>
                <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0f1c]/50 border border-gray-800 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder={dict.namePlaceholder}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">{dict.emailLabel}</label>
                <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a0f1c]/50 border border-gray-800 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder={dict.emailPlaceholder}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">{dict.messageLabel}</label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0a0f1c]/50 border border-gray-800 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                    placeholder={dict.messagePlaceholder}
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 w-full inline-flex items-center justify-center gap-2 text-white bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl font-medium transition-all border border-white/5 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {dict.submittingBtn}
                    </>
                ) : (
                    <>
                        {dict.submitBtn}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7-7m7-7H3" /></svg>
                    </>
                )}
            </button>

            {status === "success" && (
                <div className="mt-2 text-center text-sm font-medium text-emerald-400 bg-emerald-400/10 py-2.5 rounded-lg border border-emerald-400/20">
                    {dict.successMsg}
                </div>
            )}
            {status === "error" && (
                <div className="mt-2 text-center text-sm font-medium text-red-400 bg-red-400/10 py-2.5 rounded-lg border border-red-400/20">
                    {dict.errorMsg}
                </div>
            )}
        </form>
    );
}
