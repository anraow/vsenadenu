import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import { mockItemDetails } from "../test/mockData";
import { useCart } from "./CartProvider";
import styles from './ItemDetails.module.css';

const WEB_SERVER_HOST = 'https://vsenadenu.ru/api';

function ItemDetails() {
    const {item_id} = useParams();
    const [item, setItem] = useState(null);
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchItemDetails(item_id);

    }, [item_id]);

    const fetchItemDetails = async (item_id) => {
        try {
            const response = await axios.get(`${WEB_SERVER_HOST}/item/${item_id}`);
            setItem(response.data);
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        setMessage('');
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            const itemWithSize = { ...item, selectedSize };
            addToCart(itemWithSize);
            localStorage.setItem('selectedSize', selectedSize);
            setMessage("Добавлено в корзину");
        } else {
            setMessage("Выберите размер, чтобы добавить");
        }
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? item.photos.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === item.photos.length - 1 ? 0 : prevIndex + 1));
    };

    if (!item) {
        return <div>Loading ...</div>;
    }

    return(
        <div className={styles.itemDetailsContainer}>
            <div className={styles.itemDetailsContent}>
                <div className={styles.itemImageContainer}>
                    {item.photos && item.photos.length > 0 && (
                        <div className={styles.imageCarousel}>
                            <button className={styles.carouselButton} onClick={handlePreviousImage}>{"<"}</button>
                            <img src={item.photos[currentImageIndex]} alt={item.name} className={styles.itemImage} />
                            <button className={styles.carouselButton} onClick={handleNextImage}>{">"}</button>
                        </div>
                    )}
                </div>
                <div className={styles.itemInfo}>
                    <div className={styles.itemInfoRow}>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemPrice}>{item.price} ₽</p>
                    </div>
                    <div className={styles.itemInfoRow}>
                        <p className={styles.itemDescription}>{item.caption}</p>
                        <p className={styles.itemBrand}>
                            <Link to={`/brand/${item.brand.name}`} className={styles.brandLink}>{item.brand.name}</Link>
                        </p>
                    </div>
                    <div className={styles.sizeContainer}>
                        <div className={styles.sizeTitle}>Выберите размер:</div>
                        <div className={styles.sizeButtons}>
                            {item.sizes.map(size => (
                                <button 
                                    key={size} 
                                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {message && <div className={styles.message}>{message}</div>}
                    </div> 
                    <button onClick={handleAddToCart} className={styles.addToCartButton}>В корзину</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails;