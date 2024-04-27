import React, { useState } from 'react';
import './Doctors.css';
import { SearchBar } from "E:/projects/project-2/src/components/SearchBar.jsx";
import { SearchResultsList } from "E:/projects/project-2/src/components/SearchResultsList";

const Doctors = () => {
    const [results, setResults] = useState([]);

    return (
        <section className="container section section__height" id="doctors">
            <div className="App">
                <div className="search-bar-container">
                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && <SearchResultsList results={results} />}
                </div>
            </div>
        </section>
    );
}

export default Doctors;
