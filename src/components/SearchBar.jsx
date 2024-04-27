import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchData("");
  }, []); 

  const fetchData = (value) => {
    fetch("mongodb+srv://bravinlc00123:<password>@barvin.cnjhott.mongodb.net") // Assuming your backend server is running locally on port 5000
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((doctor) => {
          return (
            doctor &&
            doctor.specialty &&
            doctor.specialty.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setResults([]); // Set empty array if there's an error
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
