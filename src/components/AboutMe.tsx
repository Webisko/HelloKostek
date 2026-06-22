import { Palette, Landmark, ShieldCheck, Heart } from "lucide-react";

export default function AboutMe() {
  return (
    <div className="animate-fadeIn py-12 px-6 max-w-7xl mx-auto space-y-16">
      {/* Bio Columns */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column - Elegant Avatar with rounded corners */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-lime-accent rounded-3xl blur-xl opacity-30 -z-10 transform translate-x-3 translate-y-3" />
          <div className="border border-off-black/10 p-3 bg-white rounded-3xl shadow-md">
            <div className="zoom-container aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-2-2022-edited-768x768.jpg"
                alt="Kostek - Artysta malarz HelloKostek.pl"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Right column - Story and narrative */}
        <div className="lg:col-span-7 space-y-8 font-sans">
          <div className="space-y-3">
            <span className="font-mono text-xs text-stone-500 uppercase tracking-widest block font-bold">Poznaj moją historię</span>
            <h1 className="font-display text-4xl sm:text-5xl text-off-black tracking-tight leading-tight">
              Nazywam się Kostek. <br />
              <span className="italic font-normal text-magenta-accent">Przelewam emocje na płótno.</span>
            </h1>
          </div>

          <div className="text-stone-700 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Malarstwo towarzyszy mi odkąd pamiętam. Moja pracownia <strong>HelloKostek</strong> powstała z miłości do tradycyjnego, powolnego rzemiosła, które nie poddaje się dyktatowi cyfrowego pośpiechu. Wierzę, że najcenniejsze dary to te, w które ktoś włożył kawałek swojej duszy, czas i fizyczną energię rąk.
            </p>
            <p>
              Specjalizuję się w tradycyjnym malarstwie portretowym farbami olejnymi ze zdjęcia oraz ekspresyjnych pracach na papierze – akwarelach i rysunkach ołówkiem. Moje podejście łączy precyzję rzemiosła z subtelną melancholią i szacunkiem do portretowanej osoby.
            </p>
            <p>
              Każde zlecenie traktuję w sposób wysoce indywidualny. Rozmawiając ze mną, nie rozmawiasz z masową drukarnią – rozmawiasz bezpośrednio z twórcą. Słucham Twoich sugestii na temat charakteru portretowanej osoby, bo wiem, jak ważne są detale takie jak spojrzenie, kącik ust czy drobne cienie na policzku.
            </p>
          </div>

          {/* Core values block */}
          <div className="grid grid-cols-2 gap-4 border-t border-off-black/10 pt-6">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-lime-accent/30 text-magenta-accent flex items-center justify-center shrink-0 mt-1">
                <Heart className="w-3 h-3" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-off-black uppercase font-sans">Czyste Rzemiosło</strong>
                <p className="text-xs text-stone-500 mt-0.5 leading-normal">Prawdziwe farby olejne, pędzle z naturalnego włosia, krosna sosnowe.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-lime-accent/30 text-magenta-accent flex items-center justify-center shrink-0 mt-1">
                <Palette className="w-3 h-3" />
              </div>
              <div>
                <strong className="text-xs font-semibold text-off-black uppercase font-sans">Unikalny Styl</strong>
                <p className="text-xs text-stone-500 mt-0.5 leading-normal">Minimalistyczne tła, gra głębokich kontrastów oraz nastrojowa aura.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative block - Lodz origin and studio workflow */}
      <section className="bg-stone-100/50 rounded-3xl p-8 sm:p-12 border border-off-black/5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/85 px-3 py-1.5 rounded-full border text-xs font-mono font-bold text-stone-600">
            <Landmark className="w-3.5 h-3.5 text-magenta-accent" />
            <span>Studio w Sercu Łodzi</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3.5xl text-off-black leading-tight">Łódzka Wrażliwość i Krajowa Bezpieczna Wysyłka</h2>
          <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed">
            Moje studio mieści się w Łodzi – mieście o niesamowitej tradycji filmowej i włókienniczej, która codziennie inspiruje moją kreskę. Na terenie Łodzi wyjątkowo chętnie dostarczam ukończone obrazy osobiście.
          </p>
          <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed">
            Dla klientów z całej Polski (i spoza jej granic) oferuję bezpłatną, pancernie zabezpieczoną przesyłkę kurierską. Każde płótno owijam w bezkwasowy papier i potrójną warstwę amortyzującą, gwarantując, że dzieło dotrze do Ciebie w nienaruszonym stanie.
          </p>
        </div>

        {/* Artistic details illustration / photo grids */}
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-2xl bg-stone-200 overflow-hidden shadow-xs relative border border-stone-300">
            <img
              src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-9-2022-scaled.jpg"
              alt="Akwarele detale"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-2xl bg-stone-200 overflow-hidden shadow-xs relative border border-stone-300">
            <img
              src="https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-13-2022-scaled.jpg"
              alt="Artystyczne rysunki ołówkiem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Satisfied Clients Quote blocks */}
      <section className="space-y-6 max-w-4xl mx-auto border-t border-off-black/10 pt-16">
        <h3 className="font-display text-2xl text-center text-off-black mb-8">Opinie moim pędzlem urzeczonych</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <blockquote className="bg-white p-6 rounded-2xl border border-off-black/5 relative space-y-4">
            <p className="font-sans italic text-xs sm:text-sm text-stone-600 leading-relaxed">
              „Zamówiłam owalny portret moich rodziców na ich 40. rocznicę ślubu. Rodzice byli wzruszeni do łez. Farba olejna ma tak cudowną fakturę i głębię, że patrzenie na obraz to codzienna radość. Kostek cudownie doradził nam z tłem!”
            </p>
            <cite className="font-sans text-xs font-semibold text-off-black not-italic block">— Maria (46l.), Poznań</cite>
          </blockquote>

          <blockquote className="bg-white p-6 rounded-2xl border border-off-black/5 relative space-y-4 font-sans">
            <p className="italic text-xs sm:text-sm text-stone-600 leading-relaxed">
              „Mój ukochany piesek odszedł kilka miesięcy temu. Pan Kostek namalował go z niesamowitą empatią i uchwycił to mądre spojrzenie, za którym tak tęskniłam. Proces poprawek cyfrowych dał mi ogromny spokój wewnętrzny.”
            </p>
            <cite className="text-xs font-semibold text-off-black not-italic block">— Elżbieta (52l.), Łódź</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
