import { Palette, Landmark, ShieldCheck, Heart, Camera, Brush } from "lucide-react";
import maciejImg from "../../assets/maciej.jpg";

export default function AboutMe() {
  return (
    <div className="animate-fadeIn py-16 px-6 max-w-[1600px] mx-auto space-y-24">
      {/* Editorial Magazine Hero Header */}
      <header className="border-b border-gray-100 pb-12 max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block mb-4">
          Esencja Malarstwa Olejnego • Łódź
        </span>
        <h1 className="font-display text-7xl text-gray-900 tracking-tight leading-[1.05] font-normal mb-8">
          Kostek Maciej Kosteczka <span className="font-sans italic font-light text-gray-400">artysta malarz Łódź</span>
        </h1>
        <p className="font-display italic text-gray-600 text-lg sm:text-xl pl-6 border-l-4 border-gray-900 max-w-2xl leading-relaxed">
          „Prawdziwy portret nie powstaje na ekranie komputera. Tworzy się go z wolna, warstwa po warstwie, szanując czas, fizyczny opór płótna oraz tradycyjny zapach terpentyny.”
        </p>
      </header>

      {/* Asymmetric Section 1: Biography vs Workspace Photography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Storytelling Text (Asymmetric span) */}
        <div className="lg:col-span-7 space-y-8 font-sans text-base text-gray-750 leading-relaxed">
          <p className="text-lg font-medium text-gray-950 leading-relaxed">
            Malarstwo to proces intymny i niepospieszny. Prace sygnowane marką <strong>hellokostek</strong> powstają z chęci zachowania tradycyjnego, czystego rzemiosła artystycznego. Jako niezależny malarz tworzę w zaciszu łódzkiej Pracowni Artystycznej portrety olejne, rysunki oraz akwarele, które stają się świadkami najważniejszych życiowych emocji moich klientów.
          </p>
          
          <p>
            Miejscem moich codziennych poszukiwań twórczych jest Łódź – miasto o surowej, postindustrialnej architekturze, niesamowitym filmowym dziedzictwie i nastrojowej, nieco melancholijnej aurze. Ta unikalna tożsamość przestrzeni bezpośrednio wpływa na moją paletę barw: od głębokich umbr i ugorów, po mocne, nasycone akcenty świetlne wyłaniające się z mroku.
          </p>

          <p>
            Specjalizuję się w malowaniu portretów ze zdjęcia na zamówienie. Każde dzieło to osobna opowieść. Kiedy powierzasz mi wizerunek męża, dziecka, rodziców lub ukochanego pupila, nie oddajesz go w ręce algorytmów czy bezdusznych maszyn drukarskich. Uzyskujesz bezpośredni, stały kontakt z autorem obrazu. Rozmawiamy o charakterze portretowanej osoby, o jej wzroku, uśmiechu czy ułożeniu dłoni, by praca emanowała prawdą, a nie tylko suchym podobieństwem.
          </p>

          <p>
            Mój warsztat wywodzi się z klasycznych tradycji akademickich. Korzystam wyłącznie z najwyższej klasy materiałów: naturalnych lnianych lub bawełnianych płócien naciąganych na krosna sosnowe, pędzli z włosia naturalnego oraz wyselekcjonowanych pigmentów olejnych uznanych europejskich marek. Wszystko po to, by obraz zachwycał intensywnością i fakturą przez pokolenia.
          </p>
        </div>

        {/* Right Column: Dynamic Workspace Image Framing (Asymmetric span) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-gray-100 p-4 bg-gray-50/50 rounded-3xl">
            <div className="zoom-container aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
              <img
                src={maciejImg}
                alt="Kostek Maciej Kosteczka, Pracownia Artystyczna Łódź"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl transition-all duration-700"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-gray-500 px-1">
              <span>PRZSTRZEŃ TWÓRCZA</span>
              <span>ŁÓDŹ ŚRÓDMIEŚCIE</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
            <h4 className="font-display text-lg text-gray-900 font-semibold">Dlaczego malarstwo tradycyjne?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dzisiejszy świat jest przepełniony cyfrowym szumem i natychmiastowym zaspokajaniem potrzeb. Ręcznie malowany obraz olejny to luksus posiadania czegoś trwałego i niepowtarzalnego. Gra światła na fakturowej powierzchni farby zmienia się w zależności od pory dnia, tworząc spektakl, którego nie da się skopiować na żadnym wyświetlaczu.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
            <h4 className="font-display text-lg text-gray-900 font-semibold">Certyfikaty autentyczności</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Każdy obraz – czy to rysunek, akwarela, czy portret olejny – otrzymuje ode mnie ręcznie wypisany i opieczętowany certyfikat, potwierdzający jego unikalność.
            </p>
          </div>
        </div>
      </section>

      {/* Symmetrical Core Values & Workflow Focus */}
      <section className="bg-gray-50 rounded-[32px] p-8 sm:p-12 border border-blue-50/10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3 font-sans">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-900 border border-gray-100">
            <Brush className="w-5 h-5 text-[#E0115F]" />
          </div>
          <h3 className="font-display text-lg font-semibold text-gray-900 uppercase tracking-tight">Tradycyjna Technologia</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nie chodzę na skróty. Stosuję klasyczną metodę laserunku oraz impastu, malując warstwowo na solidnych gruntowanych podobraziach sosnowych.
          </p>
        </div>

        <div className="space-y-3 font-sans">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-900 border border-gray-100">
            <Palette className="w-5 h-5 text-[#E0115F]" />
          </div>
          <h3 className="font-display text-lg font-semibold text-gray-900 uppercase tracking-tight">Osobisty Dialog</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Wspólnie z klientem opracowuję układ kompozycji drogą cyfrową. Ty zatwierdzasz szkic i gamę barwną przed fizycznym przyłożeniem pędzla do płótna.
          </p>
        </div>

        <div className="space-y-3 font-sans">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-900 border border-gray-100">
            <ShieldCheck className="w-5 h-5 text-[#E0115F]" />
          </div>
          <h3 className="font-display text-lg font-semibold text-gray-900 uppercase tracking-tight">Bezpieczeństwo i Trwałość</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Ukończony obraz pokrywam satynowym werniksem chroniącym przed promieniami UV i kurzem. Paczki pakuję osobiście w pancerną konstrukcję z tektury i pianki.
          </p>
        </div>
      </section>

      {/* Editorial Magazine Photo Gallery (Two columns, asymmetric aspect ratios) */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block mb-2">Workspace & Tools</span>
          <h2 className="font-display text-4.5xl text-gray-900">Moja Pracownia Artystyczna: Gdzie schną sekrety</h2>
          <p className="text-gray-600 text-base leading-relaxed mt-2">
            Zajrzyj za kulisy powstawania obrazów. Każda akwarela, każdy rysunek ołówkiem i portret powstaje w unikalnym klimacie skupienia i przy nastrojowej muzyce sferycznej.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden border border-gray-100">
              <img
                src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-9-2022-scaled.jpg"
                alt="Detale farb i pędzli w Pracowni Artystycznej w Łodzi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <p className="text-xs font-mono text-gray-500 tracking-wider">AKTUALNE NARZĘDZIA PRACY: OLEJE, SYPANE PIGMENTY I ROZPUSZCZALNIKI</p>
          </div>

          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden border border-gray-100">
              <img
                src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-13-2022-scaled.jpg"
                alt="Proces rysowania i fakturowania portretów ze zdjęcia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <p className="text-xs font-mono text-gray-500 tracking-wider">DETAL I TEKSTURA PAPIERU – SYGNOWANE KOLEKCJE</p>
          </div>
        </div>
      </section>

      {/* Verified Client Quotes with premium layout */}
      <section className="space-y-8 border-t border-gray-100 pt-16 max-w-4xl mx-auto text-center">
        <h3 className="font-display text-3xl text-gray-900">Uczucia uwiecznione w opiniach</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mt-10">
          <div className="p-8 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-4">
            <p className="font-sans italic text-base text-gray-700 leading-relaxed">
              „Zamówiłam owalny portret rodziców na czterdziestolecie ich ślubu. Rodzice płakali ze wzruszenia. Faktura farby olejnej, blask wosku i głębia cieni sprawiają, że obraz żyje na ścianie. Pan Maciej to cudowny artysta o niezwykłej empatii!”
            </p>
            <cite className="font-mono text-xs uppercase tracking-wider text-gray-500 not-italic block">— Maria (46l.), Poznań</cite>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-4">
            <p className="font-sans italic text-base text-gray-700 leading-relaxed">
              „Portret mojego ukochanego pieska wyszedł niesamowicie wiernie. Pan Kostek uchwycił ten mądry, spokojny wyraz oczu, za którym tak tęskniłam. Cały proces akceptacji projektu i poprawek był profesjonalny i pełen taktu.”
            </p>
            <cite className="font-mono text-xs uppercase tracking-wider text-gray-500 not-italic block">— Elżbieta (52l.), Łódź</cite>
          </div>
        </div>
      </section>
    </div>
  );
}
