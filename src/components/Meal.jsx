import React, { useState } from "react";
import MealItem from "./MealItem";
import './styles.css';

const Meal = () => {
    const [search, setSearch] = useState("");
    const [Mymeal, setMeal] = useState(null);

    const searchMeal = (evt) => {
        if (evt.key === "Enter") {
            fetch(`http://localhost:5173/searchmeals?q=${search}`)
                .then(res => res.json())
                .then(data => {
                    setMeal(data);
                    setSearch("");
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <>
            <div className="main">
                <div className="heading">
                    <h1>SEARCH MEALS</h1>
                </div>
                <div className="searchBox">
                    <input type="search" className="search-bar" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchMeal} />
                </div>
                <div className="container">
                    {   
                        Mymeal === null ? <p className="notSearch">No meals found</p> : 
                        Mymeal.map((meal, index) => <MealItem key={index} data={meal} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Meal;
