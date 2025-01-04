import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies} from '../tmdb-api';
import {getGenres} from '../tmdb-api';
import {getPopularMovies} from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/search', asyncHandler(async (req, res) => {
    const { query, genre } = req.query;
    const filter = {};

    if (query) {
        filter.title = { $regex: query, $options: 'i' }; 
    }
    if (genre) {
        filter.genre_ids = genre; 
    }

    const movies = await movieModel.find(filter);
    res.status(200).json(movies);
}));

//Search movies by title
router.get('/movies/search/:title', asyncHandler(async (req, res) => {
    const { title } = req.params;
    try {
      const movies = await searchMoviesByTitle(title); 
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search movies by title', error: error.message });
    }
  }));

//Fetch movies by genre
router.get('/movies/genre/:genreId', asyncHandler(async (req, res) => {
    const { genreId } = req.params;
    try {
      const movies = await getMoviesByGenre(genreId); 
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch movies by genre', error: error.message });
    }
  }));

//Get popular movies
router.get('/movies/popular', asyncHandler(async (req, res) => {
    try {
      const movies = await getPopularMovies(); 
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch popular movies', error: error.message });
    }
  }));  
    
export default router;
