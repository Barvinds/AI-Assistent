import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Game from './pages/Game';
import Doctors from './pages/Doctors';
import About from './pages/About';
import './App.css';
import PreLoader from './components/Preloader';

const App = () => {
    const [showPopup, setShowPopup] = useState(true); // State to manage popup visibility

    const handleAccept = () => {
        setShowPopup(false); // Hide the popup when user accepts
    };

    useEffect(() => {
        // Create script element for Google Translate script
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        scriptElement.async = true;

        // Define function for Google Translate initialization
        window.googleTranslateElementInit = function() {
            new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        };

        // Append script element to the document body
        document.body.appendChild(scriptElement);

        // Clean up function to remove script element
        return () => {
            document.body.removeChild(scriptElement);
            delete window.googleTranslateElementInit;
        };
    }, []);

    return (
        <>
            <PreLoader />
            <Router>
                <div>
                    <Nav />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/doctors" element={<Doctors />} />
                            <Route path="/game" element={<Game />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </main>
                </div>
            </Router>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>DR.GRANDMA</h2>
                        <p>In this chatbot only access for few questions is free. If you want to move further, please complete the login process.</p>
                        <div id="google_translate_element"></div>
                        <button onClick={handleAccept}>Accept</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
