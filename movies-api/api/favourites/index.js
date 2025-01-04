import Favourite from './favouriteModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import authenticate from '../../authenticate';

const router = express.Router();

// Get all favourite movies for a specific user
router.get('/', authenticate, asyncHandler(async (req, res) => {
    const userId = req.user._id;
    console.log(`Fetching favourites for userId: ${userId}`);
    try {
      const favourites = await Favourite.find({ userId });
      console.log(`Found favourites: ${JSON.stringify(favourites)}`);
      res.status(200).json(favourites);
    } catch (error) {
      console.error('Error fetching favourite movies:', error);
      res.status(500).json({ message: 'Failed to get favourite movies', error: error.message });
    }
  }));

// Add a movie to favourites
router.post('/', authenticate, asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { movieId, movieTitle } = req.body;
  
    if (!movieId || !movieTitle) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const existingFavourite = await Favourite.findOne({ userId, movieId });
        if (existingFavourite) {
            return res.status(409).json({ message: 'Movie already in favourites' });
        }
      const newFavourite = new Favourite({ userId, movieId, movieTitle });
      await newFavourite.save();
      res.status(201).json(newFavourite);
    } catch (error) {
      console.error('Error adding favourite movie:', error);
      res.status(500).json({ message: 'Failed to add favourite movie', error: error.message });
    }
  }));
  
// Delete a movie from favourites
router.delete('/:movieId', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user._id;  
  const { movieId } = req.params;
    try {
      const deletedFavourite = await Favourite.findOneAndDelete({ userId, movieId });
      if (!deletedFavourite) {
        return res.status(404).json({ message: 'Favourite movie not found' });
      }
      res.status(200).json({ message: 'Favourite movie deleted', favourite: deletedFavourite });
    } catch (error) {
      console.error('Error deleting favourite movie:', error);
      res.status(500).json({ message: 'Failed to delete favourite movie', error: error.message });
    }
  }));

export default router;