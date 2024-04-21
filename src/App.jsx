import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Doctors from './pages/Doctors';
import About from './pages/About';
import './App.css';
import Chatbox from './pages/Chatbox';

const App = () => {
    return (
       
        <Router>
            <div>
            <Chatbox/>
                <Nav />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
