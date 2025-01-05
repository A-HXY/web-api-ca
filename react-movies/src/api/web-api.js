const BASE_URL = "http://localhost:8080/api";

export const fetchFavorite = async (username, token) => {
  const response = await fetch(`${BASE_URL}/favourites/${username}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch favorite movies.");
  }

  return response.json();
};

export const addToFavorite = async (username, movieId, token) => {
  const response = await fetch(`${BASE_URL}/favourites/${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({movieId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to favorites.");
  }

  return response.json();
};

export const fetchMovies = async (page) => {
  const response = await fetch(`${BASE_URL}/movies?page=${page}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch movies.");
  }
  return response.json();
};
