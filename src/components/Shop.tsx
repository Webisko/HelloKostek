import { useState } from "react";
import { Product, CartItem } from "../types";
import { SHOP_PRODUCTS } from "../data";
import { Search, SlidersHorizontal, ArrowRight, CornerDownRight } from "lucide-react";

interface ShopProps {
  addToCart: (product: Product, buyType: "original" | "print") => void;
  cart: CartItem[];
  onSelectProduct: (product: Product) => void;
}

export default function Shop({ addToCart, cart, onSelectProduct }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "watercolor" | "drawing" | "prints">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = SHOP_PRODUCTS.filter((product) => {
    // Category filter logic
    if (activeCategory === "watercolor" && product.category !== "watercolor") return false;
    if (activeCategory === "drawing" && product.category !== "drawing") return false;
    if (activeCategory === "prints" && !product.printPrice) return false;

    // Search query logic
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.year.includes(query)
      );
    }
    return true;
  });

  return (
    <div className="animate-fadeIn py-16 px-6 max-w-[1600px] mx-auto space-y-16 font-sans">
      {/* Page Title & SEO Introductory block */}
      <header className="border-b border-gray-100 pb-12 max-w-4xl space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block">
          Curated Art Archive • Sprzedaż Oryginałów i Wydruków
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-gray-900 tracking-tight font-normal">
          Dzieła Kameralne
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Zbiór autentycznych akwareli oraz rysunków ołówkiem z mojej pracowni w Łodzi. Każda kompozycja powstała ręcznie z zachowaniem najsurowszych reguł klasycznego warsztatu. Wybierz oryginalne dzieło lub certyfikowany wydruk kolekcjonerski sygnujący limitowaną edycję.
        </p>
      </header>

      {/* Modern Filter Rail & Search Interface (Sainer.org Editorial Style) */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-gray-150 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: "all", label: "Wszystkie Archiwa" },
            { id: "watercolor", label: "Oryginalne Akwarele (300 zł)" },
            { id: "drawing", label: "Rysunki Ołówkiem (200 zł)" },
            { id: "prints", label: "Wydruki Kolekcjonerskie (20-30 zł)" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all uppercase ${
                activeCategory === cat.id
                  ? "bg-gray-950 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200 hover:bg-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj według nazwy lub roku..."
            className="w-full py-3 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all outline-none"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Asymmetric Elegant Art Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500 text-sm">
          Brak prac odzwierciedlających aktualne filtry wyszukiwania. Spróbuj zresetować parametry wyszukiwania.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-6">
          {filteredProducts.map((product, index) => {
            // Apply subtle asymmetric offsets to give an curated editorial magazine grid
            const marginOffset = index % 3 === 1 ? "lg:translate-y-6" : index % 3 === 2 ? "lg:translate-y-12" : "";

            return (
              <article
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`group flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-500 bg-white border border-gray-50 hover:border-gray-200 p-4 rounded-[28px] ${marginOffset}`}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Category Stamp */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-905 text-xs font-mono font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border border-gray-100 shadow-xs">
                    {product.category === "watercolor" ? "Akwarela" : "Rysunek"}
                  </span>

                  {/* Year Tag */}
                  <span className="absolute bottom-4 right-4 bg-gray-950 text-white text-xs font-mono px-3 py-1.5 rounded-lg font-medium tracking-widest uppercase">
                    {product.year}
                  </span>
                </div>

                {/* Info block */}
                <div className="space-y-2 px-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-display text-lg sm:text-xl text-gray-900 group-hover:text-[#E0115F] transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <span className="font-mono text-sm text-[#E0115F] font-bold shrink-0">
                      od {product.category === "watercolor" ? "30 zł" : "20 zł"}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 pt-2 text-xs font-mono font-bold uppercase tracking-widest text-gray-450 group-hover:text-[#E0115F] transition-colors">
                    Sygnowane szczegóły i zakup 
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Grid margin spacing padding for offset items */}
      <div className="h-16 hidden lg:block" />
    </div>
  );
}
