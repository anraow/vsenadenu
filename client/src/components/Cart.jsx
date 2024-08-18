import React, { useEffect, useState } from "react";
import { useCart } from './CartProvider';
import styles from './Cart.module.css';
import removeIcon from '../assets/remove-icon.svg'

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const [selectedOption, setSelectedOption] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleBuyButtonClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        // Retrieve items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Calculate the total price
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        
        // Calculate the total number of items
        const itemCount = cartItems.length;

        // Update the state with the total price
        setTotalPrice(total);
        setTotalItems(itemCount)
    }, [cartItems]);

    return (
        <div className={styles.cartWrapper}>
            <h2>Корзина</h2>
            <div className={styles.cartContainer}>
                <div className={styles.cartPreviews}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div className={styles.itemPreview} key={index}>
                                <button onClick={() => removeFromCart(index)} className={styles.removeButton}>
                                    <img src={removeIcon} alt="remove" />
                                </button>
                                <div className={styles.ItemCard}>
                                    <img src={item.photos[0]} alt={item.name} className={styles.itemImage}/>
                                    <div className={styles.infoRow}>
                                        <p className={styles.itemName}>{item.name}</p>
                                        <p className={styles.itemSize}>{item.selectedSize}</p>
                                    </div>
                                    <p className={styles.itemPrice}>{item.price} ₽</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Корзина пуста</p>
                    )}
                </div>
                <div className={styles.cartOrder}>
                    <div className={styles.itemsCount}>
                        <p className={styles.totalItems}>
                            Товары:
                            <span className={styles.numberItems}> {totalItems}</span>
                        </p>
                    </div>
                    <div className={styles.deliveryBox}>
                        <ul className={styles.deliveryChoice}>
                            <p>Тип доставки:</p>
                            <li className={styles.deliveryType}>
                                <label>
                                    <input 
                                        type="radio" 
                                        value="to door" 
                                        checked={selectedOption === 'to door'} 
                                        onChange={handleOptionChange} 
                                    />
                                    <span>к двери</span>
                                </label>
                            </li>
                            <li className={styles.deliveryType}>
                                <label>
                                    <input 
                                        type="radio" 
                                        value="to pick-up point" 
                                        checked={selectedOption === 'to pick-up point'} 
                                        onChange={handleOptionChange} 
                                    />
                                    <span>к пункту-выдачи</span>
                                </label>
                            </li>
                        </ul>
                        
                    </div>
                    <div className={styles.sumBox}>
                        <p className={styles.sumLine}>Сумма: <span className={styles.sumNumber}>{totalPrice} ₽</span></p>
                    </div>
                    <div className={styles.buyButtonBox}>
                        <button className={styles.buyButton} onClick={handleBuyButtonClick}>Оплатить</button>
                    </div>
                    {showPopup && (
                        <div className={styles.popup}>
                            <div className={styles.popupContent}>
                                <span className={styles.closeButton} onClick={closePopup}>&times;</span>
                                <p className={styles.popupText1}>Да-да вот так,</p>
                                <p className={styles.popupText2}>будет выглядить покупка, когда мы её добавим 🤭</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    );
}

export default Cart;