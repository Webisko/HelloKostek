import React, { useState, useRef } from "react";
import { PageId } from "../types";
import { 
  ArrowRight, 
  Upload, 
  ChevronRight, 
  Send,
  Sparkles,
  Camera,
  Brush,
  Clock,
  Heart
} from "lucide-react";
import { SHOP_PRODUCTS } from "../data";
import heroZdjecie from "../../assets/hero_zdjecie.jpg";
import heroObraz from "../../assets/hero_obraz.jpg";
import portretLeona from "../../assets/portret_Leona.jpg";
import portretMarysi from "../../assets/portret_Marysi.jpg";
import portretOliwii from "../../assets/portret_Oliwii.png";
import portretSlubnyPary from "../../assets/portret_slubny_pary.jpg";

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
  onSelectProduct: (product: any) => void;
}

export default function Home({ setCurrentPage, onSelectProduct }: HomeProps) {
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating email generation for client
    let mailBody = `Dzień dobry,\n\nNazywam się ${emailForm.name}. Proszę o darmową konsultację portretu malarskiego.\n\nSzkic i tło pomysłu:\n${emailForm.message}\n\nKontakt zwrotny: ${emailForm.email}`;
    const mailtoUrl = `mailto:kontakt@hellokostek.pl?subject=${encodeURIComponent("Zapytanie o projekt i wycenę portretu")}&body=${encodeURIComponent(mailBody)}`;
    
    setTimeout(() => {
      window.open(mailtoUrl, "_blank");
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmailForm({ name: "", email: "", message: "", file: null });
    }, 1000);
  };

  // 4 popular works for the teaser as requested
  const activeTeaserProducts = SHOP_PRODUCTS.slice(0, 4);

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-lime-accent selection:text-gray-900 animate-fadeIn">
      
      {/* 1. HERO SECTION: 50/50 ASYMMETRIC SPLIT */}
      <section className="px-6 py-20 md:py-36 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* Left: Massive Serif text + CTA */}
        <div className="lg:col-span-6 space-y-8 font-sans">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gray-900" />
            <span className="font-mono text-xs tracking-widest uppercase text-gray-400 font-bold">
              PRACOWNIA PORTRETU OLEJNEGO • MACIEJ KOSTEK
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-normal text-gray-950">
            Twój <span className="font-display italic font-light text-[#E0115F]">ulubiony kadr</span> uwieczniony na płótnie.
          </h1>

          <p className="font-sans text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl">
            Ręcznie malowane, klasyczne portrety olejne na krosnach sosnowych ze zdjęcia. Przenieś wyjątkowe chwile w ponadczasowy wymiar szlachetnego rzemiosła.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => {
                const formSection = document.getElementById("kontakt-sekcja");
                if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="button"
            >
              <div className="button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="button__text">
                Zamów projekt portretu
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Right: Perfect photo-to-oil before/after slider with rounded corners */}
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
              className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-[32px] border border-gray-100 shadow-sm cursor-ew-resize bg-gray-50"
            >
              {/* After Image sitting at the base */}
              <img
                src={heroObraz}
                alt="Wizualizacja po namalowaniu farbą olejną"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-5 right-5 bg-gray-950/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-widest z-10 pointer-events-none">
                Obraz Olejny (Po)
              </div>

              {/* Before Image overlay clipped dynamically */}
              <img
                src={heroZdjecie}
                alt="Oryginalne zdjęcie klatki wyjściowej"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              />
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm text-gray-900 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-widest border border-gray-100 z-10 pointer-events-none">
                Fotografia (Przed)
              </div>

              {/* Slider handler vertical line with gorgeous custom dual interaction styles */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Micro handler button with a distinct Magenta focal point even in resting state */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-2 transition-all duration-300 pointer-events-auto ${
                    sliderHovered || isSliding 
                      ? "bg-magenta-accent text-white border-magenta-accent scale-115" 
                      : "bg-white text-off-black border-magenta-accent"
                  }`}
                >
                  <div className="flex items-center justify-center relative w-full h-full">
                    {/* Centered Magenta focal dot (resting state focal point to draw eye) */}
                    <span className={`absolute w-3 h-3 rounded-full bg-magenta-accent transition-all duration-300 ${
                      sliderHovered || isSliding ? "scale-0 opacity-0" : "scale-100 opacity-100 animate-pulse"
                    }`} />
                    
                    {/* Left/Right dragging arrows that appear on interaction */}
                    <span className={`text-[16px] font-semibold select-none flex gap-1.5 leading-none transition-all duration-300 ${
                      sliderHovered || isSliding ? "scale-100 opacity-100 text-white" : "scale-50 opacity-0 text-transparent"
                    }`}>
                      <span>‹</span><span>›</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm font-mono text-gray-400 px-2 tracking-wider">
              <span>← PRZECIĄGNIJ SUWAK W BOK →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO GRID: ART-GALLERY STYLE ASYMMETRIC GRID WITH TRANSITIONS */}
      <section className="bg-gray-55/40 border-y border-gray-100 pt-32 pb-48 md:pb-[440px] px-6">
        <div className="max-w-[1600px] mx-auto space-y-16">
          <header className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">PORTFOLIO PRAC</span>
            <h2 className="font-display text-3xl sm:text-5xl text-gray-950 font-normal">Realizacje portretowe z pracowni</h2>
            <p className="font-sans text-gray-600 text-base leading-relaxed">
              Przekonaj się o precyzji mojego pędzla. Każda z poniższych prac powstała metodą tradycyjną na podstawie fotografii powierzonych mi przez klientów.
            </p>
          </header>

          {/* Asymmetric gallery grid - 2 items per row on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-x-20 md:gap-y-32 items-start">
            {/* Gallery Item 1 - Row 1 Left */}
            <div className="space-y-4 group md:max-w-[90%]">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 border border-gray-100 relative">
                <img
                  src={portretLeona}
                  alt="Portret Leon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                />
              </div>
              <div className="flex justify-between items-baseline px-1">
                <h3 className="font-display text-lg text-gray-900 group-hover:text-[#E0115F] transition-colors font-medium">Portret Leona</h3>
                <span className="font-mono text-xs text-gray-500">Płótno prostokątne • 30×40 cm</span>
              </div>
            </div>

            {/* Gallery Item 2 - Row 1 Right (Shifted down and narrower) */}
            <div className="space-y-4 group md:translate-y-24 md:max-w-[85%] md:ml-auto">
              <div 
                className="aspect-[3/4] bg-gray-50 border border-gray-100 overflow-hidden relative flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(224,17,95,0.04)] hover:border-[#E0115F]/20 transition-all duration-500 ease-in-out"
                style={{ borderRadius: "50%" }}
              >
                <img
                  src={portretOliwii}
                  alt="Portret Oliwia"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:-rotate-1"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="flex justify-between items-baseline px-1">
                <h3 className="font-display text-lg text-gray-900 group-hover:text-[#E0115F] transition-colors font-medium">Portret Oliwii</h3>
                <span className="font-mono text-xs text-gray-500">Płótno owalne • 30×40 cm</span>
              </div>
            </div>

            {/* Gallery Item 3 - Row 2 Left (Slightly offset & portrait format as requested) */}
            <div className="space-y-4 group md:max-w-[85%] md:translate-y-64">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 border border-gray-100 relative">
                <img
                  src={portretSlubnyPary}
                  alt="Portret pary"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                />
              </div>
              <div className="flex justify-between items-baseline px-1">
                <h3 className="font-display text-lg text-gray-900 group-hover:text-[#E0115F] transition-colors font-medium">Portret Ślubny Pary</h3>
                <span className="font-mono text-xs text-gray-500">Płótno prostokątne • 40×50 cm</span>
              </div>
            </div>

            {/* Gallery Item 4 - Row 2 Right (Highly offset, right-aligned) */}
            <div className="space-y-4 group md:translate-y-32 md:max-w-[85%] md:ml-auto">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 border border-gray-100 relative">
                <img
                  src={portretMarysi}
                  alt="Portret dziewczynki"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:-rotate-1"
                />
              </div>
              <div className="flex justify-between items-baseline px-1">
                <h3 className="font-display text-lg text-gray-900 group-hover:text-[#E0115F] transition-colors font-medium">Portret Marysi</h3>
                <span className="font-mono text-xs text-gray-500">Płótno prostokątne • 30×40 cm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS TIMELINE: SYMMETRICAL, HORIZONTAL 4-STEP AXIS */}
      <section className="py-32 md:py-40 px-6 max-w-[1600px] mx-auto">
        <header className="space-y-3 max-w-2xl mb-20 text-center mx-auto">
          <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">USTALONA ŚCIEŻKA KREACJI</span>
          <h2 className="font-display text-3xl sm:text-5xl text-gray-950 font-normal">Nieskomplikowany proces</h2>
          <p className="font-sans text-gray-700 text-base leading-relaxed">
            Eliminuję stres związany z zamawianiem tradycyjnych dzieł sztuki przez internet. Każdy krok jest przejrzysty i poddany Twojej akceptacji.
          </p>
        </header>

        {/* Horizontal Process Axis timeline with interactive custom hollow dots and transitions */}
        <div className="relative pt-8 border-t border-gray-150">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Step 1 */}
            <div className="space-y-4 relative flex flex-col items-center text-center group">
              {/* Hollow timeline dot that grows and turns magenta on hover */}
              <div className="absolute -top-8 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-400 bg-white z-10 group-hover:scale-155 group-hover:bg-[#E0115F] group-hover:border-[#E0115F] transition-all duration-300" />
              
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] group-hover:text-[#C4F013] font-bold block transition-colors duration-300">Krok 01</span>
                <h3 className="font-display text-lg sm:text-xl text-gray-900 transition-transform duration-300 group-hover:scale-105 origin-center">Konsultacja i kadr</h3>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Przesyłasz jedno lub więcej zdjęć pożądanej osoby/zwierzęcia drogą e-mailową lub za pomocą formularza na dole strony.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 relative flex flex-col items-center text-center group">
              {/* Hollow timeline dot that grows and turns magenta on hover */}
              <div className="absolute -top-8 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-400 bg-white z-10 group-hover:scale-155 group-hover:bg-[#E0115F] group-hover:border-[#E0115F] transition-all duration-300" />
              
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] group-hover:text-[#C4F013] font-bold block transition-colors duration-300">Krok 02</span>
                <h3 className="font-display text-lg sm:text-xl text-gray-900 transition-transform duration-300 group-hover:scale-105 origin-center">Projekt cyfrowy</h3>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Układam kolaż pozycjonowania i tła. Ty decydujesz o poprawkach – daję Ci do dyspozycji darmowe tury zmian przed malowaniem.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 relative flex flex-col items-center text-center group">
              {/* Hollow timeline dot that grows and turns magenta on hover */}
              <div className="absolute -top-8 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-400 bg-white z-10 group-hover:scale-155 group-hover:bg-[#E0115F] group-hover:border-[#E0115F] transition-all duration-300" />
              
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] group-hover:text-[#C4F013] font-bold block transition-colors duration-300">Krok 03</span>
                <h3 className="font-display text-lg sm:text-xl text-gray-900 transition-transform duration-300 group-hover:scale-105 origin-center">Wpłata zadatku</h3>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Dopiero po pełnej akceptacji cyfrowego projektu wpłacasz 50% zadatku. W tym momencie naciągam unikalne płótno i rozpoczynam pracę.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 relative flex flex-col items-center text-center group">
              {/* Hollow timeline dot that grows and turns magenta on hover */}
              <div className="absolute -top-8 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-400 bg-white z-10 group-hover:scale-155 group-hover:bg-[#E0115F] group-hover:border-[#E0115F] transition-all duration-300" />
              
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] group-hover:text-[#C4F013] font-bold block transition-colors duration-300">Krok 04</span>
                <h3 className="font-display text-lg sm:text-xl text-gray-900 transition-transform duration-300 group-hover:scale-105 origin-center">Ukończenie i odbiór</h3>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Po 3-4 tygodniach przesyłam zdjęcia gotowego obrazu. Po akceptacji dopłacasz drugą połowę, a ja wysyłam ubezpieczoną paczkę kurierem.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRICING: TWO BORDERLESS, CLEAN COLUMNS */}
      <section className="bg-stone-50/60 border-y border-gray-100 py-32 md:py-40 px-6">
        <div className="max-w-[1600px] mx-auto space-y-16">
          <header className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block font-bold">PROSTE WARUNKI</span>
            <h2 className="font-display text-3xl sm:text-5xl text-gray-950 font-normal">Cennik Podstawowy</h2>
            <p className="font-sans text-gray-600 text-base leading-relaxed">
              Dwa unikalne, harmonijne formaty standardowe. Podane ceny są wyjściowe dla ujęć jednoosobowych.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto items-stretch">
            {/* Format 1: Rectangle */}
            <div className="flex flex-col justify-between space-y-6 py-4">
              <div className="space-y-4 text-center md:text-left">
                {/* 3:4 Rectangle Canvas Visualizer - Sharp/No rounded corners as requested */}
                <div className="w-32 aspect-[3/4] mx-auto md:mx-0 bg-white border border-gray-150 rounded-none shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.03] hover:border-[#E0115F]/40 hover:shadow-[0_12px_32px_rgba(224,17,95,0.05)] mb-8 select-none relative group">
                  <div className="absolute inset-2 border border-dashed border-gray-100 rounded-none group-hover:border-[#E0115F]/20 transition-colors" />
                  <span className="text-xs font-mono text-gray-500 z-10 font-bold uppercase tracking-widest leading-none">3:4</span>
                  <span className="text-xs font-mono text-gray-400 z-10 mt-2 tracking-wide uppercase leading-none">Prostokąt</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block">Format Klasyczny</span>
                <h3 className="font-display text-2xl sm:text-3.5xl text-gray-900 font-normal">Płótno Prostokątne 30x40 cm</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  Ponadczasowy kształt, doskonale odnajdujący się w większości tradycyjnych wnętrz i dobrze reagujący na klasyczne oświetlenie w ramie.
                </p>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400">WARTOŚĆ KOŃCOWA:</span>
                <span className="font-mono text-3xl font-bold text-gray-900">800 zł</span>
              </div>
            </div>

            {/* Format 2: Oval */}
            <div className="flex flex-col justify-between space-y-6 py-4">
              <div className="space-y-4 text-center md:text-left">
                {/* 3:4 Oval Canvas Visualizer with perfect 50% border radius for realistic ellipse shape */}
                <div 
                  className="w-32 aspect-[3/4] mx-auto md:mx-0 bg-white border border-gray-150 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.03] hover:border-[#E0115F]/40 hover:shadow-[0_12px_32px_rgba(224,17,95,0.05)] mb-8 select-none relative group"
                  style={{ borderRadius: "50%" }}
                >
                  <div 
                    className="absolute inset-2 border border-dashed border-gray-100 group-hover:border-[#E0115F]/20 transition-colors"
                    style={{ borderRadius: "50%" }}
                  />
                  <span className="text-xs font-mono text-gray-500 z-10 font-bold uppercase tracking-widest leading-none">3:4</span>
                  <span className="text-xs font-mono text-gray-400 z-10 mt-2 tracking-wide uppercase leading-none">Owal</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold block">Format Unikalny</span>
                <h3 className="font-display text-2xl sm:text-3.5xl text-gray-900 font-normal">Płótno Owalne 30x40 cm</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  Subtelny, unikalny i nastrojowy sznyt. Owalna linia tła idealnie wybiórczo skupia uwagę obserwatora bezpośrednio na twarzy portretowanego.
                </p>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400">WARTOŚĆ KOŃCOWA:</span>
                <span className="font-mono text-3xl font-bold text-[#E0115F]">800 zł</span>
              </div>
            </div>
          </div>

          {/* Centered italicized informational subtext note with generous limits */}
          <div className="max-w-2xl mx-auto text-center pt-8">
            <p className="font-sans text-sm italic text-gray-600 leading-relaxed">
              * Podane formaty są wymiarami podstawowymi. Na specjalne życzenie maluję również wielkie płótna w formatach takich jak 40x55 cm czy 50x70 cm. Koszt każdej kolejnej osoby na portrecie to dopłata 300 zł.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SHOP TEASER SECTION: DIREXT TEXT LINK TO CURATED ART ARCHIVE */}
      <section className="py-32 md:py-40 px-6 max-w-[1600px] mx-auto text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">KOLEKCJA INDYWIDUALNA</span>
          <h2 className="font-display text-3xl sm:text-4.5xl text-gray-950 font-normal">Sztuka nastrojowa do Twojego domu</h2>
          <p className="font-sans text-gray-600 text-base leading-relaxed">
            Nie szukasz portretu na zamówienie? Przejrzyj moje oryginalne akwarele o chłodnych tonach oraz precyzyjne rysunki ołókiem gotowe do wysyłki od zaraz.
          </p>
        </div>

        {/* Expanded 4-card preview of shop products - wider layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left max-w-7xl mx-auto pt-4">
          {activeTeaserProducts.map((p) => (
            <div 
              key={p.id}
              onClick={() => onSelectProduct(p)}
              className="space-y-4 group cursor-pointer bg-white border border-gray-50 hover:border-gray-150 p-4 rounded-3xl transition-all"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-gray-950 group-hover:text-[#E0115F] transition-colors leading-snug">{p.title}</h3>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{p.category === "watercolor" ? "Oryginał akwarela" : "Szkic ołówkiem"}</span>
                  <span className="font-mono text-sm font-semibold text-[#E0115F] group-hover:text-[#C4F013] transition-colors">{p.originalPrice} zł</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <button
            onClick={() => {
              setCurrentPage("shop");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold font-sans uppercase tracking-widest text-gray-900 hover:text-lime-accent active:text-magenta-accent hover:underline transition-all cursor-pointer"
          >
            Poznaj gotowe akwarele i rysunki ołówkiem
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. CONTACT SECTION: FORM */}
      <section id="kontakt-sekcja" className="border-t border-gray-100 bg-gray-50/50 py-32 md:py-40 px-6 scroll-mt-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-8 font-sans">
            <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">ROZPOCZNIJ ROZMOWĘ</span>
            <h2 className="font-display text-3xl sm:text-5xl text-gray-950 leading-none">Propozycja projektu bez zobowiązań.</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Napisz do mnie. Chętnie przejrzę Twoje kadry fotograficzne i doradzę, jak zaaranżować tło portretu, by wyglądało ono niezwykle szlachetnie i malarsko na płótnie.
            </p>
            <div className="pt-6 border-t border-gray-150 space-y-2">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block">Skrzynka e-mail:</span>
              <a href="mailto:kontakt@hellokostek.pl" className="font-display text-2xl text-gray-900 font-semibold hover:text-[#E0115F] hover:underline break-words">
                kontakt@hellokostek.pl
              </a>
              <span className="text-xs text-gray-500 block">Zazwyczaj odpowiadam w przeciągu paru godzin roboczych.</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-150 p-6 sm:p-10 space-y-6">
            <h3 className="font-display text-xl sm:text-2xl text-gray-900 border-b border-gray-100 pb-4">Wstępna wycena portretowej pamiątki</h3>
            
            {submitSuccess ? (
              <div className="p-8 text-center space-y-4 bg-gray-50 rounded-2xl animate-scaleIn border">
                <div className="w-12 h-12 rounded-full border border-green-600 text-green-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-display text-lg text-gray-900 font-semibold">Projekt wygenerowany</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-md mx-auto">
                  Dziękuję! Twoja domyślna poczta e-mail została otwarta z przygotowanym szablonem zapytania. Załącz do niej klatki fotograficzne i wyślij direct do <strong>kontakt@hellokostek.pl</strong>!
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="text-xs font-mono uppercase tracking-widest text-[#E0115F] font-bold underline block mx-auto mt-2"
                >
                  Napisz nowe zapytanie
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block font-semibold">Imię i Nazwisko *</label>
                    <input
                      type="text"
                      required
                      placeholder="np. Krystyna Nowak"
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white outline-none rounded-xl text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block font-semibold">Twój E-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="np. krysia@wp.pl"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white outline-none rounded-xl text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block font-semibold">Opisz portretowaną osobę lub tło</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Opisz charakter, oczekiwania wobec tła i kolorystyki oraz preferowany rodzaj podobrazia (prostokątne / owalne)..."
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white outline-none rounded-xl text-sm transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block font-semibold">Symulowane załączenie kadrów fotograficznych</span>
                  <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer relative">
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
                    <div className="space-y-2 pointer-events-none">
                      <div className="text-xs font-medium text-gray-500">
                        {emailForm.file ? (
                          <span className="text-[#E0115F] font-bold">✓ Dołączono: {emailForm.file.name}</span>
                        ) : (
                          <span>Wybierz zdjęcie z dysku lub przeciągnij tutaj</span>
                        )}
                      </div>
                      <p className="text-[12px] text-gray-400">Pojemność do 10 MB. Twoje dane są chronione.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button--full"
                >
                  <div className="button__blobs">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className="button__text">
                    {isSubmitting ? (
                      <span>Generowanie wiadomości...</span>
                    ) : (
                      <>
                        <span>Wyślij darmowe zapytanie</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
