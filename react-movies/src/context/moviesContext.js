import React, { useState, useEffect, createContext } from "react";
import { 
  getFavouriteMovies, 
  getWatchlistMovies, 
  toggleFavorite, 
  toggleWatchlist 
} from '../api/tmdb-api';

export const MoviesContext = createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);

  const sessionId = sessionStorage.getItem("sessionId");

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      setFavorites((prev) => [...prev, movie.id]);
      toggleFavorite(sessionId, movie.id, true)
        .catch((error) => console.error("Error adding to favorites:", error));
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((id) => id !== movie.id));
    toggleFavorite(sessionId, movie.id, false)
      .catch((error) => console.error("Error removing from favorites:", error));
  };

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (sessionId) {
          const data = await getFavouriteMovies(sessionId);
          setFavorites(data.results.map((movie) => movie.id));
        }
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, [sessionId]);

  const addToWatchlist = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      setMustWatch((prev) => [...prev, movie.id]);
      toggleWatchlist(sessionId, movie.id, true)
        .catch((error) => console.error("Error adding to watchlist:", error));
    }
  };

  const removeFromWatchlist = (movie) => {
    setMustWatch((prev) => prev.filter((id) => id !== movie.id));
    toggleWatchlist(sessionId, movie.id, false)
      .catch((error) => console.error("Error removing from watchlist:", error));
  };

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        if (sessionId) {
          const data = await getWatchlistMovies(sessionId);
          setMustWatch(data.results.map((movie) => movie.id));
        }
      } catch (error) {
        console.error("Error fetching watchlist movies:", error);
      }
    };
    fetchWatchlistMovies();
  }, [sessionId]);

  const addReview = (movie, review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
  };

  const contextValue = {
    favorites,
    mustWatch,
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
    addReview,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;