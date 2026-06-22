import { Product } from "./types";

export const SHOP_PRODUCTS: Product[] = [
  // --- WATERCOLORS (300 PLN Original, 30 PLN Print) ---
  {
    id: "watercolor-2-2022",
    title: "Więcej o obiekcie II",
    year: "2022",
    category: "watercolor",
    originalPrice: 300,
    printPrice: 30,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-2-2022-edited-768x768.jpg",
    description: "Subtelna akwarela z cyklu badającego formę i relacje przestrzenne. Delikatne rozmycia i głębokie tony budują melancholijny, intymny nastrój idealny do sypialni lub salonu wypoczynkowego."
  },
  {
    id: "watercolor-7-2022",
    title: "Więcej o obiekcie VII",
    year: "2022",
    category: "watercolor",
    originalPrice: 300,
    printPrice: 30,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-7-2022-scaled.jpg",
    description: "Poruszająca kompozycja akwarelowa na grubym papierze bawełnianym. Harmoniczne zestrojenie chłodnych barw z delikatną nutą ciepła emanuje spokojem i wyciszeniem."
  },
  {
    id: "watercolor-8-2022",
    title: "Więcej o obiekcie VIII",
    year: "2022",
    category: "watercolor",
    originalPrice: 300,
    printPrice: 30,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-8.jpg",
    description: "Kameralna praca z przewagą organicznych, miękkich kształtów. Urzekający detal, który przyciąga wzrok i zaprasza do codziennej, cichej kontemplacji."
  },
  {
    id: "watercolor-9-2022",
    title: "Więcej o obiekcie IX",
    year: "2022",
    category: "watercolor",
    originalPrice: 300,
    printPrice: 30,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-9-2022-scaled.jpg",
    description: "Zmysłowe, płynne przejścia akwarelowe. Praca o silnym ładunku emocjonalnym, zbalansowana lekkim tłem, która doskonale komponuje się z nowoczesnymi oraz klasycznymi wnętrzami."
  },
  {
    id: "watercolor-13-2022",
    title: "Więcej o obiekcie XIII (Sygnowany)",
    year: "2022",
    category: "watercolor",
    originalPrice: 300,
    printPrice: 30,
    isOriginalAvailable: false, // Only print as requested: "Dostępne są wydruki powyższych akwareli - 30 zł plus koszt wysyłki plus ta praca..."
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Wiecej-o-obiekcie-13-2022-scaled.jpg",
    description: "Wyrafinowana kompozycja akwarelowa, dostępna wyłącznie w postaci wysokiej jakości wydruku artystycznego na luksusowym papierze archiwalnym."
  },

  // --- DRAWINGS (200 PLN Original, 20 PLN Print) ---
  {
    id: "drawing-run-2024",
    title: "Postaci w biegu",
    year: "2024",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://img1.one.bid/img/7242/2086036_1b.jpg?1729100604",
    description: "Ekspresyjny rysunek ołówkiem rejestrujący dynamikę ludzkiego ciała, grę cieni i ruch. Nowoczesna kreska, która wnosi do wnętrza powiew energii."
  },
  {
    id: "drawing-daily-2022",
    title: "Codzienność",
    year: "2022",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Codziennosc-2022.jpg",
    description: "Kameralne studium chłodnej, melancholijnej codzienności. Wyjątkowo intymna kompozycja, skłaniająca do odnalezienia piękna w najprostszych, ulotnych momentach."
  },
  {
    id: "drawing-cant-stand-2022",
    title: "Nie wytrzymam",
    year: "2022",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Nie-wytrzymam-2022.jpg",
    description: "Poruszające personifikowanie nagromadzonych emocji za pomocą wyrazistej kreski graficznej. Głębokie kontrasty ucieleśniają wewnętrzną odporność i siłę."
  },
  {
    id: "drawing-anxiety-2022",
    title: "Lęk",
    year: "2022",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Lek-2022-1.jpg",
    description: "Delikatny, pełen czułości i zniuansowania rysunek poruszający intymny temat lęku jako części ludzkiego doświadczenia. Uniwersalna, piękna praca kolekcjonerska."
  },
  {
    id: "drawing-isolated-10-2022",
    title: "Obiekt wyodrębniony #10",
    year: "2022",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Obiekt-wyodrebniony-10-2022.jpg",
    description: "Minimalistyczny, surowy w formie rysunek ołówkiem skupiający się na pojedynczej bryle i cieniu. Wybitna lekcja czystej proporcji i przestrzeni."
  },
  {
    id: "drawing-weird-feeling-2022",
    title: "To dziwne uczucie",
    year: "2022",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/To-dziwne-uczucie-2022.jpg",
    description: "Złożony i zmysłowy rysunek, który dotyka nieuchwytnych stanów emocjonalnych. Każde pociągnięcie ołówka buduje głęboką strukturę psychologiczną postaci."
  },
  {
    id: "drawing-escape-2022",
    title: "Ucieczka",
    year: "2022",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Ucieczka-2022.jpg",
    description: "Dynamiczny, metaforyczny rysunek ukazujący pragnienie wolności i przestrzeni. Niezwykła lekkość kompozycji idealnie ożywi minimalistyczne wnętrze."
  },
  {
    id: "drawing-fear-2022",
    title: "Strach",
    year: "2022",
    category: "drawing",
    originalPrice: 200,
    printPrice: 20,
    isOriginalAvailable: true,
    imageUrl: "https://hellokostek.pl/wp-content/uploads/2023/07/Strach-2022.jpg",
    description: "Sztuka zmagań sformułowana w nienagannym rzemiośle ołówka. Oparta na delikatnych cieniach praca, która potrafi oczarować głębią wyrazu."
  }
];

export const PORTRAIT_PRICING = {
  basePrice: 800, // For 30x40 cm
  rectangle30x40: 800,
  oval30x40: 800,
  extraPersonFee: 300, // Approximate reference for larger portraits to make the calculator fully interactive
  advanceRatio: 0.50, // 50% non-refundable deposit
};
