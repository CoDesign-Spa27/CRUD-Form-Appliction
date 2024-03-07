// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formdataRoutes = require('./routes/formdata'); // Adjust the path based on your project structure
const bodyParser = require('body-parser');
const app = express();
 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// MongoDB connection
mongoose.connect('mongodb+srv://mytuf8289:bElGZXrUA0lyf6yb@cluster0.pf4cvit.mongodb.net/formdata');

// Use routes
app.use('/api',  formdataRoutes);

// Start the server
app.listen(3000);
