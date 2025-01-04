import reviewModel from './reviewModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getReviews} from '../tmdb-api';

const router = express.Router();

// Get all reviews from database
router.get('/', asyncHandler(async (req, res) => {
  try {
    const reviews = await reviewModel.find(); 
    res.status(200).json(reviews);
  } catch (error) {
    console.error(`Error fetching all reviews: ${error.message}`);
    res.status(500).json({ message: 'Failed to get all reviews', error: error.message });
  }
}));

//Get movies' reviews from TMDB API
router.get('/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    try {
      const reviews = await getReviews(movieId);
      res.status(200).json(reviews);
    } catch (error) {
      console.error(`Error fetching reviews for movieId ${movieId}: ${error.message}`);
      res.status(500).json({ message: 'Failed to get all reviews', error: error.message });
    }
}));

// Add new review
router.post('/', asyncHandler(async (req, res) => {
  const { movieId, author, content, rating } = req.body;

  if (!movieId || !author || !content || rating === undefined) {
    return res.status(400).json({ message: 'The request body is missing required fields' });
  }

  try {
    const newReview = new reviewModel({ movieId, author, content, rating, createdAt: new Date() });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(`Error adding new review: ${error.message}`);
    res.status(500).json({ message: 'Failed to add a comment', error: error.message });
  }
}));

// Delet review
router.delete('/:reviewId', asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deletedReview = await reviewModel.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted', review: deletedReview });
  } catch (error) {
    console.error(`Error deleting review with id ${reviewId}: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
}));

export default router;
