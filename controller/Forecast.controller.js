const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const axios = require('axios');
const Forecast = require('../models/Forecast.model');
const Cache = require('../helpers/cache.helper');
let cacheObject = new Cache();

const getWeatherBitData = async (lat, lon) => {
    console.log("getting the data from the WeatherBit API");
    const queryParams = {
      params: {
        key: WEATHERBIT_KEY,
        lat: lat,
        lon: lon
      }
    };
    const response = await axios.get(WEATHERBIT_URL, queryParams);
    const data = response.data.data.map(item => new Forecast(item));

    cacheObject.forecast.push({
        "lat": lat,
        "lon": lon,
        "data": data
      });
    
      return data;
    }
    
    const getWeather = async (req, res) => {
      const { lat, lon } = req.query;
    
      
      if (((Date.now() - cacheObject.timeStamp) > 77500000)) {
        console.log('Reset Cache');
        cacheObject = new Cache();
      }
      
      if (cacheObject.forecast.length) {
    
        const filteredData = cacheObject.forecast.find((location) => {
          return location.lat === lat && location.lon === lon
        }); 
    
        if (filteredData) {
          console.log("getting the data from the cache");
          res.json(filteredData.data);
        } else {
         
          res.json(await getWeatherBitData(lat, lon));
        }
      } else {
    
        res.json(await getWeatherBitData(lat, lon));
      }
    
    }
    
    module.exports = getWeather;