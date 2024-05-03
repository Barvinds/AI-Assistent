import React, { useState, useEffect } from "react";
import './styles.css'; 
import { FaSearch } from "react-icons/fa";
import MealItem from "./MealItem";

const Meal = () => {
    const [naturalMedicines, setNaturalMedicines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/natural-medicines')
            .then(response => response.json())
            .then(data => setNaturalMedicines(data))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    // Filter the natural medicines based on the search query
    const filteredMedicines = naturalMedicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="main">
                <div className="heading">
                    <h1>Natural Medicines</h1>
                </div>
                <div className="searchBox">
                <FaSearch className="search-icon" />
                    <input type="search" className="search-bar" value={searchQuery} onChange={handleSearchChange} placeholder="Search natural medicines" />
                </div>
                <div className="meal-container">
                    {filteredMedicines.map(medicine => (
                        <MealItem key={medicine.id} data={medicine} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Meal;
