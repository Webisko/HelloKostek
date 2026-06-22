import React, { useState, useRef } from "react";
import { Mail, MapPin, Send, MessageSquare, Check, HelpCircle } from "lucide-react";

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
    let bodyText = `Dzień dobry,\n\nNazywam się ${formData.name}. Piszę w sprawie kontaktu ze strony HelloKostek.pl.\n\n`;
    if (formData.subject === "portrait_commission") {
      bodyText += `Chciałabym zamówić portret ze zdjęcia o poniższych parametrach:\n- Format: ${formData.shape === "rectangle" ? "Prostokątne" : "Owalne"}\n- Rozmiar: ${formData.size}\n\n`;
    }
    bodyText += `Moja wiadomość:\n${formData.message}\n\nProszę o kontakt zwrotny pod adresem mailowym: ${formData.email}`;

    const mailtoUrl = `mailto:kontakt@hellokostek.pl?subject=${
      encodeURIComponent(formData.subject === "portrait_commission" ? "Zamówienie portretu ze zdjęcia" : "Zapytanie ogólne")
    }&body=${encodeURIComponent(bodyText)}`;

    window.open(mailtoUrl, "_blank");
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  const faqs = [
    {
      q: "Jakie zdjęcia powinny zostać przesłane do portretu olejnego?",
      a: "Najlepiej, aby przesyłane zdjęcia były ostre, o dobrej rozdzielczości, w naturalnym świetle dziennym (nie od dołu i nie z lampą błyskową). Twarz powinna być dobrze widoczna i naturalna. Jeśli nie jesteś pewna, wyślij kilka propozycji – wspólnie wybierzemy ujęcie o najlepszym malarskim potencjale kompozycyjnym."
    },
    {
      q: "Ile trwa namalowanie obrazu olejnego ze zdjęcia?",
      a: "Tradycyjne malarstwo olejne wymaga nakładania kolejnych warstw farby, które schną naturalnie. Cały proces schnięcia, nałożenie końcowego werniksu ochronnego oraz pancerne zapakowanie zajmuje około 3-4 tygodnie. Zależy mi na tym, by do Twojego domu dotarło dzieło o najwyższej trwałości."
    },
    {
      q: "Jakie są opcje dostawy obrazów HelloKostek?",
      a: "Przesyłka kurierska na terenie całej Polski oraz bezpieczny dowóz osobisty w granicach Łodzi są całkowicie bezpłatne i wliczone w cenę portretu. Każda paczka jest w pełni ubezpieczona oraz pakowana z dbałością o stan płótna."
    },
    {
      q: "Czy przy zamówieniu portretu wymagany jest zadatek?",
      a: "Zadatek w wysokości 50% ceny portretu olejnego (bezzwrotny) jest wpłacany dopiero po pełnej akceptacji cyfrowego projektu kompozycji ułożonego ze zdjęć. Pozostałe 50% dopłacasz po namalowaniu i ostatecznej akceptacji gotowego obrazu."
    }
  ];

  return (
    <div className="animate-fadeIn py-16 px-6 max-w-[1600px] mx-auto space-y-24">
      {/* Editorial Title banner */}
      <header className="border-b border-gray-100 pb-12 max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block mb-4">
          Zróbmy coś wiecznego • Kontakt z artystą
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-gray-900 tracking-tight leading-none font-normal">
          Uwiecznijmy wspomnienia.
        </h1>
        <p className="font-sans text-gray-600 text-base sm:text-lg max-w-2xl mt-4 leading-relaxed">
          Niezależnie od tego, czy masz już przygotowane konkretne klatki zdjęciowe, czy szukasz porady odnośnie kompozycji i tła – napisz. Każdy proces twórczy zaczyna się od prostej rozmowy.
        </p>
      </header>

      {/* Main 50/50 Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Side: Bold Local Contact & Delivery Copy (50%) */}
        <div className="lg:col-span-6 space-y-10">
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl text-gray-900 tracking-tight">
              Pracownia Malarska Maciej Kostek
            </h2>
            <p className="text-gray-600 font-sans text-base leading-relaxed">
              Malarstwo to moja praca i moja pasja. Swoją pracownię prowadzę w stolicy polskiej tkaniny – Łodzi. To tutaj naciągam płótna na krosna, przygotowuję grunty i mieszam pigmenty, by ożywić przesłane przez Ciebie wspomnienia.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-[#E0115F] shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-base font-sans">
                <span className="block text-gray-400 font-mono text-xs uppercase tracking-widest font-semibold">Skrzynka e-mail</span>
                <a href="mailto:kontakt@hellokostek.pl" className="text-gray-900 hover:text-[#E0115F] font-bold block mt-1 transition-colors text-lg">
                  kontakt@hellokostek.pl
                </a>
                <span className="text-gray-500 block text-sm mt-1">Gwarantowana odpowiedź w przeciągu 24 godzin z pełną wyceną kompozycji.</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-[#E0115F] shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-base font-sans">
                <span className="block text-gray-400 font-mono text-xs uppercase tracking-widest font-semibold">Studio w Sercu Łodzi</span>
                <span className="text-gray-900 font-bold block mt-1 text-lg">Łódź Śródmieście, Polska</span>
                <span className="text-gray-500 block text-sm mt-1">
                  <strong>Odbiór osobisty i dowóz na terenie Łodzi:</strong> Oferuję całkowicie bezpłatne dostarczenie gotowego obrazu do Twojego domu z zachowaniem należytych środków ostrożności.
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-[#E0115F] shrink-0 mt-0.5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-base font-sans">
                <span className="block text-gray-400 font-mono text-xs uppercase tracking-widest font-semibold">Media społecznościowe</span>
                <span className="text-gray-950 block mt-1">
                  Śledź kulisy powstawania moich prac i codzienne chwile przy sztaludze na Instagramie i Facebooku: <strong className="text-gray-900 font-semibold">@hellokostek</strong>.
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 bg-gray-50/50 p-6 rounded-2xl border">
            <h4 className="font-display font-medium text-gray-900 mb-2 text-lg">Sygnowane Certyfikaty Autentyczności</h4>
            <p className="text-sm text-gray-650 leading-relaxed font-sans">
              Każda wysłana praca – niezależnie czy rysunek ołówkiem, akwarela czy portret olejny – otrzymuje ode mnie fizyczny, ręcznie wypisany i lakowany pieczęcią certyfikat autentyczności potwierdzający unikalność dzieła rąk.
            </p>
          </div>
        </div>

        {/* Right Side: Ultra-Clean Minimalist Contact Form (50%) */}
        <div className="lg:col-span-6">
          <form onSubmit={handleSubmit} className="space-y-8 font-sans">
            <h3 className="font-display text-xl sm:text-2xl text-gray-905 mb-6">Wypełnij Formularz Wyjściowy</h3>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Imię i Nazwisko *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="np. Anna Kowalska"
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 outline-none rounded-none text-base text-gray-800 placeholder:text-gray-300 transition-all font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Twój Adres E-mail *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="np. anna.kowalska@gmail.com"
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 outline-none rounded-none text-base text-gray-800 placeholder:text-gray-300 transition-all font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Czego dotyczy Twoja wizja?</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 outline-none rounded-none text-base text-gray-800 transition-all font-sans cursor-pointer"
              >
                <option value="portrait_commission" className="bg-white">Chcę zlecić ręcznie malowany portret ze zdjęcia (od 800 zł)</option>
                <option value="shop_delivery" className="bg-white">Interesuje mnie zakup oryginalnej akwareli lub rysunku</option>
                <option value="other_question" className="bg-white">Zapytanie o dostępność prac / własny format / inne</option>
              </select>
            </div>

            {/* Custom parameters fields appearing with high-padding for custom portraits option */}
            {formData.subject === "portrait_commission" && (
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-150 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-scaleIn">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">Kształt podobrazia</span>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-gray-800 text-sm">
                      <input
                        type="radio"
                        name="shape"
                        value="rectangle"
                        checked={formData.shape === "rectangle"}
                        onChange={handleInputChange}
                        className="text-gray-900 focus:ring-gray-900"
                      />
                      <span>Prostokątne 30x40 cm</span>
                    </label>
                    <label className="flex-1 flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-gray-800 text-sm">
                      <input
                        type="radio"
                        name="shape"
                        value="oval"
                        checked={formData.shape === "oval"}
                        onChange={handleInputChange}
                        className="text-gray-900 focus:ring-gray-900"
                      />
                      <span>Owalne 30x40 cm</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">Wybierz Wstępny Rozmiar</span>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
                  >
                    <option value="30x40">Standardowy (30 x 40 cm)</option>
                    <option value="40x55">Średni (40 x 55 cm)</option>
                    <option value="50x70">Wielki (50 x 70 cm)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Opisz swoją wizję lub przeznaczenie obrazu *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Napisz dla kogo powstaje obraz, czy to pamiątka rodzinna, prezent na rocznicę i czy masz już wybrane ujęcia zdjęciowe..."
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 outline-none rounded-none text-base text-gray-800 placeholder:text-gray-300 transition-all font-sans resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">Dołącz poglądowe zdjęcia (JPG, PNG)</span>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-all bg-gray-50/20"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                {files.length > 0 ? (
                  <p className="font-sans text-sm text-[#E0115F] font-semibold">
                    Wybrano {files.length} plików: {files.map(f => f.name).join(", ")}
                  </p>
                ) : (
                  <p className="font-sans text-sm text-gray-500">
                    Kliknij, by załączyć klatki zdjęciowe (Zdjęcia możesz również dosłać bezpośrednio w mailu)
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="button button--full"
              >
                <div className="button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="button__text">
                  <Send className="w-4 h-4" />
                  Dalej: otwórz e-mail
                </div>
              </button>
              {isSent && (
                <div className="mt-4 p-4 bg-green-50 text-green-800 font-semibold rounded-xl text-sm text-center flex items-center justify-center gap-2 border border-green-150 animate-fadeIn">
                  <Check className="w-4 h-4 text-green-600" />
                  Pomyślnie wygenerowano szablon. Prześlij wiadomość w oknie swojego klienta e-mail!
                </div>
              )}
              <p className="text-xs text-gray-550 font-sans text-center mt-4 leading-relaxed">
                * Po kliknięciu wygenerujemy ustrukturyzowany szablon zapytania i uruchomimy Twoją domyślną pocztę, dzięki czemu bezpiecznie załączysz pliki i prześlesz je do <strong>kontakt@hellokostek.pl</strong>.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Structured Local FAQ / Help Section */}
      <section className="space-y-12 border-t border-gray-100 pt-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <HelpCircle className="w-8 h-8 text-[#E0115F] mx-auto" />
          <h2 className="font-display text-2xl sm:text-3xl text-gray-900">Często Zadawane Pytania</h2>
          <p className="font-sans text-gray-600 text-sm sm:text-base">
            Poznaj odpowiedzi na najpopularniejsze zapytania zebrane od klientów zamawiających tradycyjne obrazy olejne.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-8 rounded-2xl relative space-y-3 shadow-xs">
              <h4 className="font-sans font-semibold text-gray-900 text-base">{faq.q}</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
