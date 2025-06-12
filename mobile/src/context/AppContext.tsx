import React, { createContext, useContext, useState } from "react";
import { Dish } from "../service/get-dishes";


type CartContextType = {
  cartItems: Dish[];
  addToCart: (dish: Dish) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [cartItems, setCartItems] = useState<Dish[]>([]);

  const addToCart = (dish: Dish) => {
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
