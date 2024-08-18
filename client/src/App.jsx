import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from 'react-router-dom';
import React, {useState, useEffect } from 'react';
import axios from 'axios';

import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';
import BrandPage from './components/BrandPage';
import Profile from './components/Profile';
import { AuthProvider } from './contexts/AuthContext';

// import logo from './assets/logo_app.svg';
import cartIcon from './assets/cart-icon.svg';
import profileIcon from './assets/profile-icon.svg';
import { mockItemDetails } from './test/mockData';
import './App.css';

const WEB_SERVER_HOST = 'https://vsenadenu.ru/api';

const App = () => {
  const navigate = useNavigate();
  
  const Header = () => {
    return(
      <header className='header'>
      <div className='logo-container'>
        <p className='home-link' onClick={() => navigate('/')}>Главная</p>
      </div>
      <div className='buttons-container'>
        <button className='button cart-button' onClick={() => navigate('/cart')}>
          <img src={cartIcon} alt='Cart' className='icon' />
        </button>
        <button className='button profile-button' onClick={() => navigate('/profile')}>
          <img src={profileIcon} alt='Profile' className='icon' />
        </button>
      </div>
    </header>
    );
  }

  const Items = () => {
    // const items = mockItemDetails;
    // const items = [
    //   {
    //     "_id": "663bc83747cfae58ed5c3ca8",
    //     "photos": ["https://i.pinimg.com/originals/ec/04/10/ec0410f1844b47b04687675bc91913f5.jpg"],
    //     "name": "Item Name",
    //     "caption": "Description about Item here.",
    //     "brand": { "name": "Brand", "uri": "brand" },
    //     "price": 4500,
    //     "sizes": [ "M", "L" ]
    //   }
    //   // Add more items here if needed
    // ];

    const [items, setItems] = useState([]);

    useEffect(() => {
      axios.get(`${WEB_SERVER_HOST}/itemsList`)
        .then(response => {
          setItems(response.data.items);
        })
        .catch(error => {
          console.error("There was an error fetching the items!", error);
        });
    }, []);

    // const fetchItems = async () => {
    //   try {
    //     const response = await fetch(`${WEB_SERVER_HOST}/itemsList`, {
    //       method: 'GET',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': '*',
    //       },
    //     });
    //     const data = await response.json();
    //     setItems(data);
    //   } catch(error) {
    //     console.error('Error fetching items:', error);
    //   }
    // };

    return(
      <div className='items-container'>
        <div className='items-list'>
          {items.map(item => (
            <Link key={item._id} to={`items/${item._id}`} className="item-link">
              <div className='item'>
                <div className='item-details'>
                  <div className='item-details-row'>
                    <p className='item-name'>{item.name}</p>
                    <p className='item-price'>{item.price} ₽</p>
                  </div>
                  <p className='item-brand-name'>{item.brand["name"]}</p>
                </div>
                <div className='item-images-container'>
                  {item.photos.map(photo => (
                    <img key={photo} src={photo} className="item-image" alt="photo" />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <AuthProvider>
          <GoogleOAuthProvider clientId='606715224666-o0883jmuonkorbr8qfunbrtqgua02tgl.apps.googleusercontent.com'>
            <Header />
            <Routes>
              <Route path='/' element={<Items />} />
              <Route path='/items/:item_id' element={<ItemDetails />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='brand/:brandname' element={<BrandPage />} />
                <Route path='/profile' element={<Profile />} /> 
            </Routes>
          </GoogleOAuthProvider>
        </AuthProvider>
    </div>
  );
}

export default App;