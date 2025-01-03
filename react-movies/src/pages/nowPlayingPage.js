import React, { useState } from "react";
import { useQuery } from "react-query";
import { getNowPlaying } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const NowPlayingPage = (props) => {
  const [page, setPage] = useState(1); 

  const { data, error, isLoading, isError } = useQuery(
    ["nowplaying", page], 
    () => getNowPlaying(page),
    {
      keepPreviousData: true, 
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  return (
    <div>
      <PageTemplate
        title="Now Playing Movies"
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />;
        }}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={data.total_pages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary"
        />
      </Box>
    </div>
  );
};

export default NowPlayingPage;