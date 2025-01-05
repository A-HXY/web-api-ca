const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  username: {
    type: String, 
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Favourite = mongoose.model('Favourite', FavouriteSchema);
module.exports = Favourite;
