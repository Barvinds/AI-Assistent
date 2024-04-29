import React, { useState } from 'react';
import './Medicine.css';
import Meal from 'E:/Projects/Project-2/src/components/Meal.jsx';


const Medicine = () => {
    const [results, setResults] = useState([]);

    return (
        <section className="container section section__height" id="doctors">
         <Meal/>
        </section>
    );
}

export default Medicine;
