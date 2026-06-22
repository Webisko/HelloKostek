import { useState } from "react";
import { Product, CartItem } from "../types";
import { SHOP_PRODUCTS } from "../data";
import { Search, Info, Paintbrush, FileText, ShoppingCart, SlidersHorizontal, Check } from "lucide-react";

interface ShopProps {
  addToCart: (product: Product, buyType: "original" | "print") => void;
  cart: CartItem[];
}

export default function Shop({ addToCart, cart }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "watercolor" | "drawing" | "prints">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Track success animation state per product key
  const [successIndicator, setSuccessIndicator] = useState<Record<string, boolean>>({});

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

  const handleAddToCartWithAnimation = (product: Product, type: "original" | "print") => {
    addToCart(product, type);
    const key = `${product.id}-${type}`;
    setSuccessIndicator((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setSuccessIndicator((prev) => ({ ...prev, [key]: false }));
    }, 1500);
  };

  return (
    <div className="animate-fadeIn py-12 px-6 max-w-7xl mx-auto space-y-12">
      {/* Header with quick navigation */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-xs text-stone-500 uppercase tracking-widest block font-bold">Unikalna galeria gotowa do wysyłki</span>
        <h1 className="font-display text-3xl sm:text-4.5xl text-off-black">Galeria Oryginalnych Prac i Wydruków</h1>
        <p className="font-sans text-sm sm:text-base text-off-black/70">
          Udekoruj swoje sypialnie i salony autentyczną sztuką z pracowni HelloKostek. Wybierz oryginalne dzieło malowane ręcznie lub zamów certyfikowany wydruk kolekcjonerski.
        </p>
      </section>

      {/* Filters and Search Bar Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-off-black/5 pb-6">
        {/* Minimalist filter buttons (Sainer.org style) */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: "all", label: "Wszystkie prace" },
            { id: "watercolor", label: "Akwarele (300 zł)" },
            { id: "drawing", label: "Rysunki (200 zł)" },
            { id: "prints", label: "Wydruki artystyczne (20-30 zł)" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-sans tracking-wide transition-all uppercase ${
                activeCategory === cat.id
                  ? "bg-off-black text-white"
                  : "bg-stone-100 hover:bg-lime-accent text-off-black/80 hover:text-off-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj pracy..."
            className="w-full py-2.5 pl-10 pr-4 bg-stone-100 border border-transparent rounded-xl text-xs font-sans text-off-black focus:bg-white focus:border-off-black transition-all outline-none"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
        </div>
      </div>

      {/* Main Art Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-stone-100/50 rounded-2xl border border-dashed text-stone-500 font-sans">
          Brak prac ucieleśniających wybrane kryteria wyszukiwania. Spróbuj zmienić parametry.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const hasOriginal = product.isOriginalAvailable;
            const originalInCart = cart.some(item => item.productId === product.id && item.purchaseType === "original");

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white border border-off-black/5 rounded-2xl p-4 hover:shadow-lg transition-all"
              >
                {/* Image Block: Paulina Kwietniewska Inspired Zoom on Hover */}
                <div className="relative zoom-container aspect-square bg-stone-50 rounded-xl border border-stone-200">
                  <div className="zoom-wrapper w-full h-full cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Category Pill Tag */}
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-mono font-bold tracking-wider rounded-md uppercase text-white ${
                    product.category === "watercolor" ? "bg-fuchsia-600" : "bg-neutral-800"
                  }`}>
                    {product.category === "watercolor" ? "Akwarela" : "Ołówek"}
                  </span>

                  {/* Year Tag */}
                  <span className="absolute bottom-3 right-3 bg-off-white/90 backdrop-blur-sm text-xs font-mono px-2 py-1 rounded font-semibold text-off-black">
                    {product.year}
                  </span>
                </div>

                {/* Info Text */}
                <div className="mt-4 flex-grow space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-display text-base font-medium text-off-black hover:text-magenta-accent cursor-pointer transition-colors"
                    >
                      {product.title}
                    </h3>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-1 text-stone-400 hover:text-off-black transition-colors"
                      title="Szczegóły pracy"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Purchase Options Grid */}
                <div className="mt-6 border-t border-off-black/5 pt-4 space-y-3">
                  {/* Original Artwork Option font fixes */}
                  {product.category !== "custom_portrait" && (
                    <div className="flex items-center justify-between text-xs font-sans">
                      <div>
                        <span className="font-semibold block text-off-black">Oryginał ({product.category === "drawing" ? "ołówek" : "papier bawełniany"})</span>
                        <span className="text-xs text-stone-500 block">Dostępna tylko 1 sztuka</span>
                      </div>
                      
                      {hasOriginal ? (
                        <button
                          onClick={() => handleAddToCartWithAnimation(product, "original")}
                          disabled={originalInCart}
                          className={`px-3 py-2 rounded-lg font-bold font-mono text-xs flex items-center gap-1 transition-all ${
                            originalInCart
                              ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                              : successIndicator[`${product.id}-original`]
                              ? "bg-lime-accent text-off-black"
                              : "bg-off-black text-white hover:bg-magenta-accent"
                          }`}
                        >
                          {successIndicator[`${product.id}-original`] ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : originalInCart ? (
                            "W koszyku"
                          ) : (
                            <>
                              <ShoppingCart className="w-3" />
                              {product.originalPrice} zł
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-stone-400 text-xs font-medium border border-transparent px-3 py-2">Wyprzedany</span>
                      )}
                    </div>
                  )}

                  {/* Art Print Option */}
                  {product.printPrice && (
                    <div className="flex items-center justify-between text-xs font-sans border-t border-dashed border-stone-150 pt-3">
                      <div>
                        <span className="font-semibold block text-off-black">Wydruk kolekcjonerski</span>
                        <span className="text-xs text-stone-500 block">Sygnowana reprodukcja fakturowa</span>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCartWithAnimation(product, "print")}
                        className={`px-3 py-2 rounded-lg font-bold font-mono text-xs flex items-center gap-1 transition-all ${
                          successIndicator[`${product.id}-print`]
                            ? "bg-lime-accent text-off-black"
                            : "bg-stone-100 text-off-black hover:bg-magenta-accent hover:text-white"
                        }`}
                      >
                        {successIndicator[`${product.id}-print`] ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <>
                            <ShoppingCart className="w-3" />
                            {product.printPrice} zł
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Paulina Kwietniewska Inspired Detail Lightbox Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-off-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column Image */}
            <div className="relative bg-stone-50 min-h-[300px] md:min-h-[450px]">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-off-black text-white text-xs font-mono px-3 py-1.5 rounded-full uppercase">
                {selectedProduct.category === "watercolor" ? "Akwarela Oryginalna" : "Rysunek Ołówkiem"}
              </span>
            </div>

            {/* Right Column details */}
            <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline gap-2">
                  <h2 className="font-display text-2xl sm:text-3.5xl text-off-black font-semibold leading-tight">{selectedProduct.title}</h2>
                  <span className="font-mono text-stone-500 font-semibold">{selectedProduct.year} r.</span>
                </div>
                
                <p className="font-sans text-stone-600 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="bg-stone-50 p-4 rounded-xl space-y-2 border text-xs">
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Technika:</span>
                    <strong className="text-off-black font-sans">
                      {selectedProduct.category === "watercolor" ? "Akwarela na papierze Canson" : "Szkic grafitem na papierze fakturowym"}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Format oryginału:</span>
                    <strong className="text-off-black font-mono">Ok. 30 x 40 cm</strong>
                  </div>
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Wysyłka:</span>
                    <strong className="text-off-black font-sans text-green-700">Wysyłka krajowa w 24 godziny gratis</strong>
                  </div>
                </div>
              </div>

              {/* Purchase triggers in detail modal */}
              <div className="space-y-3 pt-4 border-t border-stone-100">
                {selectedProduct.isOriginalAvailable && (
                  <button
                    onClick={() => {
                      handleAddToCartWithAnimation(selectedProduct, "original");
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3.5 bg-off-black text-white hover:bg-magenta-accent transition-all duration-300 font-semibold text-sm rounded-xl flex items-center justify-center gap-2"
                  >
                    Kup oryginalną pracę za {selectedProduct.originalPrice} zł
                  </button>
                )}
                {selectedProduct.printPrice && (
                  <button
                    onClick={() => {
                      handleAddToCartWithAnimation(selectedProduct, "print");
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3 bg-stone-100 text-off-black hover:bg-lime-accent transition-all duration-300 font-semibold text-sm rounded-xl flex items-center justify-center gap-2"
                  >
                    Zamów wysokiej jakości wydruk za {selectedProduct.printPrice} zł
                  </button>
                )}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-2 text-stone-400 hover:text-off-black text-xs font-sans text-center mt-2 font-medium"
                >
                  Zamknij okno szczegółów
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
