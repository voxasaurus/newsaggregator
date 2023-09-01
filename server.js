// First, require necessary modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors'); // Don't forget this if you're adding CORS support

// Then, initialize express app
const app = express();

// Use middleware
app.use(express.static('public'));
app.use(cors()); // Add this for CORS support

// Routes
app.get('/', (req, res) => {
    res.send('News Aggregator API');
});

app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
        res.json(response.data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: "Error fetching news" }); // Ensure this is JSON!
    }
});

// MongoDB Connection
mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
