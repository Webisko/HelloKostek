import React, { useState, useRef, useEffect, useCallback } from "react";
import { PageId } from "../types";
import { 
  ArrowRight, 
  ArrowLeft,
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Send,
  Sparkles,
  Camera,
  Brush,
  Clock,
  Heart,
  ChevronDown
} from "lucide-react";
import { SHOP_PRODUCTS } from "../data";
import heroObraz from "../../assets/hero_obraz.jpg";
import portretLeona from "../../assets/portret_Leona.jpg";
import portretMarysi from "../../assets/portret_Marysi.jpg";
import portretOliwii from "../../assets/portret_Oliwii.png";
import portretSlubnyPary from "../../assets/portret_slubny_pary.jpg";

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
  onSelectProduct: (product: any) => void;
}

const TESTIMONIALS = [
  {
    id: 1,
    stars: 5,
    text: "„Portret ślubny wyszedł niesamowicie. Kiedy rozpakowaliśmy przesyłkę, oboje mieliśmy łzy w oczach. Dbałość o szczegóły i faktura farby olejnej na płótnie robią spektakularne wrażenie na żywo.”",
    author: "Anna K.",
    meta: "Warszawa • Portret Ślubny Pary"
  },
  {
    id: 2,
    stars: 5,
    text: "„Zamówiłem portret córki Marysi. Kontakt z Panem Maciejem był rewelacyjny na każdym etapie – od projektu cyfrowego po gotowy obraz. Odbiór osobisty w Łodzi był bardzo miłym akcentem. Polecam z całego serca.”",
    author: "Piotr M.",
    meta: "Łódź • Portret Marysi"
  },
  {
    id: 3,
    stars: 5,
    text: "„Owalny portret Oliwii w salonie przykuwa uwagę każdego gościa. To nie jest zwykły wydruk ze zdjęcia, to prawdziwa sztuka z duszą. Gra światła na tym płótnie o różnych porach dnia jest zachwycająca.”",
    author: "Karolina W.",
    meta: "Kraków • Portret Oliwii"
  },
  {
    id: 4,
    stars: 5,
    text: "„Portret Leona to był strzał w dziesiątkę jako prezent dla taty. Obraz wisi w gabinecie i robi piorunujące wrażenie na wszystkich. Tradycyjna technika olejna ma tę głębię, której brak współczesnym wydrukom.”",
    author: "Michał T.",
    meta: "Poznań • Portret Leona"
  },
  {
    id: 5,
    stars: 5,
    text: "„Zamówiłem akwarelę do sypialni. Kolorystyka i nastrój tego rysunku są wręcz hipnotyzujące. Cały proces od wysyłki do dostarczenia paczki przebiegł sprawnie i bezpiecznie. Na pewno wrócę po kolejną pracę!”",
    author: "Zofia S.",
    meta: "Wrocław • Akwarela"
  },
  {
    id: 6,
    stars: 5,
    text: "„Rysunek ołówkiem wysłany w tubie zabezpieczony idealnie. Precyzja cieniowania i realizm powalają. Bardzo sprawna wysyłka i profesjonalne podejście.”",
    author: "Janusz B.",
    meta: "Gdańsk • Rysunek Ołówkiem"
  },
  {
    id: 7,
    stars: 5,
    text: "„Malowany portret dla rodziców na jubileusz okazał się najpiękniejszym prezentem. Rodzice byli wzruszeni, a obraz wisi w najważniejszym miejscu w domu.”",
    author: "Małgorzata D.",
    meta: "Katowice • Portret Ślubny Pary"
  },
  {
    id: 8,
    stars: 5,
    text: "„Klasa sama w sobie. Tradycyjny warsztat malarski czuć od pierwszego spojrzenia na płótno. Szczerze polecam każdemu, kto ceni autentyczne rzemiosło.”",
    author: "Tomasz R.",
    meta: "Lublin • Portret Leona"
  },
  {
    id: 9,
    stars: 5,
    text: "„Kupiłem gotową akwarelę do pokoju gościnnego. Kolory są jeszcze piękniejsze na żywo niż na zdjęciach. Bardzo szybka dostawa, obraz był solidnie spakowany.”",
    author: "Agnieszka K.",
    meta: "Szczecin • Akwarela"
  }
];

