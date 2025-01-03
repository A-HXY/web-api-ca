import favouriteModel from './favouriteModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getFavourites} from '../tmdb-api';

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
  
module.exports = router;  