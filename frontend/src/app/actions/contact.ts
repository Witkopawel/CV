"use server"; // Ta dyrektywa to absolutna magia. Mówi Next.js: "Ten kod działa tylko na backendzie (Node.js)".

export async function sendContactMessage(formData: { name: string, email: string, message: string }) {
    // 1. Znowu używamy bezpiecznego, wewnętrznego adresu z Dockera!
    const apiUrl = process.env.INTERNAL_API_URL; 

    try {
        const response = await fetch(`${apiUrl}/api/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: "Odrzucono przez API" };
        }
    } catch (error) {
        console.error("Błąd połączenia Next.js -> Django:", error);
        return { success: false, error: "Błąd połączenia z serwerem" };
    }
}