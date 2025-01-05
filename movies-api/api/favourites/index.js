import Favourite from './favouriteModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

// Get all favourite movies for a specific user
router.get('/:username', asyncHandler(async (req, res) => {
      const favourites = await Favourite.find(req.params);
      res.status(200).json(favourites);
}));

// Add a movie to favourites
router.post('/:username', asyncHandler(async (req, res) => {
      const { username } = req.params; 
      const { movieId } = req.body; 
  
      if (!username || !movieId) {
         return res.status(400).json({ success: false, msg: 'Username and MovieId are required.' });
      }
      const existingFavourite = await Favourite.findOne({ username, movieId });
      if (existingFavourite) {
        return res.status(401).json({ success: false, msg: 'It has already been in favourite list.'})
      }
  
      await Favourite.create({ username, movieId });
     res.status(201).json({ success: true, msg: 'Favourite successfully added.' });
  }));
  
// Delete a movie from favourites
router.delete('/:username', asyncHandler(async (req, res) => {
      const { username } = req.params;  
      const { movieId } = req.body;

      if (!username || !movieId) {
        return res.status(400).json({ success: false, msg: 'UserId and MovieId are required.' });
      }
      const existingFavourite = await Favourite.findOne({ username, movieId });
      if (!existingFavourite) {
        return res.status(404).json({ success: false, msg: 'Favourite movie not found' });
      }
      await Favourite.findOneAndDelete({ username, movieId });
      res.status(200).json({ success: true, msg: 'Favourite successfully deleted.' });
  }));

export default router;