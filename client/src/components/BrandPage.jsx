import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { mockItemDetails, mockBrandDetails } from "../test/mockData"; // Import mockBrands
import styles from './BrandPage.module.css';

function BrandPage() {
    const { brandname } = useParams();
    const [items, setItems] = useState([]);
    const [brand, setBrand] = useState(null); // State to hold brand info

    useEffect(() => {
        fetchItemsByBrand(brandname);
        fetchBrandDetails(brandname);
    }, [brandname]);

    const fetchItemsByBrand = async (brandname) => {
        try {
            const response = await axios.get(`https://vsenadenu.ru/api/items?brand=${brandname}`, { withCredentials: true });
            setItems(response.data.items);
        } catch (error) {
            console.error('Error fetching items by brand:', error);
        }
    };

    const fetchBrandDetails = async (brandname) => {
        try {
          const response = await axios.get(`https://vsenadenu.ru/api/brand/${brandname}`, { withCredentials: true });
          setBrand(response.data);
        } catch (error) {
          console.error('Error fetching brand details:', error);
        }
    };

    return (
        <div>
            {brand && (
                <div className={styles.brandCard}>
                    <div className={styles.brandInfo}>
                        <p className={styles.brandName}>{brand.name}</p>
                        <p className={styles.aboutLabel}>О бренде</p>
                        <p className={styles.brandAbout}>{brand.description}</p>
                    </div>
                    <div className={styles.brandLogo}>
                        <img src={brand.logo} alt={brand.name} />
                    </div>
                </div>
            )}
            <div className={styles.itemsContainer}>
              <div className={styles.itemsList}>
                {items.map(item => (
                    <Link key={item._id} to={`/items/${item._id}`} className={styles.itemLink}>
                        <div className={styles.item}>
                            <div className={styles.itemDetails}>
                              <div className={styles.itemDetailsRow}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <p className={styles.itemPrice}>{item.price} ₽</p>
                              </div>
                            </div>
                            <div className={styles.itemImagesContainer}>
                                {item.photos.map(photo => (
                                  <img key={photo} src={photo} className={styles.itemImage} alt="photo" />
                                ))}
                            </div>
                        </div>
                    </Link>
                  ))}
              </div>
            </div>
        </div>
    );
}

export default BrandPage;
