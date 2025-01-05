import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const sessionId = sessionStorage.getItem("sessionId");
        const response = await fetch("http://localhost:8080/api/favourites", {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch favorite movies.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (favorites.length === 0) {
    return <p style={{ textAlign: "center" }}>You have no favorite movies yet!</p>;
  }
  const toDo = () => true;

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={favorites}
      action={(movie) => {
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
      }}
    />
  );
};

export default FavoriteMoviesPage;