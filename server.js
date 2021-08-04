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

async function getMovie(req, res) {
    const city = req.query.city
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

    axios.get(URLMovie).then(result => {

            let moviesArray = result.data.results

            res.send(moviesObject(moviesArray));
        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');
}


const moviesObject = (moviesObj) => {

    const moviesObj = [];
    moviesObj.map(element => {

    const title = element.title
    const overview = element.overview
    const vote_average = element.vote_average
    const vote_count = element.vote_count
    const poster_path = process.env.img_url+element.poster_path
    const popularity = element.popularity
    const release_date = element.release_date

        moviesObj.push(new Movies(title,overview,vote_average,vote_count,poster_path,popularity,release_date));

       
    });
    return moviesObj;
}

server.get('/getWeather', getWeather);

async function getWeather(req, res) {
    const city = req.query.cityName
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=${process.env.API_KEY}`;


    axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            let weatherArray = result.data.data
            res.send(wetherObject(weatherArray));
        })
        .catch(err => {
            res.send(err);
        })
}

const wetherObject = (weatherObj) => {

    const forecastObj = [];
    weatherObj.map(element => {

        const description = `Low of ${element.low_temp} ,High of ${element.max_temp} with ${element.weather.description}`;
        const date = element.datetime;
        forecastObj.push(new Forecast(description, date));
    });
    return forecastObj;
};


server.listen(PORT, () => {console.log(`Server on = ${PORT} `)});





// const { request, response } = require('express');
// const express = require('express');
// const weatherData = require('./data/weather.json');
// const axios = require('axios');
// require('dotenv').config();
// const cors = require('cors');
// const server = express() 
// const PORT = process.env.PORT;
// const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY; 
// const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
// server.use(cors());

// const Forecast = require('./models/forcast.js')


// class Forecast {
//     constructor(value) {
//         this.valid_date = value.valid_date;
//         this.description = `${value.weather.description}`;
//     }
// }

// server.get('/', (req, res) => {
//     res.send('Hello from backend');
// });



// server.get('/weather', async (req, res) => {
//     const {lat, lon} = req.query;

//     const response = await axios.get(`${WEATHERBIT_URL}?key=${WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`);
//     const data = response.data.data.map(item => new Forecast(item));
//     res.json(data);
    
// }




