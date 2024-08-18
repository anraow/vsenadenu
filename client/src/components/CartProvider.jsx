import React, { createContext, useContext, useEffect, useState } from 'react';
// import { json } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
    const addToCart = (item) => {
        const updatedCart = [...cartItems, item];
        setCartItems(updatedCart);
    };
    
    const removeFromCart = (index) => {
        // const updatedCart = [...cartItems];
        // updatedCart.splice(index, 1);
        const updatedCart = cartItems.filter((_, i) => i !== index);

        setCartItems(updatedCart);

        // Update the localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    return(
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
