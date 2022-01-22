const router = require('express').Router();
const axios = require('axios')
const authenticate = require('./authentication')
const { Movie, WatchList } = require('../../models');

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
  res.render('home', {user: req.session.userId, series: newSeries, movies: newMovies, classic: classic});
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
    res.status(200).render('movie-details', {user: req.session.userId, movie: detailedMovie.data})
  }catch(error){
    res.status(500).json(error.message)
  }
});


// get a users watchlisted movies
router.get('/watchlist/:user_id', authenticate, async (req, res) => {
  try{
    const watchlist = await WatchList.findAll({
      where:{user_id: req.params.user_id},
      include: [{model: Movie}],
      raw: true
    })
    res.status(200).render('watchlist', {user: req.session.user, watchlist: watchlist, userName: req.session.userName})
  }catch(error){
    res.status(500).json(error.message)
  }
});

// add movie to the watchlist
router.post('/watchlist', authenticate, async (req, res) => {
  try{
    await WatchList.create(req.body)
    res.status(200).redirect(`/watchlist/${req.session.userId}`)
  }catch(error){
    res.status(500).json(error.message)
  }
});

// delete a movie from the watchlist, user get because html forms do not support delete.
router.post('/watchlist/delete/:id', authenticate, async (req, res) => {
  try{
    await WatchList.destroy({
      where:{id:req.params.id}
    })
    res.status(200).redirect(`/watchlist/${req.session.userId}`)
  }catch(error){
    res.status(500).json(error.message)
  }
});

router.get('/watchlist', authenticate, async (req, res) => {
  try{
    const watchlist = await WatchList.findAll()
    res.status(200).json(watchlist)
  }catch(error){
    res.status(500).json(error.message)
  }
});

module.exports = router;