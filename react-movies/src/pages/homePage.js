import React, { useState } from "react";
import { useQuery } from 'react-query';
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const HomePage = (props) => {
  const [page, setPage] = useState(1); 

  const { data, error, isLoading, isError } = useQuery(
    ['discover', page], 
    () => getMovies(page), {
    keepPreviousData: true, 
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const addToFavorites = (movieId) => {
    const userId = "exampleUserId";
    fetch('http://localhost:8080/api/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        movieId,
        movieTitle: movies.find((movie) => movie.id === movieId).title,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Failed to add to favorites");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Movie added to favorites', data);
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error.message);
      });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={data.total_pages}  
          page={page}               
          onChange={handlePageChange} 
          color="primary"            
          siblingCount={1}           
          boundaryCount={2}          
        />
      </Box>
    </div>
  );
};

export default HomePage;