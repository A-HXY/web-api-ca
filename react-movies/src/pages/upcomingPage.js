import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const UpcomingPage = (props) => {
  const [page, setPage] = useState(1); 

  const { data, error, isLoading, isError } = useQuery(['upcoming', page], () => getUpcomingMovies(page), {
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
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />;
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

export default UpcomingPage;