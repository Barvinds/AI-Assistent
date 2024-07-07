// Home.jsx
import React from 'react';
import './style.css';
import Chatbox from './Chatbox';


const Home = () => {
    return (
      <>
        <section id="home" className="container section section__height">
        <img src="https://static.wixstatic.com/media/cbbfa4_6837841839e8454ca66998053fd8bfa7~mv2.gif" width="300px" height="300px"/>
        <div> <Chatbox/></div>
        </section>
        </>
    );
}

export default Home;
