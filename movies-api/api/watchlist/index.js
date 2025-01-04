import express from 'express';
import asyncHandler from 'express-async-handler';
import Watchlist from './watchlistModel';

const router = express.Router();

// Get Watchlist
router.get('/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const watchlist = await Watchlist.find({ userId });
    res.status(200).json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Failed to fetch watchlist', error: error.message });
  }
}));

// Add to Watchlist
router.post('/', asyncHandler(async (req, res) => {
  const { userId, movieId, movieTitle } = req.body;
  if (!userId || !movieId || !movieTitle) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const existingEntry = await Watchlist.findOne({ userId, movieId });
    if (existingEntry) {
      return res.status(409).json({ message: 'Movie already in watchlist' });
    }
    const newEntry = new Watchlist({ userId, movieId, movieTitle });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Failed to add to watchlist', error: error.message });
  }
}));

// Delete from Watchlist 
router.delete('/:userId/:movieId', asyncHandler(async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const removedEntry = await Watchlist.findOneAndDelete({ userId, movieId });
    if (!removedEntry) {
      return res.status(404).json({ message: 'Watchlist entry not found' });
    }
    res.status(200).json({ message: 'Removed from watchlist', entry: removedEntry });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ message: 'Failed to remove from watchlist', error: error.message });
  }
}));

module.exports = router;
