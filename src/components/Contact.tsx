import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Check, HelpCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "portrait_commission",
    message: "",
    shape: "rectangle",
    size: "30x40"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSent, setIsSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format mail details for mailto action
    let bodyText = `Dzień dobry,%0D%0A%0D%0ANazywam się ${formData.name}. Piszę ze strony HelloKostek.pl.%0D%0A%0D%0A`;
    if (formData.subject === "portrait_commission") {
      bodyText += `Chciałabym zamówić portret ze zdjęcia o poniższych parametrach:%0D%0A- Format: ${formData.shape === "rectangle" ? "Prostokątne" : "Owalne"}%0D%0A- Rozmiar: ${formData.size}%0D%0A%0D%0A`;
    }
    bodyText += `Moja wiadomość:%0D%0A${formData.message}%0D%0A%0D%0AProszę o kontakt zwrotny pod adresem mailowym: ${formData.email}`;

    const mailtoUrl = `mailto:kontakt@hellokostek.pl?subject=${
      formData.subject === "portrait_commission" ? "Zamówienie portretu ze zdjęcia" : "Zapytanie ogólne"
    }&body=${encodeURIComponent(bodyText)}`;

    window.open(mailtoUrl, "_blank");
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  const faqs = [
    {
      q: "Jakie zdjęcia powinny zostać przesłane do portretu?",
      a: "Najlepiej, aby przesyłane zdjęcia były ostre, o dobrej rozdzielczości, w naturalnym świetle dziennym (nie od dołu i nie z lampą błyskową). Twarz powinna być dobrze widoczna. Jeśli nie jesteś pewna, wyślij kilka propozycji – wspólnie wybierzemy ujęcie o najlepszym malarskim potencjale."
    },
    {
      q: "Ile trwa namalowanie obrazu i dlaczego aż 3-4 tygodnie?",
      a: "Tradycyjne malarstwo olejne wymaga nakładania kolejnych warstw farby, które schną znacznie wolniej niż powszechne farby akrylowe czy plakatowe. Po zakończeniu malowania obraz musi przejść naturalny proces schnięcia przed nałożeniem werniksu ochronnego i bezpiecznym zapakowaniem. Zależy mi na tym, by do Twojego domu dotarło dzieło trwałe na dekady."
    },
    {
      q: "Jakie są opcje dostawy?",
      a: "Przesyłka kurierska na terenie całego kraju (oraz dowóz osobisty na terenie Łodzi) są całkowicie bezpłatne i wliczone w cenę portretu. Każda wysyłka jest ubezpieczona oraz pancernie zapakowana."
    },
    {
      q: "Czy zapłacę zadatek przy złożeniu zamówienia?",
      a: "Zadatek w wysokości 50% ceny portretu olejnego (bezzwrotny) jest wpłacany dopiero po pełnej akceptacji cyfrowego projektu kompozycji. Przelew potwierdza rezerwację terminu malarskiego. Pozostałe 50% dopłacasz po namalowaniu i ostatecznej akceptacji obrazu ze zdjęcia."
    }
  ];

  return (
    <div className="animate-fadeIn py-12 px-6 max-w-7xl mx-auto space-y-20 font-sans">
      
      {/* Introduction Banner */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-xs text-stone-500 uppercase tracking-widest block font-bold">Porozmawiajmy o Twoim obrazie</span>
        <h1 className="font-display text-3xl sm:text-4.5xl text-off-black">Napisz lub Wyślij Zdjęcia</h1>
        <p className="text-sm sm:text-base text-off-black/70 leading-relaxed font-sans">
          Chcesz zapytać o wolne terminy, doradzić się w sprawie formatu, czy złożyć oficjalne zamówienie? Skonfiguruj wstępne zapytanie poniżej lub wyślij bezpośrednią wiadomość na mój adres mailowy.
        </p>
      </section>

      {/* Main Row: Configurer/Form + Standard contact info details */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column - Standard and visual contact info */}
        <div className="lg:col-span-4 space-y-8 bg-stone-100/50 p-8 rounded-3xl border border-off-black/5">
          <h3 className="font-display text-xl text-off-black">Pracownia HelloKostek</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-white rounded-xl border border-off-black/5 flex items-center justify-center text-magenta-accent shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <strong className="block text-off-black font-semibold uppercase tracking-wider text-xs font-mono">E-mail</strong>
                <a href="mailto:kontakt@hellokostek.pl" className="text-off-black/80 hover:text-magenta-accent hover:underline break-all font-semibold block mt-1">
                  kontakt@hellokostek.pl
                </a>
                <span className="text-stone-500 block text-xs mt-0.5">Odpowiadam w ciągu 24 godz.</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-white rounded-xl border border-off-black/5 flex items-center justify-center text-magenta-accent shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <strong className="block text-off-black font-semibold uppercase tracking-wider text-xs font-mono">Pracownia</strong>
                <span className="text-off-black/80 font-medium block mt-1">Łódź, Polska</span>
                <span className="text-stone-500 block text-xs mt-0.5">Odbiór osobisty i dowóz w granicach Łodzi za darmo.</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-white rounded-xl border border-off-black/5 flex items-center justify-center text-magenta-accent shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <strong className="block text-off-black font-semibold uppercase tracking-wider text-xs font-mono">Social Media</strong>
                <span className="text-off-black/80 block mt-1">Znajdziesz mnie na Instagramie i Facebooku pod nazwą <strong className="hover:underline">@hellokostek</strong>.</span>
              </div>
            </div>
          </div>

          <div className="border-t border-off-black/15 pt-6 space-y-4">
            <h4 className="font-display font-medium text-off-black">Instrukcja od klienta:</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Zgłoszenia portretowe akceptuję wyłącznie jako sformalizowaną i czytelną wiadomość e-mail. Po przesłaniu projektu i danych do przelewu rezerwuję termin malowania.
            </p>
          </div>
        </div>

        {/* Right Column - Dedicated clean form handler */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white border border-off-black/15 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-stone-500">Imię i Nazwisko *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="np. Anna Kowalska"
                className="w-full p-3.5 bg-stone-50/50 border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:border-off-black transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-stone-500">Adres E-mail *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="np. anna.kowalska@gmail.com"
                className="w-full p-3.5 bg-stone-50/50 border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:border-off-black transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase text-stone-500">Czego dotyczy zapytanie?</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3.5 bg-stone-50/50 border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:border-off-black transition-all outline-none"
            >
              <option value="portrait_commission">Chcę zamówić portret ze zdjęcia (800 zł)</option>
              <option value="shop_delivery">Interesuje mnie gotowe dzieło ze sklepu (rysunek / akwarela)</option>
              <option value="other_question">Inny temat / Pytanie do artysty</option>
            </select>
          </div>

          {/* Conditional parameters fields showing up for Custom Portrait Commision */}
          {formData.subject === "portrait_commission" && (
            <div className="p-4 bg-lime-accent/10 border border-lime-accent/35 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 animate-scaleIn">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-stone-500">Kształt Płótna</span>
                <div className="flex gap-2">
                  <label className="flex-1 flex items-center gap-2 p-2.5 bg-white border rounded-xl cursor-pointer hover:bg-stone-50 text-xs">
                    <input
                      type="radio"
                      name="shape"
                      value="rectangle"
                      checked={formData.shape === "rectangle"}
                      onChange={handleInputChange}
                      className="text-magenta-accent focus:ring-magenta-accent"
                    />
                    <span>Prostokątne 30x40 cm</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 p-2.5 bg-white border rounded-xl cursor-pointer hover:bg-stone-50 text-xs">
                    <input
                      type="radio"
                      name="shape"
                      value="oval"
                      checked={formData.shape === "oval"}
                      onChange={handleInputChange}
                      className="text-magenta-accent focus:ring-magenta-accent"
                    />
                    <span>Owalne 30x40 cm</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-stone-500">Preferowany Rozmiar</span>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white border rounded-xl text-xs"
                >
                  <option value="30x40">Standardowy (30 x 40 cm)</option>
                  <option value="40x55">Średni (40 x 55 cm)</option>
                  <option value="50x70">Wielki (50 x 70 cm)</option>
                </select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase text-stone-500">Treść wiadomości / Opis pomysłu *</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Opisz nam kogo będziemy uwieczniać na obrazie, czy zależy Ci na konkretnej palecie kolorystycznej lub czy obraz jest prezentem na zbliżającą się datę rocznicy..."
              className="w-full p-3.5 bg-stone-50/50 border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:border-off-black transition-all outline-none font-sans"
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-stone-500 block">Wstępne Zdjęcia pomocnicze (opcjonalnie)</span>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-stone-300 rounded-xl p-4 text-center cursor-pointer hover:bg-stone-50 transition-all bg-stone-50/20"
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              {files.length > 0 ? (
                <p className="font-sans text-xs text-stone-700 font-semibold text-green-700">
                  Wybrano {files.length} plików: {files.map(f => f.name).join(", ")}
                </p>
              ) : (
                <p className="font-sans text-xs text-stone-500">
                  Wybierz zdjęcia ze swojego dysku (możesz też dołączyć je po prostu w mailu)
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-off-black text-white hover:bg-magenta-accent transition-all duration-300 rounded-xl font-bold font-sans text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Generuj i Wyślij E-mail
            </button>
            {isSent && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 font-semibold rounded-xl text-xs text-center flex items-center justify-center gap-2 border border-green-200">
                <Check className="w-4 h-4" />
                Dziękujemy! Otwarto program pocztowy z gotową wiadomością do kontaktu.
              </div>
            )}
            <p className="text-xs text-stone-500 font-sans text-center mt-3 leading-relaxed">
              * Po kliknięciu wygenerujemy ustrukturyzowany szablon wiadomości i otworzymy go w Twoim domyślnym programie pocztowym (np. Outlook, Gmail, Mail), dzięki czemu możesz bezpiecznie przesłać dołączone zdjęcia direct do <strong>kontakt@hellokostek.pl</strong>.
            </p>
          </div>
        </form>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="space-y-10 border-t border-off-black/10 pt-16">
        <div className="text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-magenta-accent mx-auto" />
          <h2 className="font-display text-2xl sm:text-3.5xl text-off-black">Często Zadawane Pytania (FAQ)</h2>
          <p className="font-sans text-sm text-off-black/60 max-w-lg mx-auto">
            Wszystko, co warto wiedzieć przed zleceniem portretu ze zdjęcia. Poznaj naszą troskę o najmniejsze detale.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-stone-200/60 p-6 rounded-2xl relative space-y-3 shadow-xs">
              <h4 className="font-sans font-semibold text-off-black text-sm sm:text-base">{faq.q}</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
