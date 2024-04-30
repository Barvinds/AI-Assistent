const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://barvindsug21cb:jRW84jdKQywXLxMl@cluster0.gxgm5to.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const MealSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: String,
});

const Meal = mongoose.model('Meal', MealSchema);

// Endpoint to get meals by search
app.get('/searchmeals', (req, res) => {
    const searchQuery = req.query.q;
    Meal.find({ name: { $regex: searchQuery, $options: 'i' } })
        .then(meals => res.json(meals))
        .catch(err => res.status(500).json(err));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
