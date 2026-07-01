# Pracownia Artystyczna – Hello Kostek

Oficjalna witryna internetowa oraz e-sklep dedykowany twórczości łódzkiego artysty malarza **Kostka Macieja Kosteczki**. Platforma łączy prezentację tradycyjnego rzemiosła artystycznego (prace olejne, akwarele, rysunki ołówkiem) z interaktywnymi narzędziami ułatwiającymi zamawianie i zakup dzieł sztuki przez Internet.

Głównym mottem projektu jest: **„Człowiek dla człowieka – sztuka prawdziwa bez AI”**, co podkreśla tradycyjne, w pełni ręczne techniki malarskie i osobisty charakter każdego dzieła.

---

## 🚀 Główne Funkcjonalności

Aplikacja podzielona jest na moduły funkcjonalne wspierające zarówno prezentację dorobku artysty, jak i bezpośrednią sprzedaż prac oraz proces zamawiania indywidualnych obrazów:

### 1. Strona Główna (Lądowania)
*   **Sekcja Hero**: Przyciągający uwagę nagłówek z manifestem artystycznym oraz prezentacją flagowego portretu olejnego namalowanego ze zdjęcia.
*   **Asymetryczna Karuzela Portfolio**: Prezentacja flagowych prac z informacjami o formacie (np. płótno prostokątne lub owalne 30x40 cm) oraz technice wykonania (klasyczna technika olejna na płótnie).
*   **Opinie Klientów (Testimonials)**: Sekcja z rekomendacjami od osób z całej Polski, które zamówiły portret lub zakupiły gotowe dzieło.
*   **Etapy Współpracy**: Przejrzysta oś czasu prezentująca 4 kroki procesu zamawiania portretu:
    1.  *Zgłoszenie* (przesłanie zdjęć poglądowych),
    2.  *Projekt cyfrowy* (wizualizacja i kompozycja w programie graficznym przed malowaniem),
    3.  *Praca malarska* (rozpoczęcie prac na płótnie po akceptacji projektu i wpłacie 50% zadatku),
    4.  *Dostawa i poprawki* (przesłanie zdjęć gotowego obrazu, 3 darmowe poprawki, wysyłka ubezpieczonym kurierem po końcowym rozliczeniu).
*   **Cennik**: Orientacyjne koszty rozpoczęcia prac dla standardowych podobrazi (prostokątnych i owalnych 30x40 cm).
*   **Formularz Wyceny**: Zaawansowany formularz kontaktowy umożliwiający załączenie wielu zdjęć poglądowych, wybór typu podobrazia (prostokątne, owalne, inne) oraz opisanie wizji obrazu.

### 2. Sklep z Pracami Gotowymi (`/sklep`)
*   **Katalog Produktów**: Selekcja fizycznie gotowych akwareli (np. z cyklu *"Obiekt"*) oraz rysunków ołówkiem (*"Codzienność"*, *"Lęk"*, *"Ucieczka"*).
*   **Filtrowanie**: Wygodne przełączanie widoków (Wszystkie, Akwarele, Rysunki, Wydruki).
*   **Wybór Wariantu**: Możliwość zakupu unikatowego fizycznego oryginału (jeśli jest dostępny) bądź certyfikowanego, tańszego wydruku kolekcjonerskiego na luksusowym papierze archiwalnym.
*   **Karta Produktu (`/sklep/[id]`)**: Indywidualny opis artystyczny dzieła, szczegółowe dane techniczne oraz interaktywny panel zakupu.

### 3. Interaktywny Proces Zakupowy (Checkout)
*   Zaimplementowany w pełni po stronie klienta, bezpieczny symulator koszyka i kasy.
*   **Dostawa**: Automatyczna kalkulacja kosztów dostawy (Darmowy ubezpieczony kurier dla oryginałów; InPost Paczkomaty, Orlen Paczka lub DPD dla wydruków).
*   **Płatność**: Obsługa wyboru trzech metod płatności: BLIK (kod 6-cyfrowy), Karta płatnicza (walidacja numeru karty, daty ważności i CVV) oraz przelew tradycyjny.
*   **Ekran Sukcesu**: Strona podsumowania zamówienia (`/sukces-zakup`) generująca potwierdzenie zakupu wraz z wybranym wariantem dostawy.

### 4. Galeria Prac (Portfolio) (`/galeria`)
*   Bogata baza dotychczasowych prac artysty.
*   **Dynamiczne Filtry**: Sortowanie według roku powstania dzieła (2024, 2023, 2022, starsze) oraz techniki malarskiej (olej, akryl, akwarela, rysunek).
*   **Pełnoekranowy Lightbox**: Intuicyjny podgląd wybranego obrazu ze szczegółami technicznymi i opisem, z obsługą klawiatury (strzałki lewo/prawo, ESC).

