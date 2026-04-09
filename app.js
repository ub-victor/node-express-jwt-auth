// Import the Express and Mongoose libraries
const express = require('express');
const mongoose = require('mongoose');

const app = express() // Create an Express application

// middleware

app.use(express.static('public')) // Serve static files from the 'public' directory
app.use(express.json()) // Parse incoming JSON requests

// view engine