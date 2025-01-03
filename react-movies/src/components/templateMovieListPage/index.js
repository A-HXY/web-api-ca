import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0); 
  const [sortOrder, setSortOrder] = useState("desc"); 
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return ratingFilter > 0 ? m.vote_average >= ratingFilter : true;  
    })
    .filter((m) =>{
      return ratingFilter > 0 ? m.vote_average >= ratingFilter : true
    });

    if (sortOrder === "desc") {
      displayedMovies = displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else {
      displayedMovies = displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
    }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(Number(value));
    else if (type === "sortOrder") setSortOrder(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid 
          key="find" 
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} 
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}  
            sortOrder={sortOrder}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