### 5. O Mnie (`/o-mnie`)
*   Podstrona przybliżająca biografię Kostka Macieja Kosteczki, jego wykształcenie, powiązanie pracy w teatrze z malarstwem oraz filozofię wyższości tradycyjnego rzemiosła nad sztuką cyfrową.

---

## 🛠️ Technologia i Architektura

Projekt został zbudowany przy użyciu nowoczesnych i zoptymalizowanych technologii frontendowych:

*   **Astro v7**: Meta-framework odpowiadający za routing, optymalizację obrazów i generowanie statycznych stron (Static Site Generation - SSG).
*   **React v19**: Wykorzystywany do obsługi interaktywnych elementów (formularze, koszyk, lightbox, filtrowanie sklepu i galerii).
*   **Tailwind CSS v4**: System klas narzędziowych wykorzystujący nowy, ultra-szybki kompilator oparty o Vite (`@tailwindcss/vite`).
*   **Motion (Framer Motion) v12**: Odpowiada za płynne przejścia stron, pojawianie się elementów (fade-in) oraz interaktywne stany przycisków.
*   **Nanostores**: Niezależny od frameworka menedżer stanu. Koszyk zakupowy (`cartStore.ts`) zapisuje stany w `localStorage` przy użyciu `@nanostores/persistent` i integruje się z Reactem za pomocą `@nanostores/react`.
*   **Lucide React**: Zoptymalizowany zestaw wektorowych ikon UI.

---

## 📁 Struktura Projektu

Układ najważniejszych plików w projekcie wygląda następująco:

```text
/
├── public/                 # Zasoby statyczne (ikony, pliki PDF)
├── src/                    # Kod źródłowy aplikacji
│   ├── assets/             # Obrazy lokalne (portrety, zdjęcia artysty)
│   ├── components/         # Komponenty React i Astro
│   │   ├── AboutMe.tsx     # Widok sekcji biograficznej
│   │   ├── Gallery.tsx     # Filtrowalna galeria prac z lightboxem
│   │   ├── Home.tsx        # Główny widok strony głównej z formularzem
│   │   ├── Shop.tsx        # Katalog produktów w sklepie
│   │   ├── ProductDetail.tsx# Szczegóły produktu z symulacją kasy (checkout)
│   │   ├── Testimonials.tsx# Sekcja opinii klientów
│   │   ├── Navbar.tsx      # Menu nawigacyjne
│   │   ├── Footer.astro    # Stopka strony
│   │   └── ...
│   ├── data/               # Lokalne pliki bazodanowe
│   │   └── gallery.ts      # Baza danych obrazów w galerii
│   ├── data.ts             # Główny plik z danymi o produktach i opiniach
│   ├── layouts/            # Układy stron
│   │   └── Layout.astro    # Główny szablon HTML (SEO, fonty, stopka/menu)
│   ├── pages/              # Routing (podstrony Astro)
│   │   ├── index.astro     # Strona główna
│   │   ├── galeria.astro   # Podstrona galerii
│   │   ├── sklep.astro     # Podstrona katalogu sklepu
│   │   ├── o-mnie.astro    # Podstrona biograficzna
│   │   ├── sklep/
│   │   │   └── [id].astro  # Dynamiczna podstrona produktu w sklepie
│   │   ├── regulamin.astro # Regulamin sklepu
│   │   └── polityka-prywatnosci.astro
│   ├── stores/             # Stan globalny aplikacji
│   │   └── cartStore.ts    # Obsługa koszyka zakupowego (Nanostores)
│   ├── styles/             # Pliki stylów CSS
│   │   └── global.css      # Konfiguracja Tailwind CSS v4 i globalne style
│   └── types.ts            # Definicje typów TypeScript
├── astro.config.mjs        # Konfiguracja Astro i integracji z Reactem i Tailwind
├── package.json            # Zależności i skrypty npm
└── tsconfig.json           # Konfiguracja kompilatora TypeScript
```

---

## 💻 Komendy i Uruchamianie

Wszystkie polecenia należy uruchamiać z głównego katalogu projektu w terminalu:

| Komenda | Opis działania |
| :--- | :--- |
| `npm install` | Instaluje wszystkie wymagane zależności projektu. |
| `npm run dev` | Uruchamia lokalny serwer deweloperski pod adresem `localhost:4321`. |
| `npm run build` | Buduje zoptymalizowaną, produkcyjną wersję strony do katalogu `./dist/`. |
| `npm run preview` | Lokalny podgląd zbudowanej wersji produkcyjnej strony przed wdrożeniem. |
| `npm run astro ...` | Umożliwia uruchamianie bezpośrednich komend CLI Astro. |

### 🛠️ Zarządzanie serwerem deweloperskim w tle
Możesz zarządzać lokalnym serwerem deweloperskim Astro w tle za pomocą następujących komend:
*   **Uruchomienie serwera w tle**: `astro dev --background`
*   **Zatrzymanie serwera**: `astro dev stop`
*   **Sprawdzenie statusu**: `astro dev status`
*   **Podgląd logów na żywo**: `astro dev logs`
