import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import Slider from "@mui/material/Slider";

const FilterCard = (props) => {
  const { titleFilter, genreFilter, ratingFilter, onUserInput ,sortOrder} = props;

  const handleTextChange = (e) => {
    onUserInput("name", e.target.value);
  };

  const handleGenreChange = (e) => {
    onUserInput("genre", e.target.value);
  };

  const handleRatingChange = (e) => {
    onUserInput("rating", e.target.value);
  };

  const handleSortOrderChange = (e) => {
    onUserInput("sortOrder", e.target.value);
  };

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        
        <TextField
          sx={{ margin: 1, minWidth: "90%", backgroundColor: "rgb(255, 255, 255)" }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={titleFilter}
          onChange={handleTextChange}
        />
        
        <FormControl sx={{ margin: 1, minWidth: "90%", backgroundColor: "rgb(255, 255, 255)" }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genreFilter}
            onChange={handleGenreChange}
          >
            <MenuItem value="0">All</MenuItem>
          </Select>
        </FormControl>
        
        <Typography gutterBottom>Rating</Typography>
        <Slider
          value={ratingFilter}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}/10`}
          min={0}
          max={10}
          step={0.1}
        />
        <FormControl sx={{ margin: 1, minWidth: "90%", backgroundColor: "rgb(255, 255, 255)" }}>
          <InputLabel id="sortOrder-label">Sort By Rating</InputLabel>
          <Select
            labelId="sortOrder-label"
            id="sortOrder-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <MenuItem value="desc">Highest to Lowest</MenuItem>
            <MenuItem value="asc">Lowest to Highest</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
          sx={{ height: 300 }}
          image={img}
          title="Filter"
        />
    </Card>
  );
};

export default FilterCard;