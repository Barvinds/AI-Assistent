// Home.jsx
import React from 'react';
import './style.css';
import Chatbox from './Chatbox';


const Home = () => {
    return (
      <>
        <section id="home" className="container section section__height">
        <div class="animated-text">
          <h1>WELLCOME TO DR.GRANDMA <span></span></h1>     
        </div>
        <div> <Chatbox/></div>
        </section>
        </>
    );
}

export default Home;
