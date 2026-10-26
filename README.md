# 🚀 Multilingual Personal Portfolio

Nowoczesne, w pełni responsywne i wielojęzyczne portfolio programisty. Projekt wykorzystuje najnowsze wzorce architektoniczne (App Router w Next.js), potężne API w Django oraz środowisko całkowicie skonteneryzowane przy pomocy Dockera.

## 🛠️ Stack Technologiczny

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Język:** TypeScript, React
- **Styling:** Tailwind CSS (Glassmorphism, animacje CSS, gradienty)
- **Komunikacja:** Next.js Server Actions (obsługa formularza bez zewnętrznych endpointów)

### Backend
- **Framework:** Django & Django REST Framework (DRF)
- **Język:** Python
- **Baza danych:** PostgreSQL

### DevOps & Architektura
- **Konteneryzacja:** Docker & Docker Compose
- **Routing & Proxy:** Nginx
- **Architektura C/S:** Ścisły podział na Server Components (wydajność, SEO, i18n) i Client Components (interaktywność).

## ✨ Główne Funkcjonalności

- **Dynamiczna Wielojęzyczność (i18n):** Pełna obsługa wielu języków (pl/en) zrealizowana na poziomie routingu URL (`/[lang]/...`) połączona ze statycznymi słownikami JSON oraz dynamicznymi tłumaczeniami z bazy danych.
- ** Server Actions:** Zoptymalizowany formularz kontaktowy komunikujący się bezpośrednio z serwerem.
- **Zaawansowany UI/UX:** Nowoczesny design, responsywność, efekty rozmycia (backdrop-blur) i subtelne animacje ładowania.
- ** Gotowe do wdrożenia:** Projekt odpalany jednym poleceniem dzięki konfiguracji Docker Compose.

## 🚀 Jak uruchomić projekt lokalnie?

### Wymagania
Upewnij się, że masz zainstalowanego na swoim komputerze:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Instalacja i uruchomienie

1. Sklonuj repozytorium:
   ```bash
   git clone [https://github.com/Witkopawel/CV.git](https://github.com/Witkopawel/CV.git)
   cd CV