export default function Home({ setCurrentPage, onSelectProduct }: HomeProps) {
  // Email form state
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    shape: "rectangle",
    size: "30x40"
  });
  const [emailFiles, setEmailFiles] = useState<File[]>([]);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjects = [
    { value: "portrait_commission", label: "Chcę zlecić ręcznie malowany portret ze zdjęcia" },
    { value: "shop_delivery", label: "Interesuje mnie zakup oryginalnej akwareli lub rysunku" },
    { value: "other_question", label: "Zapytanie o dostępność prac / własny format / inne" }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.subject) {
      setIsEmailDropdownOpen(true);
      return;
    }
    setIsSubmitting(true);
    
    let bodyText = `Dzień dobry,\n\nNazywam się ${emailForm.name}. Piszę w sprawie kontaktu ze strony hellokostek.pl.\n\n`;
    if (emailForm.subject === "portrait_commission") {
      let sizeLabel = emailForm.size;
      if (emailForm.size === "30x40") sizeLabel = "Standardowy (30 x 40 cm)";
      else if (emailForm.size === "40x55") sizeLabel = "Średni (40 x 55 cm)";
      else if (emailForm.size === "50x70") sizeLabel = "Wielki (50 x 70 cm)";
      else if (emailForm.size === "custom") sizeLabel = "Niestandardowy (własny format)";
      bodyText += `Chciałabym zamówić portret ze zdjęcia o poniższych parametrach:\n- Format: ${emailForm.shape === "rectangle" ? "Prostokątne" : "Owalne"}\n- Rozmiar: ${sizeLabel}\n\n`;
    }
    bodyText += `Moja wiadomość:\n${emailForm.message}\n\nProszę o kontakt zwrotny pod adresem mailowym: ${emailForm.email}`;

    const mailtoUrl = `mailto:kontakt@hellokostek.pl?subject=${
      encodeURIComponent(emailForm.subject === "portrait_commission" ? "Zamówienie portretu ze zdjęcia" : "Zapytanie ogólne")
    }&body=${encodeURIComponent(bodyText)}`;
    
    setTimeout(() => {
      window.open(mailtoUrl, "_blank");
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmailForm({ name: "", email: "", subject: "", message: "", shape: "rectangle", size: "30x40" });
      setEmailFiles([]);
    }, 1000);
  };

  // Slider states and logic (infinite loop)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [prodIndex, setProdIndex] = useState(SHOP_PRODUCTS.length);
  const [prodTransitionEnabled, setProdTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 2 : 1;

  useEffect(() => {
    if (!prodTransitionEnabled) {
      const raf = requestAnimationFrame(() => {
        setProdTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [prodTransitionEnabled]);

  const handleProdTransitionEnd = () => {
    const N = SHOP_PRODUCTS.length;
    if (prodIndex >= 2 * N) {
      setProdTransitionEnabled(false);
      setProdIndex(prodIndex - N);
    } else if (prodIndex < N) {
      setProdTransitionEnabled(false);
      setProdIndex(prodIndex + N);
    }
  };

  const nextSlide = useCallback(() => {
    if (!prodTransitionEnabled) return;
    setProdIndex((prev) => prev + itemsPerPage);
  }, [itemsPerPage, prodTransitionEnabled]);

  const prevSlide = useCallback(() => {
    if (!prodTransitionEnabled) return;
    setProdIndex((prev) => prev - itemsPerPage);
  }, [itemsPerPage, prodTransitionEnabled]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const extendedProducts = [...SHOP_PRODUCTS, ...SHOP_PRODUCTS, ...SHOP_PRODUCTS];

  // Testimonials Slider states and logic (infinite loop)
  const [reviewsIndex, setReviewsIndex] = useState(TESTIMONIALS.length);
  const [reviewsTransitionEnabled, setReviewsTransitionEnabled] = useState(true);
  const [isReviewsPaused, setIsReviewsPaused] = useState(false);

  const reviewsPerPage = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;

  useEffect(() => {
    if (!reviewsTransitionEnabled) {
      const raf = requestAnimationFrame(() => {
        setReviewsTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [reviewsTransitionEnabled]);

  const handleReviewsTransitionEnd = () => {
    const N = TESTIMONIALS.length;
    if (reviewsIndex >= 2 * N) {
      setReviewsTransitionEnabled(false);
      setReviewsIndex(reviewsIndex - N);
    } else if (reviewsIndex < N) {
      setReviewsTransitionEnabled(false);
      setReviewsIndex(reviewsIndex + N);
    }
  };

  const nextReviewsSlide = useCallback(() => {
    if (!reviewsTransitionEnabled) return;
    setReviewsIndex((prev) => prev + reviewsPerPage);
  }, [reviewsPerPage, reviewsTransitionEnabled]);

  const prevReviewsSlide = useCallback(() => {
    if (!reviewsTransitionEnabled) return;
    setReviewsIndex((prev) => prev - reviewsPerPage);
  }, [reviewsPerPage, reviewsTransitionEnabled]);

  useEffect(() => {
    if (isReviewsPaused) return;
    const timer = setInterval(() => {
      nextReviewsSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isReviewsPaused, nextReviewsSlide]);

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-lime-accent selection:text-gray-900 animate-fadeIn">
      
      {/* 1. HERO SECTION: 50/50 ASYMMETRIC SPLIT */}
      <section className="px-6 py-20 md:py-36 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* Left: Massive Serif text + CTA */}
        <div className="lg:col-span-6 space-y-8 font-sans">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gray-900" />
            <span className="font-mono text-xs tracking-widest uppercase text-gray-400 font-bold">
              PRACOWNIA ARTYSTYCZNA • KOSTEK MACIEJ KOSTECZKA
            </span>
          </div>

          <h1 className="font-display text-8xl leading-[0.95] tracking-tight font-normal text-gray-950">
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
                Zamów swój portret
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Right: Premium oil portrait presentation */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-gray-100 shadow-sm bg-gray-50">
            <img
              src={heroObraz}
              alt="Portret olejny namalowany ze zdjęcia"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO GRID: ART-GALLERY STYLE ASYMMETRIC GRID WITH TRANSITIONS */}
      <section className="bg-gray-55/40 border-y border-gray-100 pt-32 pb-32 md:pb-40 px-6">
        <div className="max-w-[1600px] mx-auto space-y-16">
          <header className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">PORTFOLIO PRAC</span>
            <h2 className="font-display text-5xl text-gray-950 font-normal">Realizacje portretowe z Pracowni Artystycznej</h2>
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

          {/* Asymmetric CTA button at the bottom of the grid, pushed down and right to match layout flow */}
          <div className="flex justify-end pt-16 md:pt-48 lg:pt-56 pr-6 md:pr-24 lg:pr-36">
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
                Zamów swój portret
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2.5 TESTIMONIALS SECTION */}
      <section className="bg-stone-50/40 border-b border-gray-100 py-24 px-6">
        <div className="max-w-[1600px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">REKOMENDACJE</span>
              <h2 className="font-display text-5xl text-gray-950 font-normal">Opinie moich klientów</h2>
              <p className="font-sans text-gray-600 text-base leading-relaxed">
                Poznaj historie osób, dla których miałem przyjemność uwiecznić najważniejsze chwile na tradycyjnym płótnie malarskim.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 self-start md:self-end pb-1">
              <button
                onClick={prevReviewsSlide}
                aria-label="Poprzednie opinie"
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#E0115F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0115F] cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReviewsSlide}
                aria-label="Następne opinie"
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#E0115F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0115F] cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonials Slider */}
          <div 
            className="relative w-full pt-4 group/reviews-slider"
            onMouseEnter={() => setIsReviewsPaused(true)}
            onMouseLeave={() => setIsReviewsPaused(false)}
            onFocus={() => setIsReviewsPaused(true)}
            onBlur={() => setIsReviewsPaused(false)}
          >
            <div className="overflow-hidden w-full py-4 px-2 -my-4 -mx-2">
              <div 
                className={`flex -mx-3 md:-mx-4 ${reviewsTransitionEnabled ? "transition-transform duration-500 ease-in-out" : "transition-none"}`}
                style={{ transform: `translateX(-${reviewsIndex * (100 / reviewsPerPage)}%)` }}
                onTransitionEnd={handleReviewsTransitionEnd}
              >
                {extendedTestimonials.map((t, idx) => (
                  <div 
                    key={`${t.id}-${idx}`}
                    className="shrink-0 px-3 md:px-4 flex"
                    style={{ width: `${100 / reviewsPerPage}%` }}
                  >
                    <div className="bg-white border border-gray-150 rounded-3xl p-8 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(224,17,95,0.02)] transition-all duration-300 flex flex-col justify-between w-full min-h-[220px]">
                      <div className="space-y-4">
                        <div className="flex gap-1 text-[#E0115F]">
                          {[...Array(t.stars)].map((_, i) => (
                            <span key={i} className="text-sm">★</span>
                          ))}
                        </div>
                        <p className="font-sans text-gray-700 italic leading-relaxed text-sm sm:text-base">
                          {t.text}
                        </p>
                      </div>
                      <div className="pt-6 border-t border-gray-100">
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-wider text-gray-900 font-bold">{t.author}</h4>
                          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">{t.meta}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS TIMELINE: SYMMETRICAL, HORIZONTAL 4-STEP AXIS */}
      <section id="jak-zamowic-sekcja" className="py-32 md:py-40 px-6 max-w-[1600px] mx-auto scroll-mt-20">
        <header className="space-y-3 max-w-2xl mb-20 text-center mx-auto">
          <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">USTALONA ŚCIEŻKA KREACJI</span>
          <h2 className="font-display text-5xl text-gray-950 font-normal">Nieskomplikowany proces</h2>
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
        <div className="max-w-[1600px] mx-auto space-y-24">
          <header className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block font-bold">PROSTE WARUNKI</span>
            <h2 className="font-display text-5xl text-gray-950 font-normal">Cennik Podstawowy</h2>
            <p className="font-sans text-gray-600 text-base leading-relaxed">
              Dwa unikalne, harmonijne formaty standardowe. Podane ceny są wyjściowe dla ujęć jednoosobowych.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-24 max-w-4xl mx-auto items-stretch">
            {/* Format 1: Rectangle */}
            <div className="flex flex-col justify-between space-y-8 py-4">
              <div className="space-y-6 text-center">
                {/* 3:4 Rectangle Canvas Visualizer - Sharp/No rounded corners as requested */}
                <div className="w-48 aspect-[3/4] mx-auto bg-white border border-gray-150 rounded-none shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.03] hover:border-[#E0115F]/40 hover:shadow-[0_12px_32px_rgba(224,17,95,0.05)] mb-8 select-none relative group">
                  <div className="absolute inset-2 border border-dashed border-gray-100 rounded-none group-hover:border-[#E0115F]/20 transition-colors" />
                  <span className="text-sm font-mono text-gray-500 z-10 font-bold uppercase tracking-widest leading-none">3:4</span>
                  <span className="text-xs font-mono text-gray-400 z-10 mt-2 tracking-wide uppercase leading-none">Prostokąt</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block">Format Klasyczny</span>
                <div className="space-y-1">
                  <h3 className="font-display text-3.5xl text-gray-900 font-normal">Płótno Prostokątne</h3>
                  <div className="font-display text-2xl text-gray-500 font-normal">
                    30<span className="font-sans text-sm text-gray-400 mx-0.5 lowercase font-normal">x</span>40 cm*
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-md mx-auto">
                  Ponadczasowy kształt, doskonale odnajdujący się w większości tradycyjnych wnętrz i dobrze reagujący na klasyczne oświetlenie w ramie.
                </p>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400">CENA STARTOWA:</span>
                <span className="font-mono text-3xl font-bold text-gray-900">od 800 zł</span>
              </div>
            </div>

            {/* Format 2: Oval */}
            <div className="flex flex-col justify-between space-y-8 py-4">
              <div className="space-y-6 text-center">
                {/* 3:4 Oval Canvas Visualizer with perfect 50% border radius for realistic ellipse shape */}
                <div 
                  className="w-48 aspect-[3/4] mx-auto bg-white border border-gray-150 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.03] hover:border-[#E0115F]/40 hover:shadow-[0_12px_32px_rgba(224,17,95,0.05)] mb-8 select-none relative group"
                  style={{ borderRadius: "50%" }}
                >
                  <div 
                    className="absolute inset-2 border border-dashed border-gray-100 group-hover:border-[#E0115F]/20 transition-colors"
                    style={{ borderRadius: "50%" }}
                  />
                  <span className="text-sm font-mono text-gray-500 z-10 font-bold uppercase tracking-widest leading-none">3:4</span>
                  <span className="text-xs font-mono text-gray-400 z-10 mt-2 tracking-wide uppercase leading-none">Owal</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold block">Format Unikalny</span>
                <div className="space-y-1">
                  <h3 className="font-display text-3.5xl text-gray-900 font-normal">Płótno Owalne</h3>
                  <div className="font-display text-2xl text-gray-500 font-normal">
                    30<span className="font-sans text-sm text-gray-400 mx-0.5 lowercase font-normal">x</span>40 cm*
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-md mx-auto">
                  Subtelny, unikalny i nastrojowy sznyt. Owalna linia tła idealnie wybiórczo skupia uwagę obserwatora bezpośrednio na twarzy portretowanego.
                </p>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400">CENA STARTOWA:</span>
                <span className="font-mono text-3xl font-bold text-[#E0115F]">od 800 zł</span>
              </div>
            </div>
          </div>

          {/* Centered italicized informational subtext note with generous limits */}
          <div className="max-w-2xl mx-auto text-center pt-8">
            <p className="font-sans text-sm italic text-gray-600 leading-relaxed">
              * Podane formaty są wymiarami podstawowymi. Na specjalne życzenie maluję również wielkie płótna w formatach takich jak 40x55 cm, 50x70 cm oraz w dowolnym formacie niestandardowym.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SHOP TEASER SECTION: DIREXT TEXT LINK TO CURATED ART ARCHIVE */}
      <section className="py-32 md:py-40 px-6 max-w-[1600px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">KOLEKCJA INDYWIDUALNA</span>
            <h2 className="font-display text-4.5xl text-gray-950 font-normal">Sztuka nastrojowa do Twojego domu</h2>
            <p className="font-sans text-gray-600 text-base leading-relaxed">
              Nie szukasz portretu na zamówienie? Przejrzyj moje oryginalne akwarele o chłodnych tonach oraz precyzyjne rysunki ołókiem gotowe do wysyłki od zaraz.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 self-start md:self-end pb-1">
            <button
              onClick={prevSlide}
              aria-label="Poprzednie produkty"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#E0115F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0115F] cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Następne produkty"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#E0115F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0115F] cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive gallery slider - full section width */}
        <div 
          className="relative w-full pt-4 group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Slider Viewport */}
          <div className="overflow-hidden w-full">
            <div 
              className={`flex -mx-3 md:-mx-4 ${prodTransitionEnabled ? "transition-transform duration-500 ease-in-out" : "transition-none"}`}
              style={{ transform: `translateX(-${prodIndex * (100 / itemsPerPage)}%)` }}
              onTransitionEnd={handleProdTransitionEnd}
            >
              {extendedProducts.map((p, idx) => (
                <div 
                  key={`${p.id}-${idx}`}
                  className="shrink-0 px-3 md:px-4"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div 
                    onClick={() => onSelectProduct(p)}
                    className="group cursor-pointer overflow-hidden rounded-[24px] border border-gray-100 bg-gray-50 aspect-[3/4] relative shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <button
            onClick={() => {
              setCurrentPage("shop");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="button button--secondary"
          >
            <div className="button__blobs">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="button__text">
              Poznaj gotowe akwarele i rysunki ołówkiem
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>

      {/* 6. CONTACT SECTION: FORM */}
      <section id="kontakt-sekcja" className="border-t border-gray-100 bg-gray-50/50 py-32 md:py-40 px-6 scroll-mt-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-8 font-sans">
            <span className="font-mono text-xs text-[#E0115F] uppercase tracking-widest block font-bold">ROZPOCZNIJ ROZMOWĘ</span>
            <h2 className="font-display text-5xl text-gray-950 leading-none">Propozycja projektu bez zobowiązań.</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Napisz do mnie. Chętnie przejrzę Twoje kadry fotograficzne i doradzę, jak zaaranżować tło portretu, by wyglądało ono niezwykle szlachetnie i malarsko na płótnie.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-150 p-6 sm:p-10 space-y-6">
            <h3 className="font-display text-2xl text-gray-900 border-b border-gray-100 pb-4">Zamów wycenę Twojego portretu</h3>
            
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
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Imię i Nazwisko *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="np. Anna Kowalska"
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#C4F013] focus:ring-1 focus:ring-[#C4F013] focus:bg-white outline-none rounded-xl text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Twój Adres E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="np. anna.kowalska@gmail.com"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#C4F013] focus:ring-1 focus:ring-[#C4F013] focus:bg-white outline-none rounded-xl text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Czego dotyczy Twoja wizja?</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsEmailDropdownOpen(!isEmailDropdownOpen)}
                      className={`w-full p-3 pr-10 bg-gray-50 border border-gray-200 focus:border-[#C4F013] focus:ring-1 focus:ring-[#C4F013] focus:bg-white outline-none rounded-xl text-sm transition-all cursor-pointer text-left flex justify-between items-center ${
                        emailForm.subject ? "text-gray-950" : "text-gray-400"
                      }`}
                    >
                      <span>
                        {emailForm.subject 
                          ? subjects.find(s => s.value === emailForm.subject)?.label 
                          : "Wybierz temat..."
                        }
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isEmailDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isEmailDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setIsEmailDropdownOpen(false)}
                        />
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-20 py-1 overflow-hidden animate-scaleIn origin-top">
                          {subjects.map((subj) => (
                            <button
                              key={subj.value}
                              type="button"
                              onClick={() => {
                                setEmailForm(prev => ({ ...prev, subject: subj.value }));
                                setIsEmailDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                                emailForm.subject === subj.value 
                                  ? "bg-gray-50/80 text-[#E0115F] font-semibold" 
                                  : "text-gray-700"
                              }`}
                            >
                              {subj.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {emailForm.subject === "portrait_commission" && (
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 animate-scaleIn space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">Kształt podobrazia</span>
                      <div className="flex gap-3">
                        <label className={`flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:border-[#C4F013] text-sm font-sans transition-all text-center ${
                          emailForm.shape === "rectangle" ? "border-[#C4F013] ring-1 ring-[#C4F013] bg-white shadow-xs font-semibold text-gray-950" : "border-gray-200 bg-transparent text-gray-500 hover:bg-white"
                        }`}>
                          <input
                            type="radio"
                            name="shape"
                            value="rectangle"
                            checked={emailForm.shape === "rectangle"}
                            onChange={(e) => setEmailForm({...emailForm, shape: e.target.value})}
                            className="sr-only"
                          />
                          Prostokątne
                        </label>
                        <label className={`flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:border-[#C4F013] text-sm font-sans transition-all text-center ${
                          emailForm.shape === "oval" ? "border-[#C4F013] ring-1 ring-[#C4F013] bg-white shadow-xs font-semibold text-gray-950" : "border-gray-200 bg-transparent text-gray-500 hover:bg-white"
                        }`}>
                          <input
                            type="radio"
                            name="shape"
                            value="oval"
                            checked={emailForm.shape === "oval"}
                            onChange={(e) => setEmailForm({...emailForm, shape: e.target.value})}
                            className="sr-only"
                          />
                          Owalne
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">Wybierz wstępny rozmiar</span>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:border-[#C4F013] text-sm font-sans transition-all text-center ${
                          emailForm.size === "30x40" ? "border-[#C4F013] ring-1 ring-[#C4F013] bg-white shadow-xs font-semibold text-gray-950" : "border-gray-200 bg-transparent text-gray-500 hover:bg-white"
                        }`}>
                          <input
                            type="radio"
                            name="size"
                            value="30x40"
                            checked={emailForm.size === "30x40"}
                            onChange={(e) => setEmailForm({...emailForm, size: e.target.value})}
                            className="sr-only"
                          />
                          Standardowy (30 x 40 cm)
                        </label>
                        <label className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:border-[#C4F013] text-sm font-sans transition-all text-center ${
                          emailForm.size === "40x55" ? "border-[#C4F013] ring-1 ring-[#C4F013] bg-white shadow-xs font-semibold text-gray-950" : "border-gray-200 bg-transparent text-gray-500 hover:bg-white"
                        }`}>
                          <input
                            type="radio"
                            name="size"
                            value="40x55"
                            checked={emailForm.size === "40x55"}
                            onChange={(e) => setEmailForm({...emailForm, size: e.target.value})}
                            className="sr-only"
                          />
                          Średni (40 x 55 cm)
                        </label>
                        <label className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:border-[#C4F013] text-sm font-sans transition-all text-center ${
                          emailForm.size === "50x70" ? "border-[#C4F013] ring-1 ring-[#C4F013] bg-white shadow-xs font-semibold text-gray-950" : "border-gray-200 bg-transparent text-gray-500 hover:bg-white"
                        }`}>
                          <input
                            type="radio"
                            name="size"
                            value="50x70"
                            checked={emailForm.size === "50x70"}
                            onChange={(e) => setEmailForm({...emailForm, size: e.target.value})}
                            className="sr-only"
                          />
                          Wielki (50 x 70 cm)
                        </label>
                        <label className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:border-[#C4F013] text-sm font-sans transition-all text-center ${
                          emailForm.size === "custom" ? "border-[#C4F013] ring-1 ring-[#C4F013] bg-white shadow-xs font-semibold text-gray-950" : "border-gray-200 bg-transparent text-gray-500 hover:bg-white"
                        }`}>
                          <input
                            type="radio"
                            name="size"
                            value="custom"
                            checked={emailForm.size === "custom"}
                            onChange={(e) => setEmailForm({...emailForm, size: e.target.value})}
                            className="sr-only"
                          />
                          Niestandardowy (własny format)
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Opisz swoją wizję lub przeznaczenie obrazu *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Napisz dla kogo powstaje obraz, czy to pamiątka rodzinna, prezent na rocznicę i czy masz już wybrane ujęcia zdjęciowe..."
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#C4F013] focus:ring-1 focus:ring-[#C4F013] focus:bg-white outline-none rounded-xl text-sm transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Dołącz poglądowe zdjęcia (JPG, PNG)</span>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer relative"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          setEmailFiles(Array.from(e.target.files));
                        }
                      }}
                      className="hidden"
                    />
                    <div className="space-y-2 pointer-events-none">
                      <div className="text-xs font-medium text-gray-500">
                        {emailFiles.length > 0 ? (
                          <span className="text-[#E0115F] font-bold">
                            ✓ Wybrano {emailFiles.length} {emailFiles.length === 1 ? 'plik' : emailFiles.length < 5 ? 'pliki' : 'plików'}: {emailFiles.map(f => f.name).join(", ")}
                          </span>
                        ) : (
                          <span>Kliknij, by załączyć klatki zdjęciowe (możesz też wysłać je bezpośrednio w mailu)</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Twoje dane są w pełni bezpieczne.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
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
                          <span>Wyślij zapytanie</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </div>
                  </button>
                  <p className="text-xs text-gray-550 font-sans text-center mt-4 leading-relaxed">
                    * Po kliknięciu wygenerujemy ustrukturyzowany szablon zapytania i uruchomimy Twoją domyślną pocztę, dzięki czemu bezpiecznie załączysz pliki i prześlesz je do <strong>kontakt@hellokostek.pl</strong>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
