import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Game from './pages/Game';
import Medicine from './pages/Medicine';
import About from './pages/About';
import './App.css';
import PreLoader from './components/Preloader';
import TranslateWidget from './components/TranslateWidget';


const App = () => {
    const [showPopup, setShowPopup] = useState(true); 
    const handleAccept = () => {
        setShowPopup(false); 
    };


    return (
        <>
            <PreLoader />
            <Router>
                <div>
                    <Nav />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/doctors" element={<Medicine />} />
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
                        <TranslateWidget/>
                        <p>In this chatbot only access for few questions is free. If you want to move further, please complete the login process.</p>
                        
                        <button onClick={handleAccept}>Accept</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
