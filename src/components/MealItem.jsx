import React from "react";
import './styles.css';

const MealItem = ({ data }) => {
    return (
        <div className="meal-card">
            <h2 className="meal-name">{data.name}</h2>
            <div className="meal-details">
                {data.ingredients && data.ingredients.length > 0 && (
                    <>
                        <h3>Ingredients:</h3>
                        <ul>
                            {data.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </>
                )}
                {data.instructions && (
                    <>
                        <h3>Instructions:</h3>
                        <p>{data.instructions}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default MealItem;
