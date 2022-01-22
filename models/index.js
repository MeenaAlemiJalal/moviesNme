const User = require('./User');
const Movie = require('./Movie');
const WatchList = require('./WatchList');



WatchList.belongsTo(Movie, {
  foreignKey: 'movie_id'
})

Movie.hasMany(WatchList, {
  foreignKey: 'movie_id',
  as: 'watchlist',
  onDelete: 'CASCADE'
})

User.hasMany(WatchList,{
  foreignKey:'user_id',
  as: 'watchlist',
  onDelete: 'CASCADE'
})

WatchList.belongsTo(User, {
  foreignKey: 'user_id',
})

module.exports = { User, Movie, WatchList };