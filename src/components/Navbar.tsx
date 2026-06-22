import { PageId, CartItem } from "../types";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cart,
  setIsCartOpen,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleJakZamowic = () => {
    setIsMobileMenuOpen(false);
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        const element = document.getElementById("jak-zamowic-sekcja");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById("jak-zamowic-sekcja");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 px-6 py-4 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side Navigation (Desktop) - Symmetrical side A */}
        <div className="hidden md:flex items-center space-x-12 w-1/3">
          <button
            onClick={() => {
              setCurrentPage("portraits");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`font-sans text-[13px] uppercase tracking-widest transition-all duration-300 hover:text-magenta-accent relative py-1 group ${
              currentPage === "portraits" ? "text-off-black font-semibold text-magenta-accent" : "text-off-black/60"
            }`}
          >
            Oferta portretów
            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-magenta-accent transition-transform duration-300 origin-left ${
              currentPage === "portraits" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} />
          </button>
          
          <button
            onClick={() => {
              setCurrentPage("shop");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`font-sans text-[13px] uppercase tracking-widest transition-all duration-300 hover:text-magenta-accent relative py-1 group ${
              currentPage === "shop" ? "text-off-black font-semibold text-magenta-accent" : "text-off-black/60"
            }`}
          >
            Oryginalne prace (Sklep)
            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-magenta-accent transition-transform duration-300 origin-left ${
              currentPage === "shop" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} />
          </button>
        </div>

        {/* Centered Logo (Daniel Arthury inspired) */}
        <div className="flex justify-center items-center w-1/3 text-center">
          <button
            onClick={() => {
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Strona główna HelloKostek"
          >
            <div className="w-28 h-12 md:w-36 md:h-16 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 p-1">
              <img
                src="https://hellokostek.pl/wp-content/uploads/2021/05/logo-animation-30fps-v-2.gif"
                alt="HelloKostek Logo"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
          </button>
        </div>

        {/* Right Side Navigation (Desktop) - Symmetrical side B */}
        <div className="hidden md:flex items-center justify-end space-x-12 w-1/3">
          <button
            onClick={handleJakZamowic}
            className="font-sans text-[13px] uppercase tracking-widest transition-all duration-300 hover:text-magenta-accent relative py-1 group text-off-black/60"
          >
            Jak zamówić
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-magenta-accent transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
          </button>
          
          <button
            onClick={() => {
              setCurrentPage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`font-sans text-[13px] uppercase tracking-widest transition-all duration-300 hover:text-magenta-accent relative py-1 group ${
              currentPage === "contact" ? "text-off-black font-semibold text-magenta-accent" : "text-off-black/60"
            }`}
          >
            Kontakt
            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-magenta-accent transition-transform duration-300 origin-left ${
              currentPage === "contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-off-black bg-stone-100 hover:bg-stone-200 transition-colors rounded-full"
            aria-label="Główne Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-neutral-100 flex flex-col space-y-4 pb-4 animate-fadeIn">
          <button
            onClick={() => {
              setCurrentPage("portraits");
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`text-left text-xs uppercase tracking-widest font-sans py-2 border-l-2 pl-3 transition-colors ${
              currentPage === "portraits" ? "border-magenta-accent text-magenta-accent font-semibold" : "border-transparent text-off-black/60"
            }`}
          >
            Oferta portretów
          </button>
          
          <button
            onClick={() => {
              setCurrentPage("shop");
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`text-left text-xs uppercase tracking-widest font-sans py-2 border-l-2 pl-3 transition-colors ${
              currentPage === "shop" ? "border-magenta-accent text-magenta-accent font-semibold" : "border-transparent text-off-black/60"
            }`}
          >
            Oryginalne prace (Sklep)
          </button>

          <button
            onClick={handleJakZamowic}
            className="text-left text-xs uppercase tracking-widest font-sans py-2 border-l-2 pl-3 border-transparent text-off-black/60"
          >
            Jak zamówić
          </button>

          <button
            onClick={() => {
              setCurrentPage("contact");
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`text-left text-xs uppercase tracking-widest font-sans py-2 border-l-2 pl-3 transition-colors ${
              currentPage === "contact" ? "border-magenta-accent text-magenta-accent font-semibold" : "border-transparent text-off-black/60"
            }`}
          >
            Kontakt
          </button>

          <button
            onClick={() => {
              setCurrentPage("home");
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-left text-xs uppercase tracking-widest font-sans py-2 border-l-2 pl-3 border-transparent text-off-black/40"
          >
            Strona główna
          </button>
        </div>
      )}
    </nav>
  );
}
