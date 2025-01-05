import React, { useState, useEffect, createContext } from "react";
import { getWatchlistMovies, toggleWatchlist } from '../api/tmdb-api';
import {fetchFavorite,addToFavorite} from '../api/web-api';

export const MoviesContext = createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);

  const token = sessionStorage.getItem("sessionId");
  const username = sessionStorage.getItem("username");

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      setFavorites((prev) => [...prev, movie.id]);
      addToFavorite(username, movie.id, token) 
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((id) => id !== movie.id));
    
  };

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (token) {
          const data = await fetchFavorite(username,token);
          setFavorites(data.map((movie) => movie.id));
        }
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, [token]);

  const addToWatchlist = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      setMustWatch((prev) => [...prev, movie.id]);
      toggleWatchlist(token, movie.id, true)
        .catch((error) => console.error("Error adding to watchlist:", error));
    }
  };

  const removeFromWatchlist = (movie) => {
    setMustWatch((prev) => prev.filter((id) => id !== movie.id));
    toggleWatchlist(token, movie.id, false)
      .catch((error) => console.error("Error removing from watchlist:", error));
  };

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        if (token) {
          const data = await getWatchlistMovies(token);
          setMustWatch(data.results.map((movie) => movie.id));
        }
      } catch (error) {
        console.error("Error fetching watchlist movies:", error);
      }
    };
    fetchWatchlistMovies();
  }, [token]);

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