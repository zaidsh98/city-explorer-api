'use strict'

const { request, response } = require('express');
const express = require('express');
const weatherData = require('./data/weather.json');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const server = express() 
const PORT = process.env.PORT;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY; 
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
server.use(cors());

const Forecast = require('./models/forcast.js')


class Forecast {
    constructor(value) {
        this.valid_date = value.valid_date;
        this.description = `${value.weather.description}`;
    }
}

server.get('/', (req, res) => {
    res.send('Hello from backend');
});



server.get('/weather', async (req, res) => {
    const {lat, lon} = req.query;

    const response = await axios.get(`${WEATHERBIT_URL}?key=${WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`);
    const data = response.data.data.map(item => new Forecast(item));
    res.json(data);
    
}

server.listen(PORT, () => console.log(`server on ${PORT}`));


// server.get('/weather', (req, res) => {

//     try {
//         let { searchQuery, lat, lon } = req.query;
//         let cityData = weatherData.find(element =>
//             element.city_name.toLowerCase() === searchQuery.toLowerCase() ||
//             (`${element.lat}` === lat && `${element.lon}` === lon)
//         );
//         let forecastArr = cityData.data.map(items => new Forecast(items));
//         res.send(forecastArr);
//     }
//     catch (e) {
//         res.status(404).send('No Data for this City');
//      }
//      const queryParams = {
//         params: {
//           key: WEATHERBIT_KEY,
//           lat: lat,
//           lon: lon
//         }
//       };
//       const response = await axios.get(WEATHERBIT_URL, queryParams);
//       const data = response.data.data.map(item => new Forecast(item));
//       res.json(data);
// });