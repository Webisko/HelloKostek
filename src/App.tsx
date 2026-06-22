import { useState, useEffect } from "react";
import { PageId, CartItem, Product } from "./types";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PortraitsOffer from "./components/PortraitsOffer";
import Shop from "./components/Shop";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import { Heart, Mail, Info, ArrowRight, ShieldCheck, Sparkles, X, ShoppingBag } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCookies, setShowCookies] = useState(true);

  // Load cart from localStorage upon component mounting
  useEffect(() => {
    const savedCart = localStorage.getItem("hellokostek_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart state", e);
      }
    }
    
    // Check if cookies accepted in previous session
    const cookiesAccepted = localStorage.getItem("hellokostek_cookies");
    if (cookiesAccepted === "true") {
      setShowCookies(false);
    }
  }, []);

  // Save cart to localStorage
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("hellokostek_cart", JSON.stringify(newCart));
  };

  const addToCart = (product: Product, buyType: "original" | "print") => {
    const cartId = `${product.id}-${buyType}`;
    const price = buyType === "original" ? product.originalPrice : (product.printPrice || 0);
    
    const existing = cart.find((item) => item.cartId === cartId);
    if (existing) {
      // If it's an original, don't allow duplicate quantity since there is only 1 original work
      if (buyType === "original") return;
      
      const updated = cart.map((item) =>
        item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCartToStorage(updated);
    } else {
      const newItem: CartItem = {
        cartId,
        productId: product.id,
        title: product.title,
        category: product.category,
        purchaseType: buyType,
        price,
        quantity: 1,
      };
      saveCartToStorage([...cart, newItem]);
    }
  };

  const removeFromCart = (cartId: string) => {
    const filtered = cart.filter((item) => item.cartId !== cartId);
    saveCartToStorage(filtered);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    const item = cart.find((i) => i.cartId === cartId);
    if (!item) return;
    
    // Don't modify quantity of originals above 1 as there's only 1 original work
    if (item.purchaseType === "original" && delta > 0) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeFromCart(cartId);
    } else {
      const updated = cart.map((i) =>
        i.cartId === cartId ? { ...i, quantity: newQuantity } : i
      );
      saveCartToStorage(updated);
    }
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const acceptCookies = () => {
    localStorage.setItem("hellokostek_cookies", "true");
    setShowCookies(false);
  };

  // Render correct sub-page based on active tab state
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "portraits":
        return <PortraitsOffer />;
      case "shop":
        return <Shop addToCart={addToCart} cart={cart} />;
      case "about":
        return <AboutMe />;
      case "contact":
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-off-white text-off-black selection:bg-lime-accent selection:text-off-black flex flex-col justify-between">
      
      {/* Centered Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main content body */}
      <main className="flex-grow pb-16">
        {renderPage()}
      </main>

      {/* FOOTER - Minimal, elegant and respectful */}
      <footer className="bg-neutral-50 border-t border-neutral-200 pb-16 pt-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Column 1 - Brand Summary */}
          <div className="md:col-span-4 space-y-6">
            <div className="w-20 h-10 overflow-hidden rounded-lg bg-off-black/5 p-1">
              <img
                src="https://hellokostek.pl/wp-content/uploads/2021/05/logo-animation-30fps-v-2.gif"
                alt="HelloKostek"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
            <p className="font-sans text-xs sm:text-sm text-stone-500 max-w-sm leading-relaxed">
              Pracownia malarska HelloKostek to oaza tradycyjnego malarstwa olejnego, rysunku i intymnej twórczości ze zdjęcia. Tworzę z myślą o domach pełnych ciepła, miłości i pamiątek pokoleniowych.
            </p>
          </div>

          {/* Column 2 - Core Offers paths */}
          <div className="md:col-span-3 space-y-4 font-sans text-xs sm:text-sm">
            <span className="font-mono text-xs uppercase text-stone-400 tracking-wider block font-bold">Nasza oferta</span>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button 
                  onClick={() => { setCurrentPage("portraits"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-magenta-accent transition-colors cursor-pointer"
                >
                  Portret ze zdjęcia na płótnie prostokątnym
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage("portraits"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-magenta-accent transition-colors cursor-pointer"
                >
                  Portret ze zdjęcia na płótnie owalnym
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-magenta-accent transition-colors cursor-pointer"
                >
                  Kolekcja oryginalnych akwareli
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-magenta-accent transition-colors cursor-pointer"
                >
                  Szkice ołówkiem i wydruki fine-art
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 - Navigation shortcuts */}
          <div className="md:col-span-2 space-y-4 font-sans text-xs sm:text-sm">
            <span className="font-mono text-xs uppercase text-stone-400 tracking-wider block font-bold">Odkryj</span>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button 
                  onClick={() => { setCurrentPage("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-magenta-accent transition-colors cursor-pointer"
                >
                  O autorze (Kostek)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-magenta-accent transition-colors cursor-pointer"
                >
                  Jak złożyć zamówienie?
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-magenta-accent transition-colors cursor-pointer"
                >
                  FAQ / Pytania
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 - Direct contact block details */}
          <div className="md:col-span-3 space-y-4 font-sans text-xs sm:text-sm">
            <span className="font-mono text-xs uppercase text-stone-400 tracking-wider block font-bold">Kontakt</span>
            <p className="text-stone-600 leading-normal">
              Masz pytania? Chcesz skonsultować kompozycję?<br />
              <a href="mailto:kontakt@hellokostek.pl" className="font-bold text-off-black hover:text-magenta-accent transition-colors block mt-2">
                kontakt@hellokostek.pl
              </a>
            </p>
            <div className="flex gap-2 text-xs font-mono font-bold text-stone-400 mt-2">
              <span>NIP: 728-261-12-32</span> • <span>REGON: 365219904</span>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="max-w-7xl mx-auto border-t border-stone-150 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-sans">
          <p>© {new Date().getFullYear()} HelloKostek.pl. Wszelkie prawa zastrzeżone. Rękodzieło i malarstwo artystyczne.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#E0115F] transition-colors">Polityka prywatności</a>
            <span>•</span>
            <a href="#" className="hover:text-[#E0115F] transition-colors">Regulamin sklepu</a>
          </div>
        </div>
      </footer>

      {/* Floating Cart Badge (Only shown if cart possesses items, out of the clean navbar) */}
      {cart.reduce((total, item) => total + item.quantity, 0) > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-magenta-accent text-white p-4 rounded-full shadow-2xl hover:bg-off-black hover:scale-105 active:scale-95 transition-all duration-300 z-40 group flex items-center justify-center cursor-pointer border border-magenta-accent/20"
          aria-label="Koszyk"
          id="floating-cart-btn"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 bg-off-black text-white text-xs font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>
      )}

      {/* Cart Drawer Sliding Component */}
      <Checkout
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />

      {/* COOKIE CONSENT AGREEMENT (Requested: custom button colors - Magenta or Lime) */}
      {showCookies && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white border border-neutral-200 p-6 rounded-2xl shadow-xl z-50 animate-fadeIn font-sans space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-off-black shrink-0 mt-0.5" />
            <div className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-off-black font-semibold block text-sm mb-1">Dbamy o Twoją prywatność</strong>
              Ta strona korzysta z plików cookies w celu zapewnienia prawidłowego działania koszyka zakupowego, bezpiecznych płatności Stripe oraz analizowania ruchu. Klikając „Zgadzam się”, pozwalasz nam na pełną dbałość o Twoje doświadczenia zakupowe.
            </div>
          </div>
          
          <div className="flex justify-between items-center gap-3">
            <a href="#" className="text-xs text-stone-400 hover:text-off-black hover:underline">
              Więcej w polityce prywatności
            </a>
            <div className="flex gap-2">
              <button
                onClick={acceptCookies}
                className="px-4 py-2.5 bg-off-black text-white hover:bg-magenta-accent transition-all duration-300 rounded-lg text-xs font-mono uppercase tracking-wider leading-none cursor-pointer"
              >
                Zgadzam się
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
