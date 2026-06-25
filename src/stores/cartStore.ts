import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import type { CartItem, Product } from '../types';

export const cart = persistentAtom<CartItem[]>('hellokostek_cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isCartOpen = atom(false);

export function addToCart(product: Product, buyType: 'original' | 'print', quantityToAdd: number = 1) {
  const currentCart = cart.get();
  const cartId = `${product.id}-${buyType}`;
  const price = buyType === 'original' ? product.originalPrice : (product.printPrice || 0);

  const existing = currentCart.find((item) => item.cartId === cartId);
  if (existing) {
    if (buyType === 'original') return;
    const updated = currentCart.map((item) =>
      item.cartId === cartId ? { ...item, quantity: item.quantity + quantityToAdd } : item
    );
    cart.set(updated);
  } else {
    const newItem: CartItem = {
      cartId,
      productId: product.id,
      title: product.title,
      category: product.category,
      purchaseType: buyType,
      price,
      quantity: quantityToAdd,
    };
    cart.set([...currentCart, newItem]);
  }
}

export function removeFromCart(cartId: string) {
  const currentCart = cart.get();
  const filtered = currentCart.filter((item) => item.cartId !== cartId);
  cart.set(filtered);
}

export function updateQuantity(cartId: string, delta: number) {
  const currentCart = cart.get();
  const item = currentCart.find((i) => i.cartId === cartId);
  if (!item) return;

  if (item.purchaseType === 'original' && delta > 0) return;

  const newQuantity = item.quantity + delta;
  if (newQuantity <= 0) {
    removeFromCart(cartId);
  } else {
    const updated = currentCart.map((i) =>
      i.cartId === cartId ? { ...i, quantity: newQuantity } : i
    );
    cart.set(updated);
  }
}

export function clearCart() {
  cart.set([]);
}
