import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext";
import styles from './Profile.module.css';

const WEB_SERVER_HOST = 'https://vsenadenu.ru/api';

async function getUserInfo(codeResponse) {
    var response = await fetch(`${WEB_SERVER_HOST}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ code: codeResponse.code })
    });
    return await response.json();
}

const getAuthToken = () => {
    return localStorage.getItem('jwt_token');
};

const getAboutUser = () => {
    return localStorage.getItem('user_info');
};

const Auth = () => {
    const { loggedIn, login, logout } = useAuth();
    // const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    // Function to handle successful authentication and storage of JWT token and user info
    const handleSuccessfulAuthentication = async (codeResponse) => {
        try {
            // Retrieve user info and JWT token from the backend
            const loginDetails = await getUserInfo(codeResponse);
            
            // Set the JWT token and user info in localStorage
            localStorage.setItem('jwt_token', loginDetails.jwt_token);
            localStorage.setItem('user_info', JSON.stringify(loginDetails.user));
            
            // Update state to indicate the user is logged in and set user data
            login();
            setUser(loginDetails.user);
        } catch (error) {
            console.log('Error during authentication:', error);
            // Handle authentication error if needed
        }
    };

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: handleSuccessfulAuthentication,
        onError: (error) => console.log('Login failed:', error)
    });

    const handleLogout = () => {
        // Clear JWT token from localStorage
        localStorage.removeItem('jwt_token');
        // Clear user info from localStorage
        localStorage.removeItem('user_info');
        // Update the state to indicate the user is logged out
        logout();
    };

    useEffect(() => {
        const token = getAuthToken();
        const user_info = getAboutUser();

        if (token && user_info) {
            login();
            setUser(JSON.parse(user_info));
        } else {
            logout();
        }
    }, [])

    return(
        <div>
            {loggedIn ? (
                <div>
                    <h3 className={styles.welcomeTitle}>Добро пожаловать,</h3>
                    <img src={user.picture} alt="user image" className={styles.profileLogo} />
                    <p className={styles.userName}>{user.name}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                    <br />
                    <br />
                    <button className={styles.signOutButton} onClick={handleLogout}>Выйти из аккаунта</button>
                </div>
            ) : (
                <button className={styles.signInButton} onClick={() => googleLogin()}>Авторизоваться с помощью Google</button>
            )}
        </div>
    );
}

export default Auth;