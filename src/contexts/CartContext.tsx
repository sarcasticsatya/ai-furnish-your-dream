import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string;
  categoryId: string;
  categoryTitle: string;
  height: number;
  depth: number;
  width: number;
  quantity: number;
  image: string;
  price: number; // Price in ₹
  area: number; // Area in sq. ft.
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('bytras-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart, { ...item, id: Date.now().toString() }];
    setCart(updatedCart);
    localStorage.setItem('bytras-cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('bytras-cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('bytras-cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('bytras-cart');
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
