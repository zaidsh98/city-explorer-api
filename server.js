const { request, response } = require('express');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express() 
const PORT = process.env.PORT;
app.use(cors());
app.get('/weather', (request, response) => {
    const weather = [
      
    ];
    response.send(weather);
  });
 
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});


