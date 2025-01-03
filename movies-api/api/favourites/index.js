import favouriteModel from './favouriteModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getFavourites} from '../tmdb-api';

const router = express.Router();

// Get all favourite movies
router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
      const favourites = await getFavourites(userId);
      res.status(200).json(favourites);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get favourite movies', error: error.message });
    }
  }));


module.exports = router;  