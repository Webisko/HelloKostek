import React, { useState } from "react";
import { Product, CartItem } from "../types";
import { ChevronLeft, Shield, Sparkles, Check, ArrowRight, CornerDownRight } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  addToCart: (product: Product, buyType: "original" | "print") => void;
  setCurrentPage: (page: "home" | "portraits" | "shop" | "about" | "contact" | "product-detail" | "success") => void;
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
}

export default function ProductDetail({
  product,
  addToCart,
  setCurrentPage,
  cart,
  setIsCartOpen
}: ProductDetailProps) {
  const [selectedType, setSelectedType] = useState<"original" | "print">(
    product.isOriginalAvailable ? "original" : "print"
  );
  const [activeThumbnail, setActiveThumbnail] = useState<"front" | "frame" | "detail">("front");
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Decorative text or zoom indicators
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const currentPrice = selectedType === "original" ? product.originalPrice : (product.printPrice || 20);

  const handleKupTeraz = () => {
    // Standard direct checkout opening drawer securely
    addToCart(product, selectedType);
    setIsCartOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedType);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  // Extra thumbnails to represent different contexts for editorial minimalism
  const thumbnails = {
    front: product.imageUrl,
    frame: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop", // Simulated luxury frame setup
    detail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop" // Close-up watercolor/drawing texture
  };

  const currentThumbnailUrl = thumbnails[activeThumbnail] || product.imageUrl;

  return (
    <div className="animate-fadeIn py-16 px-6 max-w-[1600px] mx-auto space-y-16">
      {/* Back to Gallery Path Link */}
      <button
        onClick={() => setCurrentPage("shop")}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-off-black hover:text-lime-accent active:text-magenta-accent transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Cofnij do galerii prac
      </button>

      {/* Main Container Dual-Column Layout (50/50 split) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Media & Thumbnails Context (7/12 width) */}
        <div className="lg:col-span-7 space-y-6">
          <div 
            className="aspect-[3/4] relative overflow-hidden rounded-[32px] border border-gray-100 bg-gray-50/50 cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={currentThumbnailUrl}
              alt={`${product.title} w ujęciu ${activeThumbnail}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-100 ease-out select-none"
              style={{
                transform: isHovered ? "scale(1.5)" : "scale(1)",
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`
              }}
            />
            
            {/* Visual Guide Overlay */}
            <div className="absolute top-4 right-4 bg-off-black/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-mono tracking-wider z-10 pointer-events-none">
              {isHovered ? "PRZECIĄGNIJ ABY PRZYBLIŻYĆ DETAL" : "HOVER ABY ZOBACZYĆ FAKTURĘ"}
            </div>
            
            {activeThumbnail === "detail" && (
              <span className="absolute bottom-4 left-4 bg-lime-accent/90 text-off-black px-3 py-1.5 rounded-xl text-xs font-semibold font-sans uppercase tracking-wide tracking-wider z-10 pointer-events-none">
                ZBLIŻENIE NA SYGNATURĘ I STRUKTURĘ
              </span>
            )}
          </div>

          {/* Symmetrical Secondary Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setActiveThumbnail("front")}
              className={`aspect-square rounded-2xl overflow-hidden border p-1 transition-all ${
                activeThumbnail === "front" ? "border-[#E0115F] bg-gray-50/50" : "border-gray-150 hover:bg-gray-50"
              }`}
            >
              <img
                src={thumbnails.front}
                alt="Widok z przodu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </button>
            <button
              onClick={() => setActiveThumbnail("frame")}
              className={`aspect-square rounded-2xl overflow-hidden border p-1 transition-all ${
                activeThumbnail === "frame" ? "border-[#E0115F] bg-gray-50/50" : "border-gray-150 hover:bg-gray-50"
              }`}
            >
              <img
                src={thumbnails.frame}
                alt="Kontekst ramy i passe-partout"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </button>
            <button
              onClick={() => setActiveThumbnail("detail")}
              className={`aspect-square rounded-2xl overflow-hidden border p-1 transition-all ${
                activeThumbnail === "detail" ? "border-[#E0115F] bg-gray-50/50" : "border-gray-150 hover:bg-gray-50"
              }`}
            >
              <img
                src={thumbnails.detail}
                alt="Materiały i zbliżenie"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </button>
          </div>
        </div>

        {/* Right Column: Title, Parameters Selector and wide Purchase Controls (5/12 width) */}
        <div className="lg:col-span-5 space-y-8 font-sans">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold block">
              Dostępne w Pracowni Artystycznej • {product.year}
            </span>
            <h1 className="font-display text-4.5xl leading-tight text-gray-950 font-normal">
              {product.title}
            </h1>
            <div className="flex gap-4 items-baseline">
              <span className="text-3xl font-bold font-mono text-[#E0115F]">
                {currentPrice} zł
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                Zawiera bezpłatną dostawę
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-3">
            <p className="text-gray-600 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Minimalist Selection Menu: Original vs. Print */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-500 font-bold block">
              Wybierz Wariant Pracy
            </span>
            <div className="space-y-2">
              {product.isOriginalAvailable ? (
                <label
                  onClick={() => setSelectedType("original")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedType === "original"
                      ? "border-magenta-accent bg-gray-50/40 font-medium"
                      : "border-gray-200 bg-white hover:border-lime-accent hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="wariant"
                      checked={selectedType === "original"}
                      readOnly
                      className="text-gray-900 focus:ring-gray-900 w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold block text-gray-900 text-sm">Oryginał ręcznie malowany</span>
                      <span className="text-xs text-gray-500 block">Autentyczne dzieło, tylko 1 sztuka • {product.originalPrice} zł</span>
                    </div>
                  </div>
                  <span className="bg-[#E0115F] text-white text-[12px] font-mono px-2 py-0.5 rounded uppercase">Dostępny</span>
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-150 bg-gray-50 opacity-65">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100" />
                    <div>
                      <span className="font-semibold block text-gray-600 text-sm">Oryginał ręcznie malowany</span>
                      <span className="text-xs text-gray-400 block">Sprzedany do kolekcji prywatnej</span>
                    </div>
                  </div>
                  <span className="bg-gray-200 text-gray-500 text-[12px] font-mono px-2 py-0.5 rounded uppercase">Wyprzedany</span>
                </div>
              )}

              {product.printPrice && (
                <label
                  onClick={() => setSelectedType("print")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedType === "print"
                      ? "border-magenta-accent bg-gray-50/40 font-medium"
                      : "border-gray-200 bg-white hover:border-lime-accent hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="wariant"
                      checked={selectedType === "print"}
                      readOnly
                      className="text-gray-900 focus:ring-gray-900 w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold block text-gray-900 text-sm">Wydruk kolekcjonerski</span>
                      <span className="text-xs text-gray-500 block">Sygnowana reprodukcja fakturowa na papierze archiwalnym • {product.printPrice} zł</span>
                    </div>
                  </div>
                  <span className="bg-gray-900 text-white text-[12px] font-mono px-2 py-0.5 rounded uppercase">Dostępny</span>
                </label>
              )}
            </div>
          </div>

          {/* Primary Purchase Triggers: Direct Stripe and Cart Insertion */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleKupTeraz}
              className="button button--full"
            >
              <div className="button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="button__text">
                Kup Teraz przez Stripe
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="button button--full"
              >
                <div className="button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="button__text">
                  Dodaj do koszyka
                </div>
              </button>
              <button
                onClick={() => setCurrentPage("contact")}
                className="button button--full"
              >
                <div className="button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="button__text">
                  Skonsultuj zakup
                </div>
              </button>
            </div>

            {addedSuccess && (
              <div className="p-3 bg-green-50 text-green-800 rounded-xl text-xs font-medium border border-green-150 flex items-center justify-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-green-600" />
                Pomyślnie dodano do Twojego koszyka!
              </div>
            )}
          </div>

          {/* Real technical parameters listed as raw prose/text to maintain the minimal aesthetic */}
          <table className="w-full text-xs text-gray-600 border-t border-gray-100 pt-6">
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="py-2.5 font-semibold text-gray-900 w-1/3">Nośnik bazowy</td>
                <td className="py-2.5">
                  {product.category === "watercolor" 
                    ? "Gruby papier bawełniany Arches 300g/m²" 
                    : "Wysokiej jakości papier graficzny Canson 220g/m²"}
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2.5 font-semibold text-gray-900">Format fizyczny</td>
                <td className="py-2.5">Standardowy 30x40 cm (możliwość zamówienia passe-partout)</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2.5 font-semibold text-gray-900">Sygnatura</td>
                <td className="py-2.5">Ręczny podpis autora ołówkiem u dołu pracy oraz pieczęć sucha lakowa</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-gray-900">Czas wysyłki</td>
                <td className="py-2.5">Darmowa ubezpieczona paczka w przeciągu 2 dni roboczych (Polska)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Narrative Deep Background Story for Emotional Engagement (SEO keywords heavy) */}
      <section className="border-t border-gray-100 pt-16 max-w-4xl space-y-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block">
          Tło artystyczne & Opis historii
        </span>
        <h2 className="font-display text-3xl text-gray-900 tracking-tight">
          Opowieść za pociągnięciem pędzla: „{product.title}”
        </h2>
        <div className="font-sans text-base text-gray-700 space-y-4 leading-relaxed">
          <p>
            Każda kreska i plama barwna na tej karcie papieru bawełnianego niesie za sobą długie godziny uważnego milczenia w Pracowni Artystycznej hellokostek. Praca powiązana jest z moim szerszym cyklem artystycznym eksplorującym wewnętrzną geometrię człowieka, wyobcowanie oraz spokojną, codzienną kontemplację własnych stanów psychicznych.
          </p>
          <p>
            Wybierając oryginalną wersję tej kompozycji, stajesz się jedynym właścicielem materialnego śladu nastroju artysty utrwalonego przy świetle wschodzącego słońca nad Łodzią. Z kolei zamawiając certyfikowaną reprodukcję, zyskujesz rygorystycznie odwzorowane przejścia tonalne i chropowatość fakturową papieru, która niemal do złudzenia imituje oryginalne dzieło.
          </p>
          <p>
            Dołączony certyfikat autentyczności będzie dowodem wsparcia niezależnego rzemiosła artystycznego. Praca ta najlepiej komponuje się w ramie dębowej z szerokim białym passe-partout, chroniącym papier i nadającym całości głębokiego, muzealnego charakteru.
          </p>
        </div>
      </section>
    </div>
  );
}
