'use strict'
const { request, response } = require('express');
const express = require('express');
const server = express();
const weatherData = require('./data/weather.json');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
server.use(cors());
const PORT = process.env.PORT;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY; 
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const Forecast = require('./models/forcast.js')
const Movies = require('./models/movies.js')


server.get('/movies', getMovie);


server.get('/getWeather', getWeather);




server.listen(PORT, () => {console.log(`Server on = ${PORT} `)});