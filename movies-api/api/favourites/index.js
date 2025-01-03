import Favourite from './favouriteModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

// Get all favourite movies
router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
      const favourites = await Favourite.find({ userId });
      res.status(200).json(favourites);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get favourite movies', error: error.message });
    }
  }));

// Add favourite movies
router.post('/', asyncHandler(async (req, res) => {
    const { userId, movieId, movieTitle } = req.body;
  
    if (!userId || !movieId || !movieTitle) {
      return res.status(400).json({ message: 'Request body is missing required fields' });
    }
  
    try {
      const newFavourite = new Favourite({ userId, movieId, movieTitle });
      await newFavourite.save();
      res.status(201).json(newFavourite);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add favourite movie', error: error.message });
    }
  }));
  
// Delete favourite movies
router.delete('/:userId/:movieId', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.params;
    try {
      const deletedFavourite = await Favourite.findOneAndDelete({ userId, movieId });
      if (!deletedFavourite) {
        return res.status(404).json({ message: 'Favourite movie not found' });
      }
      res.status(200).json({ message: 'Favourite movie deleted', favourite: deletedFavourite });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete favourite movie', error: error.message });
    }
  }));

module.exports = router;  