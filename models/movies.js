const axios = require('axios');

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
}
module.exports = {
    getMovie,
    moviesObject,
}