import { CheckCircle2, ChevronRight, Mail, Phone, CalendarCheck, Home } from "lucide-react";

interface SuccessProps {
  setCurrentPage: (page: "home" | "portraits" | "shop" | "about" | "contact" | "product-detail" | "success") => void;
  clearCart?: () => void;
}

export default function Success({ setCurrentPage, clearCart }: SuccessProps) {
  return (
    <div className="animate-fadeIn py-24 px-6 max-w-xl mx-auto text-center space-y-10">
      {/* Premium Visual Celebration Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100 animate-scaleIn">
          <CheckCircle2 className="w-10 h-10" />
        </div>
      </div>

      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#E0115F] font-semibold block">
          Dziękujemy za zaufanie • hellokostek
        </span>
        <h1 className="font-display text-4.5xl text-gray-900 tracking-tight leading-none font-normal">
          Operacja powiodła się.
        </h1>
        <p className="font-sans text-gray-600 text-base leading-relaxed">
          Twój formularz kontaktowy lub wirtualne zamówienie uwieczniające wyjątkowe kadry zostało pomyślnie przetworzone przez system Stripe i przekazane do mojej Pracowni Artystycznej w Łodzi.
        </p>
      </div>

      {/* Symmetrical Informational Bullet Axis */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-left space-y-4 text-xs sm:text-sm font-sans text-gray-700">
        <div className="flex gap-3">
          <Mail className="w-5 h-5 text-[#E0115F] shrink-0 mt-0.5" />
          <div>
            <strong className="text-gray-900 font-semibold block">Skrzynka Odbiorcza</strong>
            <span>Potwierdzenie wraz z podsumowaniem parametrów wysłaliśmy na Twój adres e-mail.</span>
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-150 pt-4">
          <CalendarCheck className="w-5 h-5 text-[#E0115F] shrink-0 mt-0.5" />
          <div>
            <strong className="text-gray-900 font-semibold block">Czas Realizacji i Poprawki</strong>
            <span>W przypadku portretów na zamówienie, cyfrowy projekt kompoziacyjny prześlę do konsultacji w ciągu 24-48 godzin.</span>
          </div>
        </div>
      </div>

      {/* Control Back Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={() => {
            if (clearCart) clearCart();
            setCurrentPage("home");
          }}
          className="flex-1 py-3.5 bg-gray-950 text-white hover:bg-[#E0115F] transition-all duration-300 rounded-xl font-bold font-sans text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Strona główna
        </button>
        <button
          onClick={() => setCurrentPage("shop")}
          className="flex-1 py-3.5 bg-white border border-gray-300 hover:border-gray-900 text-gray-800 rounded-xl font-bold font-sans text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          Wróć do sklepu
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
