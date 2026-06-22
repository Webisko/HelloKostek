export type PageId = "home" | "portraits" | "shop" | "about" | "contact" | "product-detail" | "success";

export interface Product {
  id: string;
  title: string;
  year: string;
  category: "watercolor" | "drawing" | "custom_portrait";
  originalPrice: number;
  printPrice?: number; // 30 PLN for watercolor prints, 20 PLN for drawing prints
  isOriginalAvailable: boolean;
  imageUrl: string;
  originalPageUrl?: string;
  description: string;
  isPopular?: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  title: string;
  category: "watercolor" | "drawing" | "custom_portrait";
  purchaseType: "original" | "print";
  price: number;
  quantity: number;
  optionsSummary?: string;
}

export interface PortraitCustomConfig {
  canvasShape: "rectangle" | "oval";
  dimensions: "30x40" | "40x55" | "50x70";
  peopleCount: number;
  specialRequests: string;
  uploadedPhotoUrl?: string;
  price: number;
}
