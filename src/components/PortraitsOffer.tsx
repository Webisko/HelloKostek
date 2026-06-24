import React, { useState, useRef } from "react";
import { Sliders, HelpCircle, Check, Sparkles, Image, ShieldCheck, Mail, ArrowRight, UploadCloud } from "lucide-react";

export default function PortraitsOffer() {
  const [canvasShape, setCanvasShape] = useState<"rectangle" | "oval">("rectangle");
  const [dimensions, setDimensions] = useState<"30x40" | "40x55" | "50x70">("30x40");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [wantsPets, setWantsPets] = useState<boolean>(false);
  
  // Custom interactive mock upload state
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculatePrice = () => {
    let price = 800; // standard 30x40
    if (dimensions === "40x55") price = 1100;
    if (dimensions === "50x70") price = 1500;
    
    // Add extra fee for people/animals
    if (peopleCount > 1) {
      price += (peopleCount - 1) * 300;
    }
    if (wantsPets) {
      price += 200;
    }
    return price;
  };

  const finalPrice = calculatePrice();
  const deposit = finalPrice * 0.5;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Generate mailto link with structured client query
  const mailToUrl = `mailto:kontakt@hellokostek.pl?subject=Zamówienie portretu ze zdjęcia - hellokostek.pl&body=Dzień dobry,%0D%0A%0D%0AChciałabym zapytać o możliwość namalowania portretu olejnego ze zdjęcia.%0D%0A%0D%0AOto wybrane parametry mojego zamówienia:%0D%0A- Kształt płótna: ${canvasShape === "rectangle" ? "Prostokątne" : "Owalne"}%0D%0A- Rozmiar: ${dimensions === "30x40" ? "30 x 40 cm" : dimensions === "40x55" ? "40 x 55 cm" : "50 x 70 cm"}%0D%0A- Liczba postaci ludzi na obrazie: ${peopleCount}%0D%0A- Dodatkowo zwierzę: ${wantsPets ? "Tak" : "Nie"}%0D%0A%0D%0A[Załączam wstępne zdjęcia w tej wiadomości email]%0D%0A%0D%0AProszę o informację o dostępnych terminach i procesie.%0D%0A%0D%0APozdrawiam serdecznie`;

  return (
    <div className="animate-fadeIn py-12 px-6 max-w-[1600px] mx-auto space-y-20">
      {/* Introduction Banner header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="font-mono text-xs text-magenta-accent uppercase tracking-widest block font-bold">Zrób wyjątkowy podarunek</span>
        <h1 className="font-display text-5xl text-off-black tracking-tight leading-tight">
          Portrety Olejne na Zamówienie <br />
          <span className="italic font-normal text-stone-600">— Rękodzieło Klasyczne ze Zdjęcia —</span>
        </h1>
        <p className="font-sans text-base sm:text-lg text-off-black/80 max-w-2xl mx-auto leading-relaxed">
          Stwórz pamiątkę pokoleniową, która emanuje ciepłem prawdziwych farb olejnych na płótnie bawełnianym. Idealny i głęboki prezent dla bliskich na rocznicę, urodziny lub jako trwałe uwiecznienie wspólnych chwil.
        </p>
      </section>

      {/* Shapes comparison & Pricing info banner */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Shape Illustration Visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Rectangular choice visual */}
          <div className="bg-white p-5 rounded-3xl border border-off-black/10 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] rounded-2xl bg-stone-100 overflow-hidden relative flex items-center justify-center p-2 border border-stone-200">
              <img
                src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-8.jpg"
                alt="Prostokątny obraz na płótnie"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-3 left-3 bg-off-black text-white text-xs font-mono px-3 py-1 rounded-full uppercase">
                Prostokątne 30x40 cm
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-off-black">Klasyczne Płótno Bawełniane</h3>
              <p className="text-xs text-stone-500 font-sans mt-1">Splot prostokątny, naciąg na krosna sosnowe</p>
              <div className="text-magenta-accent font-bold mt-2">800 zł</div>
            </div>
          </div>

          {/* Oval Choice visual */}
          <div className="bg-white p-5 rounded-3xl border border-magenta-accent/20 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] rounded-full bg-stone-100 overflow-hidden relative border-4 border-double border-stone-300 flex items-center justify-center p-2">
              <img
                src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-7-2022-scaled.jpg"
                alt="Owalny obraz ze zdjęcia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-3 bg-magenta-accent text-white text-xs font-mono px-3 py-1 rounded-full uppercase">
                Owalne 30x40 cm
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-off-black">Wyrafinowane Płótno Owalne</h3>
              <p className="text-xs text-stone-500 font-sans mt-1">Nietuzinkowy, klasyczny format, krosno owalne 30x40</p>
              <div className="text-magenta-accent font-bold mt-2">800 zł</div>
            </div>
          </div>
        </div>

        {/* Narrative bullet points targeted to women 40+ */}
        <div className="space-y-8">
          <span className="font-mono text-xs uppercase text-stone-500 tracking-wider">Dlaczego warto wybrać portret olejny?</span>
          <h2 className="font-display text-3xl text-off-black">Czyste rzemiosło w domowych galeriach</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-lime-accent text-off-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-off-black">Dozgonny charakter fizycznych farb olejnych</h4>
                <p className="text-sm text-off-black/70 font-sans mt-1">
                  Obraz olejny ma wspaniałą malarską fakturę i w przeciwieństwie do wydruków, mieni się w świetle dziennym. Z biegiem lat nabiera szlachetności.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-lime-accent text-off-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-off-black">3 rundy darmowych poprawek do projektu</h4>
                <p className="text-sm text-off-black/70 font-sans mt-1">
                  Przed przystąpieniem do malowania tworzę cyfrowy kolaż, pokazujący docelową kompozycję i twarz. Masz pełen wpływ na wielkość i ułożenie.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-lime-accent text-off-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-off-black">Doskonała komunikacja i bezpieczeństwo</h4>
                <p className="text-sm text-off-black/70 font-sans mt-1">
                  Po ukończeniu malowania wysyłam Ci szczegółowe zdjęcie podglądowe. Wprowadzam do 3 poprawek bezpośrednio na płótnie, by efekt finalny wywołał łzy wzruszenia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CALCULATOR SECTION */}
      <section className="bg-stone-50 border border-off-black/5 rounded-3xl p-6 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-accent/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-magenta-accent/5 rounded-full blur-2xl pointer-events-none" />

        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs text-stone-500 uppercase tracking-widest block">Stwórz własną kompozycję</span>
            <h3 className="font-display text-3xl text-off-black mt-2">Kalkulator wyceny portretu</h3>
            <p className="text-sm text-stone-500 font-sans mt-1">Ustaw parametry, aby oszacować budżet i zobaczyć przejrzyste koszty.</p>
          </div>

          <div className="space-y-6">
            {/* Shapes selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-off-black/60 block">1. Kształt Krosna Płóciennego</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCanvasShape("rectangle")}
                  className={`py-3 px-4 rounded-xl font-sans text-sm font-semibold border transition-all ${
                    canvasShape === "rectangle"
                      ? "bg-off-black text-white border-off-black"
                      : "bg-white text-off-black/70 border-off-black/10 hover:border-off-black"
                  }`}
                >
                  Prostokątne
                </button>
                <button
                  onClick={() => setCanvasShape("oval")}
                  className={`py-3 px-4 rounded-xl font-sans text-sm font-semibold border transition-all ${
                    canvasShape === "oval"
                      ? "bg-magenta-accent text-white border-magenta-accent"
                      : "bg-white text-off-black/70 border-off-black/10 hover:border-magenta-accent/20"
                  }`}
                >
                  Owalne
                </button>
              </div>
            </div>

            {/* Standard Sizes */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-off-black/60 block">2. Rozmiar Płótna (cm)</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "30x40", label: "30 x 40", desc: "Podstawowy" },
                  { key: "40x55", label: "40 x 55", desc: "+300 zł" },
                  { key: "50x70", label: "50 x 70", desc: "+700 zł" }
                ].map((size) => (
                  <button
                    key={size.key}
                    onClick={() => setDimensions(size.key as any)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      dimensions === size.key
                        ? "bg-off-black text-white border-off-black"
                        : "bg-white text-off-black/70 border-off-black/10 hover:border-off-black"
                    }`}
                  >
                    <span className="block font-sans text-sm font-semibold">{size.label}</span>
                    <span className="block text-xs opacity-60 font-sans mt-0.5">{size.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* People & Pets selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-off-black/60 block">3. Liczba Malowanych Osób</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                    disabled={peopleCount <= 1}
                    className="w-10 h-10 rounded-lg border border-off-black/10 flex items-center justify-center font-bold font-mono text-off-black hover:bg-stone-100 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg w-8 text-center">{peopleCount}</span>
                  <button
                    onClick={() => setPeopleCount(peopleCount + 1)}
                    className="w-10 h-10 rounded-lg border border-off-black/10 flex items-center justify-center font-bold font-mono text-off-black hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
                {peopleCount > 1 && (
                  <span className="text-xs text-[#E0115F] font-sans block mt-1">+300 zł za każdą kolejną osobę</span>
                )}
              </div>

              <div className="space-y-3 flex flex-col justify-end">
                <span className="text-xs font-mono uppercase tracking-widest text-off-black/60 block">4. Zwierzę na obrazie?</span>
                <label className="inline-flex items-center gap-3 p-3 bg-white hover:bg-stone-100 rounded-xl cursor-pointer border border-off-black/10">
                  <input
                    type="checkbox"
                    checked={wantsPets}
                    onChange={(e) => setWantsPets(e.target.checked)}
                    className="w-4 h-4 rounded text-magenta-accent focus:ring-magenta-accent border-stone-300"
                  />
                  <span className="font-sans text-sm text-off-black font-medium">Ukochany zwierzak (+200 zł)</span>
                </label>
              </div>
            </div>

            {/* Demonstration photo drag n drop file select */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-off-black/60 block">5. Wgraj wstępne zdjęcie (opcjonalnie)</label>
              <div
                onClick={triggerFileSelect}
                className="border-2 border-dashed border-stone-300 hover:border-magenta-accent transition-colors rounded-2xl p-6 text-center cursor-pointer bg-white"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                {uploadedFileName ? (
                  <div className="space-y-2">
                    <p className="font-sans text-sm text-green-600 font-semibold">Dodano zdjęcie pomyślnie!</p>
                    <p className="font-mono text-xs text-stone-500">{uploadedFileName}</p>
                    {uploadPreview && (
                      <img src={uploadPreview} alt="Podgląd zdjęcia" className="mx-auto h-32 object-contain rounded-lg border" />
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 text-stone-500">
                    <UploadCloud className="w-8 h-8 mx-auto text-stone-400" />
                    <p className="font-sans text-sm">Przeciągnij zdjęcie portretowanej osoby lub <span className="text-magenta-accent underline">wybierz z dysku</span></p>
                    <p className="font-mono text-xs text-stone-400">JPG, PNG do 10 MB. Twoje dane i wizerunek są poufne.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary Widget */}
        <div className="lg:col-span-5 bg-white border border-off-black/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm relative sticky top-24">
          <h4 className="font-display text-xl text-off-black border-b border-off-black/5 pb-4">Kosztorys Twojego obrazu</h4>
          
          <div className="space-y-4 font-sans text-sm">
            <div className="flex justify-between">
              <span className="text-off-black/70">Wymiar Płótna</span>
              <span className="font-medium">{dimensions === "30x40" ? "30 x 40 cm" : dimensions === "40x55" ? "40 x 55 cm" : "50 x 70 cm"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-off-black/70">Kształt Płótna</span>
              <span className="font-medium capitalize">{canvasShape === "rectangle" ? "Prostokątne" : "Owalne"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-off-black/70">Postaci na obrazie</span>
              <span className="font-medium">{peopleCount} {peopleCount === 1 ? "osoba" : "osoby"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-off-black/70">Zwierzak</span>
              <span className="font-medium">{wantsPets ? "Tak" : "Nie"}</span>
            </div>

            <div className="border-t border-off-black/5 pt-4 flex justify-between items-baseline">
              <span className="font-semibold text-off-black">Cena całkowita:</span>
              <span className="text-2xl font-bold text-magenta-accent">{finalPrice} zł</span>
            </div>

            <div className="bg-lime-accent/20 border border-lime-accent/40 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs text-stone-700">
                <span className="font-medium">Bezzwrotny zadatek (50%):</span>
                <span className="font-bold font-mono">{deposit} zł</span>
              </div>
              <p className="text-xs text-stone-600 leading-normal">
                Zadatek jest wpłacany <strong>dopiero po akceptacji projektu cyfrowego</strong>. Drugie 50% płatne jest po namalowaniu i ostatecznym zaakceptowaniu obrazu ze zdjęcia.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={mailToUrl}
              className="button button--full"
            >
              <div className="button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="button__text">
                <Mail className="w-4 h-4" />
                Wyślij zgłoszenie mailowe
              </div>
            </a>
            <p className="text-xs text-stone-500 font-sans text-center leading-normal">
              Po kliknięciu otworzy się Twój program pocztowy. Proszę załącz zdjęcia, a ja odpowiem w przeciągu 24 godzin na adres <strong>kontakt@hellokostek.pl</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILED JOURNEY TIMELINE OF ORDERING (Droga zamówienia) */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <span className="font-mono text-xs uppercase text-stone-500 tracking-wider">Krok po kroku</span>
          <h2 className="font-display text-4xl text-off-black">Jak wygląda cały proces?</h2>
          <p className="font-sans text-sm sm:text-base text-off-black/60 max-w-xl mx-auto">
            Dbam o to, by cały proces był dla Ciebie przyjemny, jasny i w pełni zintegrowany z Twoimi oczekiwaniami. Nie kupujesz kota w worku!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Zapytanie i Zdjęcia",
              desc: "Kontaktujesz się ze mną mailowo na kontakt@hellokostek.pl lub przez social media. Przesyłasz zdjęcia i opowiadasz o swoim pomysle na wymarzony obraz."
            },
            {
              step: "02",
              title: "Cyfrowy Szkic",
              desc: "W programie graficznym tworzę projekt pokazujący dokładną kompozycję i twarz. Konsultujemy go mailowo – masz prawo do 3 rund darmowych poprawek."
            },
            {
              step: "03",
              title: "Zadatek 50%",
              desc: "Po zaakceptowaniu projektu proszę o wpłatę zadatku wysokości 50% ceny (bezzwrotny). Po zaksięgowaniu wpłaty rezerwuję termin i zaczynam malowanie."
            },
            {
              step: "04",
              title: "Proces Malowania",
              desc: "Trwa to zazwyczaj ok. 3-4 tygodnie. Olej schnie bardzo powoli. Zależy mi, by obraz był kompletnie suchy i bezpieczny przed spakowaniem."
            },
            {
              step: "05",
              title: "Zdjęcie do Akceptacji",
              desc: "Po skończeniu malowania wysyłam Ci wysokiej jakości zdjęcie obrazu. Oferuję do 3 bezpłatnych poprawek plam barwnych już direct na płótnie."
            },
            {
              step: "06",
              title: "Przesyłka lub Odbiór",
              desc: "Po akceptacji i wpłacie końcowej, bezpiecznie pakuję obraz i wysyłam kurierem gratis na terenie Polski, lub doworzę osobiście na terenie Łodzi!"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white border border-off-black/5 p-8 rounded-2xl relative space-y-4 hover:border-magenta-accent/20 transition-all shadow-xs">
              <span className="text-stroke-title text-4xl font-mono font-bold leading-none block text-stone-300">
                {item.step}
              </span>
              <h4 className="font-display text-lg font-semibold text-off-black">{item.title}</h4>
              <p className="text-sm text-off-black/70 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sizing & Custom requests FAQ call */}
      <section className="bg-lime-accent rounded-3xl p-8 sm:p-12 text-off-black flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <h3 className="font-display text-3xl text-off-black leading-tight">Potrzebujesz większego formatu lub kompozycji wieloosobowej?</h3>
          <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90">
            Z przyjemnością namaluję obrazy na specjalne zamówienie w większych wymiarach niż standardowe. Cena zależy od ilości portretowanych osób, rozmiaru krosna i stopnia złożoności tła. Wszystko ustalimy mailowo!
          </p>
        </div>
        <a
          href="mailto:kontakt@hellokostek.pl?subject=Indywidualne zamówienie dużego portretu&body=Dzień dobry,%0D%0A%0D%0ACHciałabym zapytać o indywidualną wycenę dużego formatu portretu..."
          className="button shrink-0"
        >
          <div className="button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="button__text">
            Napisz do mnie po wycenę
            <ArrowRight className="w-4 h-4" />
          </div>
        </a>
      </section>
    </div>
  );
}
