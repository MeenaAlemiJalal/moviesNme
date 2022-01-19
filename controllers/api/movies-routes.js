const router = require('express').Router();
const axios = require('axios')
const authenticate = require('./authentication')
const { User, Movie } = require('../../models');

function removeDuplicat (array) {
  const newArray = array.filter((value, index, self) => {
   return index === self.findIndex((t) => (
      t.title === value.title
    ))
  })
  return newArray
}


// home page route that returns all movies
router.get('/', async (req, res) => {
  const movies = await Movie.findAll({
    raw: true
  })
  let newSeries = []
  let newMovies = []
  let classic = []
  movies?.length && movies.forEach(movie => {
    if(movie.type === 'series' && !newSeries.includes(movie)) {
      newSeries.push(movie)
    }
    if(movie.type === 'movie' && Number(movie.year) > 2000) {
      newMovies.push(movie)
    }
    if(movie.type === 'movie' && Number(movie.year) < 2000) {
      classic.push(movie)
    }
  })

  // remove duplicate data if any
  newSeries = removeDuplicat(newSeries)
  newMovies = removeDuplicat(newMovies)
  classic = removeDuplicat(classic)

  // render home with all data
  res.render('home', {user: false, series: newSeries, movies: newMovies, classic: classic});
});


// get one movie by id with its comments
router.get('/movies/:id', async (req, res) => {
  try{
    const movie = await Movie.findOne({
      where: {
        id: req.params.id
      }
    })
    const detailedMovie = await axios.get(`http://www.omdbapi.com/?t=${movie.title}&apikey=${process.env.OMDB_API_KEY}`)
    detailedMovie.data.id = req.params.id
    res.status(200).render('movie-details', {movie: detailedMovie.data})
  }catch(error){
    res.status(500).json(error.message)
  }
});

module.exports = router;