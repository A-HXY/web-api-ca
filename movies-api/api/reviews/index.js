import reviewModel from './reviewModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getReviews} from '../tmdb-api';

const router = express.Router();

// Get all reviews
router.get('/:movieId', async (req, res) => {
    const { movieId } = req.params;
    try {
      const reviews = await getReviews(movieId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get all reviews', error: error.message });
    }
  });

// Add new review
router.post('/', async (req, res) => {
  const { movieId, author, content, rating } = req.body;

  if (!movieId || !author || !content || rating === undefined) {
    return res.status(400).json({ message: 'The request body is missing required fields' });
  }

  try {
    const newReview = new Review({ movieId, author, content, rating, createdAt: new Date() });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add a comment', error: error.message });
  }
});

// Delet review
router.delete('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted', review: deletedReview });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
});

module.exports = router;
