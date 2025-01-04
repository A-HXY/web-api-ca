const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  userId: {
    type: String, 
    required: true,
  },
  movieId: {
    type: String, 
    required: true,
  },
  movieTitle: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date, 
    default: Date.now,
  },
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
module.exports = Watchlist;
