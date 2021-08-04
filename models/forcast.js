const axios = require('axios');


class Forecast {
    constructor(weather){
        this.date=weather.valid_date;
        this.description = weather.weather.description
    }
}
async function getWeather(req, res) {
    const city = req.query.cityName
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=${process.env.API_KEY}`;


    axios
        .get(URL)
        .then(result => {
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

module.exports = {
    getWeather,
    wetherObject,
}