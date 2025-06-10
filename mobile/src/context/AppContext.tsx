import React, { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (dish: CartItem) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (dish: CartItem) => {
    setCartItems((prev) => [...prev, dish]);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
