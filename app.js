// Import the Express and Mongoose libraries
require('dotenv').config(); // Load environment variables from the .env file
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db/connect')
const authRoutes = require('./routes/authRoutes');

const app = express() // Create an Express application

// middleware

app.use(express.static('public')) // Serve static files from the 'public' directory
app.use(express.json()) // Parse incoming JSON requests

// view engine

app.set('view engine', 'ejs'); // Set EJS as the view engine for rendering templates


// routes

app.get('/', (req, res)=> res.render('home'));
app.get('/smoothies', (req, res)=> res.render('smoothies'))
app.use(authRoutes);

const port = process.env.PORT || 3000;

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, ()=>{
            console.log(`Server is Running on port ${port}...`);
        })

    }catch(error){
        console.log(error)

    }
}

start();