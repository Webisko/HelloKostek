import React, { useState, useRef } from "react";
import { PageId } from "../types";
import { 
  ArrowRight, 
  Upload, 
  ChevronRight, 
  Send 
} from "lucide-react";
import { SHOP_PRODUCTS } from "../data";

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  // Slider state for Before-After comparison
  const [sliderPos, setSliderPos] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const [sliderHovered, setSliderHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Email form state
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    message: "",
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSliding || e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // Scroll smoothly to contact form
  const scrollToContact = () => {
    const contactSection = document.getElementById("kontakt-sekcja");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Simple submission simulator for contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmailForm({ name: "", email: "", message: "", file: null });
    }, 1200);
  };

  // Filter 3 popular shop works for the teaser
  const activeTeaserProducts = SHOP_PRODUCTS.slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-off-black selection:bg-magenta-accent selection:text-white animate-fadeIn">
      
      {/* 1. HERO SECTION (Before/After Slider + CTA) - REBUILT AS EDITORIAL 50/50 SPLIT */}
      <section className="px-6 py-16 md:py-28 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Sized larger and spaced dramatically */}
        <div className="lg:col-span-6 space-y-10">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-off-black" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500 font-semibold">
              PRACOWNIA PORTRETU OLEJNEGO
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[90px] leading-[0.92] tracking-tighter text-off-black font-normal">
            Twój ulubiony kadr, <br />
            <span className="italic font-light font-display text-off-black">uwieczniony na płótnie</span>.
          </h1>

          <p className="font-sans text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl font-light">
            Maciej maluje w pełni ręcznie i tradycyjnie wyjątkowe portrety ludzi oraz zwierząt na podstawie przesłanych przez Ciebie zdjęć. Każde płótno powstaje z dbałością o głębokie emocje i fakturę dzieła.
          </p>



          {/* Clean Editorial CTA Buttons (turning magenta strictly on hover) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={scrollToContact}
              className="px-8 py-5 bg-off-black text-white hover:bg-magenta-accent transition-all duration-350 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-3 cursor-pointer group border border-transparent shadow-none"
            >
              Zamów portret
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            
            <button
              onClick={() => {
                setCurrentPage("portraits");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-5 bg-transparent text-off-black border border-neutral-200 hover:border-off-black transition-all duration-300 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold text-center cursor-pointer"
            >
              Zobacz pełną ofertę
            </button>
          </div>
        </div>

        {/* Right Column: Before/After Interactive Slider with clean rounded borders */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="space-y-4">
            <div 
              ref={sliderRef}
              onMouseDown={() => setIsSliding(true)}
              onMouseUp={() => setIsSliding(false)}
              onMouseLeave={() => { setIsSliding(false); setSliderHovered(false); }}
              onMouseEnter={() => setSliderHovered(true)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-[40px] border border-neutral-100 shadow-sm cursor-ew-resize"
            >
              {/* BEFORE: Photo */}
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop"
                alt="Surowe zdjęcie przed namalowaniem"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md text-off-black px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border border-neutral-100 z-10 pointer-events-none">
                Fotografia (Przed)
              </div>

              {/* AFTER: Painting clipped dynamically */}
              <img
                src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-7-2022-scaled.jpg"
                alt="Obraz olejny na płótnie autorstwa Macieja"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              />
              <div className="absolute bottom-6 right-6 bg-off-black/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest z-10 pointer-events-none">
                Obraz Olejny (Po)
              </div>

              {/* Interactive Divider Bar */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Drag Handle ball with reactive magenta coloring */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border transition-all duration-300 pointer-events-auto ${
                    sliderHovered || isSliding 
                      ? "bg-magenta-accent text-white border-magenta-accent scale-110 shadow-magenta-accent/20" 
                      : "bg-white text-off-black border-neutral-250"
                  }`}
                >
                  <div className="flex gap-1 items-center justify-center text-sm font-bold select-none leading-none">
                    <span>‹</span><span>›</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs font-mono text-gray-500 px-3 tracking-wider uppercase">
              <span>← Przeciągnij suwak</span>
              <span>Porównanie realizmu z fakturą pędzla →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "MAGIA DETALU" SECTION - REBUILT AS ASYMMETRIC GRID (Gallery feel) */}
      <section className="bg-neutral-50/50 py-28 px-6 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.25em] block font-semibold">Portfele Sztuki i Detale</span>
            <h2 className="font-display text-4xl sm:text-5.5xl leading-tight text-off-black max-w-xl font-normal">
              Wybrane realizacje z pracowni Macieja
            </h2>
            <p className="font-sans text-gray-700 text-base leading-relaxed max-w-xl font-light">
              Każde dzieło to osobna opowieść i uwiecznienie intymnych, bliskich emocji. Zobacz, jak fotografie zamieniają się w nastrojową sztukę o bogatej fakturze na płótnie.
            </p>
          </div>

          {/* Asymmetric Overlapping Grid with breathing room */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Item 1: Large image left, col-span-7 */}
            <div className="lg:col-span-7 space-y-6 group">
              <div className="overflow-hidden rounded-[32px] aspect-[4/5] bg-neutral-100 border border-neutral-100/50">
                <img
                  src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-7-2022-scaled.jpg"
                  alt="Leon, olej na płótnie owalnym"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
              <div className="ps-2 flex justify-between items-baseline">
                <h3 className="font-display text-lg text-off-black">Leon</h3>
                <span className="font-mono text-gray-500 text-xs uppercase tracking-wider">Płótno owalne • 30×40 cm</span>
              </div>
            </div>

            {/* Item 2: Right, col-span-5 with vertical gap (lagged position) */}
            <div className="lg:col-span-5 space-y-6 lg:mt-32 group">
              <div className="overflow-hidden rounded-[32px] aspect-[4/5] bg-neutral-100 border border-neutral-100/50">
                <img
                  src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-8.jpg"
                  alt="Portret Oliwii, olej na płótnie prostokątnym"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
              <div className="ps-2 flex justify-between items-baseline">
                <h3 className="font-display text-lg text-off-black">Portret Oliwii</h3>
                <span className="font-mono text-gray-500 text-xs uppercase tracking-wider">Płótno prostokątne • 30×40 cm</span>
              </div>
            </div>

            {/* Item 3: Left, col-span-5 with negative offset on desktops */}
            <div className="lg:col-span-5 space-y-6 group">
              <div className="overflow-hidden rounded-[32px] aspect-[4/5] bg-neutral-100 border border-neutral-100/50">
                <img
                  src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-2-2022-edited-768x768.jpg"
                  alt="Sentymentalny Portret Pary, olej na płótnie"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
              <div className="ps-2 flex justify-between items-baseline">
                <h3 className="font-display text-lg text-off-black">Sentymentalny Portret Pary</h3>
                <span className="font-mono text-gray-500 text-xs uppercase tracking-wider">Płótno prostokątne • 40×50 cm</span>
              </div>
            </div>

            {/* Item 4: Right, col-span-7 with horizontal asymmetry */}
            <div className="lg:col-span-7 space-y-6 lg:-mt-16 group">
              <div className="overflow-hidden rounded-[32px] aspect-[16/10] bg-neutral-100 border border-neutral-100/50">
                <img
                  src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-13-2022-scaled.jpg"
                  alt="Studium krosna i dębowych tonów"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
              <div className="ps-2 flex justify-between items-baseline">
                <h3 className="font-display text-lg text-off-black">Chłodna Harmonia Gabinetu</h3>
                <span className="font-mono text-gray-500 text-xs uppercase tracking-wider">Elegancja drewna i dębowych tonów</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "PROCESS" SECTION - HORIZONTAL MINIMALIST TIMELINE */}
      <section id="jak-zamowic-sekcja" className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="space-y-4 max-w-3xl mb-24">
          <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.25em] block font-semibold">Proces Powstawania</span>
          <h2 className="font-display text-4xl sm:text-5.5xl text-off-black font-normal">Jak wygląda zamówienie portretu?</h2>
          <p className="font-sans text-gray-700 text-base leading-relaxed max-w-xl font-light">
            Eliminujemy obawy przed zamawianiem sztuki. Oto przejrzysta, wolna od pośpiechu oś wspólnej pracy nad dziełem malarskim.
          </p>
        </div>

        {/* Clean, open horizontal timeline grid */}
        <div className="relative pt-12 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 xl:gap-20">
            {/* Step 1 */}
            <div className="space-y-4 group relative flex flex-col items-center text-center">
              {/* Dot: Hollow circle with border, structurally locked and aligned */}
              <div id="timeline-dot-1" className="absolute -top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-off-black z-20 group-hover:border-magenta-accent group-hover:scale-110 transition-all duration-300" />
              
              <div className="space-y-2 flex flex-col items-center">
                <span className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-magenta-accent transition-colors duration-300 block">
                  01 / WYŚLIJ ZDJĘCIE
                </span>
                <div className="h-[1px] w-8 bg-stone-200 group-hover:bg-magenta-accent group-hover:w-14 transition-all duration-300" />
              </div>
              <h3 className="font-display text-xl text-off-black font-normal pt-1">Konsultacja kadru</h3>
              <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
                Przesyłasz wybrany kadr na adres <a href="mailto:kontakt@hellokostek.pl" className="font-medium underline hover:text-magenta-accent transition-colors">kontakt@hellokostek.pl</a> lub korzystasz z formularza. Możesz opisać swoje wyobrażenie o fakturowości i barwach tła.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 group relative flex flex-col items-center text-center">
              {/* Dot: Hollow circle with border, structurally locked and aligned */}
              <div id="timeline-dot-2" className="absolute -top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-off-black z-20 group-hover:border-magenta-accent group-hover:scale-110 transition-all duration-300" />
              
              <div className="space-y-2 flex flex-col items-center">
                <span className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-magenta-accent transition-colors duration-300 block">
                  02 / PROJEKT CYFROWY
                </span>
                <div className="h-[1px] w-8 bg-stone-200 group-hover:bg-magenta-accent group-hover:w-14 transition-all duration-300" />
              </div>
              <h3 className="font-display text-xl text-off-black font-normal pt-1">Akceptacja kompozycji</h3>
              <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
                Projektuję cyfrowy kolaż, który ukazuje proponowane umiejscowienie postaci oraz paletę barw tła. Klient ma do dyspozycji <strong>3 tury darmowych poprawek</strong> przed przystąpieniem do malowania.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 group relative flex flex-col items-center text-center">
              {/* Dot: Hollow circle with border, structurally locked and aligned */}
              <div id="timeline-dot-3" className="absolute -top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-off-black z-20 group-hover:border-magenta-accent group-hover:scale-110 transition-all duration-300" />
              
              <div className="space-y-2 flex flex-col items-center">
                <span className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-magenta-accent transition-colors duration-300 block">
                  03 / PRACA RĘCZNA
                </span>
                <div className="h-[1px] w-8 bg-stone-200 group-hover:bg-magenta-accent group-hover:w-14 transition-all duration-300" />
              </div>
              <h3 className="font-display text-xl text-off-black font-normal pt-1">Zadatek i malowanie</h3>
              <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
                Po zatwierdzeniu szkicu i wpłacie 50% zadatku rozpoczyna się tradycyjny proces nakładania grubszych warstw na płótnie. Czas malowania i bezpiecznego schnięcia spoiwa wynosi około 3-4 tygodni.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 group relative flex flex-col items-center text-center">
              {/* Dot: Hollow circle with border, structurally locked and aligned */}
              <div id="timeline-dot-4" className="absolute -top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-off-black z-20 group-hover:border-magenta-accent group-hover:scale-110 transition-all duration-300" />
              
              <div className="space-y-2 flex flex-col items-center">
                <span className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-magenta-accent transition-colors duration-300 block">
                  04 / ODBIÓR DZIEŁA
                </span>
                <div className="h-[1px] w-8 bg-stone-200 group-hover:bg-magenta-accent group-hover:w-14 transition-all duration-300" />
              </div>
              <h3 className="font-display text-xl text-off-black font-normal pt-1">Gotowy obraz i wysyłka</h3>
              <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
                Przesyłam szczegółowe fotografie gotowego płótna (oferując kolejne darmowe tury poprawek). Po pełnej akceptacji ubezpieczone płótno wędruje bezpiecznie kurierem prosto pod Twój adres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING & VARIANTS SECTION - REBUILT AS EXQUISITE NO-BOX COLUMNS */}
      <section className="bg-neutral-50/70 border-y border-neutral-100 py-28 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.25em] block font-semibold">Czysty Cennik</span>
            <h2 className="font-display text-4xl sm:text-5.5xl text-off-black font-normal">Standardowe Formaty</h2>
            <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
              Dwa klasyczne i nastrojowe warianty tradycyjnego podobrazia. Brak ukrytych dopłat.
            </p>
          </div>

          {/* Minimalist side-by-side columns divided by pure, generous whitespace (no boxes, lines, or borders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto items-stretch">
            
            {/* Column A: Rectangle */}
            <div className="space-y-8 flex flex-col justify-between py-6">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block">Opcja I</span>
                <h3 className="font-display text-2xl sm:text-3xl text-off-black font-normal">Płótno Prostokątne (30 × 40 cm)</h3>
                <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
                  Standardowa, ponadczasowa geometria. Idealnie współgra z każdym nowoczesnym lub klasycznym salonem, a także sypialnią czy eleganckim gabinetem.
                </p>
              </div>

              <div className="pt-8 flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase text-gray-500 tracking-wider">Cena standardowa:</span>
                <span className="font-display text-4xl text-off-black font-normal">800 zł</span>
              </div>
            </div>

            {/* Column B: Oval */}
            <div className="space-y-8 flex flex-col justify-between py-6">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block">Opcja II</span>
                <h3 className="font-display text-2xl sm:text-3xl text-off-black font-normal">Płótno Owalne (30 × 40 cm)</h3>
                <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
                  Nietuzinkowy, niemal retro-galeryjny charakter. Owalne krosno sosnowe nadaje portretowi intymny, muzealny sznyt i wyróżnia się oryginalnością kształtu.
                </p>
              </div>

              <div className="pt-8 flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase text-gray-500 tracking-wider">Cena standardowa:</span>
                <span className="font-display text-4xl text-off-black font-normal">800 zł</span>
              </div>
            </div>

          </div>

          {/* Premium Callout under cards in high-end editorial typography */}
          <div className="max-w-3xl mx-auto text-center pt-8">
            <p className="font-sans text-sm text-gray-700 leading-relaxed italic font-light text-center my-20 max-w-2xl mx-auto">
              "Potrzebujesz formatu wielkoformatowego (np. 50×70 cm, 70×100 cm) lub bardziej wymagającej kompozycji wieloosobowej? Napisz do mnie – chętnie opracuję dla Ciebie spersonalizowaną, niezobowiązującą ofertę."
            </p>

            <div className="pt-12 border-t border-neutral-100 max-w-xl mx-auto space-y-6">
              <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.2em] block font-bold">W cenie każdego obrazu otrzymujesz:</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left text-sm text-gray-700 font-sans font-light">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-magenta-accent shrink-0" />
                  <span>Cyfrowy projekt pozycjonowania i tła</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-magenta-accent shrink-0" />
                  <span>Razem 6 darmowych rund konsultacji i poprawek</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-magenta-accent shrink-0" />
                  <span>W pełni ubezpieczona, pancerna przesyłka</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-magenta-accent shrink-0" />
                  <span>Możliwość doręczenia bezpośredniego w Łodzi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP TEASER SECTION - REBUILT AS AN ASYMMETRIC EXPOSITION GRID */}
      <section className="bg-white py-28 px-6 max-w-7xl mx-auto space-y-20">
        <div className="space-y-4 max-w-2xl">
          <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.25em] block font-semibold">Inne Rejony Twórczości</span>
          <h2 className="font-display text-4xl sm:text-5.5xl text-off-black font-normal">Szukasz czegoś gotowego?</h2>
          <p className="font-sans text-gray-700 text-base leading-relaxed max-w-xl font-light">
            Poza płótnami na zamówienie, tworzę także autorskie, melancholijne grafiki i rysunki. Możesz nabyć ich oryginały lub zdecydować się na seryjne, certyfikowane wydruki kolekcjonerskie.
          </p>
        </div>

        {/* Asymmetrical presentation: offset sizes to look curated */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {activeTeaserProducts.map((artwork, idx) => (
            <div 
              key={artwork.id} 
              className={`space-y-6 group flex flex-col justify-between ${
                idx === 1 ? "md:translate-y-8" : idx === 2 ? "md:-translate-y-4" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] aspect-square bg-neutral-100 relative border border-neutral-100/50">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-mono uppercase text-gray-600 border border-neutral-100 tracking-widest">
                    {artwork.category === "watercolor" ? "Akwarela" : "Rysunek ołówkiem"} • {artwork.year}
                  </div>
                </div>

                <div className="space-y-2 ps-1">
                  <h3 className="font-display text-xl text-off-black font-normal leading-snug">{artwork.title}</h3>
                  <p className="font-sans text-sm text-gray-700 leading-relaxed font-light line-clamp-2">{artwork.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 px-1 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block font-mono uppercase tracking-wider">Oryginał:</span>
                  <span className="text-sm font-medium text-off-black">
                    {artwork.originalPrice} PLN
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block font-mono uppercase tracking-wider">Wydruk:</span>
                  <span className="text-sm font-light text-gray-600">
                    od {artwork.printPrice} PLN
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Symmetrical Wide CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              setCurrentPage("shop");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-12 py-5 bg-off-black text-white hover:bg-magenta-accent transition-all duration-350 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold inline-flex items-center justify-center gap-3 cursor-pointer shadow-none"
          >
            Przejdź do pełnego sklepu
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </button>
        </div>
      </section>

      {/* 6. CONTACT SECTION - STYLISH MONOCHROME FORM WITH FILE SUPPORT */}
      <section id="kontakt-sekcja" className="bg-neutral-50 py-28 px-6 border-t border-neutral-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Direct and Minimal info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.25em] block font-semibold">Kontakt bezpośredni</span>
              <h2 className="font-display text-4xl sm:text-5.5xl leading-tight text-off-black font-normal">Napisz do Macieja</h2>
              <p className="font-sans text-gray-700 text-base leading-relaxed font-light">
                Stworzenie obrazu na podstawie fotografii wymaga wzajemnego zrozumienia i wyczucia. Chętnie doradzę, przejrzę Twoje zdjęcia i podpowiem, które z nich ułoży się na płótnie najszlachetniej.
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-200 space-y-3">
              <span className="font-mono text-xs text-gray-500 block uppercase tracking-widest">Adres e-mail pracowni:</span>
              <a 
                href="mailto:kontakt@hellokostek.pl" 
                className="font-display text-2xl sm:text-3.5xl text-off-black hover:text-magenta-accent transition-colors underline break-words"
              >
                kontakt@hellokostek.pl
              </a>
              <p className="font-sans text-sm text-gray-750 font-light">Zazwyczaj odpisuję w przeciągu paru godzin – do usłyszenia!</p>
            </div>
          </div>

          {/* Right Column: Custom Form with strict Monochrome style and reactive hover layout */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[32px] border border-neutral-150 shadow-none space-y-8">
            <h3 className="font-display text-xl text-off-black font-normal border-b border-neutral-100 pb-4">
              Zapytanie o wycenę i projekt
            </h3>
            
            {submitSuccess ? (
              <div className="p-8 bg-neutral-50 border border-neutral-150 rounded-2xl space-y-4 animate-scaleUp text-center md:text-left">
                <div className="w-12 h-12 rounded-full border border-off-black text-off-black flex items-center justify-center font-bold text-xl mx-auto md:mx-0">
                  ✓
                </div>
                <h4 className="font-display text-xl text-off-black font-medium">Wiadomość została wysłana</h4>
                <p className="font-sans text-base text-gray-700 leading-relaxed font-light">
                  Twoje zgłoszenie trafiło bezpiecznie na naszą skrzynkę mailową. Maciej zapozna się ze zdjęciem i prześle propozyje kadrowania wkrótce!
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="text-xs font-mono tracking-widest uppercase text-off-black hover:text-magenta-accent transition-colors font-semibold underline block"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 font-sans text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold block">Twoje Imię</label>
                    <input
                      type="text"
                      required
                      placeholder="Imię"
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 focus:border-off-black focus:bg-white placeholder:text-gray-450 outline-none rounded-xl transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold block">Twój E-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="Adres e-mail"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 focus:border-off-black focus:bg-white placeholder:text-gray-450 outline-none rounded-xl transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold block">Twój pomysł na format lub tło</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Opisz swój pomysł, format, preferencje dotyczące tła lub wariantu krosna (prostokątne / owalne)..."
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 focus:border-off-black focus:bg-white placeholder:text-gray-450 outline-none rounded-xl transition-all resize-none font-light leading-relaxed"
                  />
                </div>

                {/* File Upload drag-and-drop support */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold block">Załącznik ze zdjęciem (poglądowe klatki)</label>
                  <div className="border border-dashed border-neutral-200 rounded-2xl p-8 text-center bg-neutral-50 hover:bg-neutral-100/50 transition-all relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setEmailForm({ ...emailForm, file: e.target.files[0] });
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-3 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white text-stone-400 flex items-center justify-center mx-auto border border-neutral-150 transition-colors group-hover:border-magenta-accent">
                        <Upload className="w-4 h-4 text-stone-500 group-hover:text-magenta-accent transition-colors" />
                      </div>
                      <div className="text-xs font-normal text-stone-500">
                        {emailForm.file ? (
                          <span className="text-magenta-accent font-semibold">✓ Wybrano: {emailForm.file.name}</span>
                        ) : (
                          <span>Dołącz plik lub przeciągnij zdjęcia tutaj</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-none">Maksymalny rozmiar: 12MB. Wspierane formaty: JPG, PNG.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-off-black text-white hover:bg-magenta-accent transition-all duration-350 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Wysyłanie projektu...</span>
                  ) : (
                    <>
                      <span>Wyślij darmowe zapytanie</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
