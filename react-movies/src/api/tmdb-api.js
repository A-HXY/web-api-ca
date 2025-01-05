export const getMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies?page=${page}`
  ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = ({queryKey}) => {
  //console.log(args)
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getGenres = () => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/genres`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error 
 });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getMovieReviews = (movieId) => {
  return fetch(`http://localhost:8080/api/reviews/${movieId}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getUpcomingMovies = (page) => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/upcoming?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error;
  });
};

export const getPopularMovies = (page) => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/popular?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error;
  });
};

export const getNowPlaying = (page) => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/now_playing?Page=${page}`
  ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieActors = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getActors = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getActorCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getRequestToken = () => {
  return fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong while fetching the request token");
        });
      }
      return response.json();
  })
  .then((data) => {
    if (!data.request_token) {
      throw new Error("Failed to retrieve request token");
    }
    return data.request_token;
  })
  .catch((error) => {
      throw error;
  });
};

export const createSession = (requestToken) => {
  return fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`, 
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ request_token: requestToken })
      }
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong while creating the session");
            });
        }
        return response.json();
    }).then((data) => {
        if (!data.session_id) {
          throw new Error("Failed to retrieve session ID");
        }
        return data.session_id;
    })
    .catch((error) => {
      throw error;
    });
};

export const getFavouriteMovies = (userId) => {
  return fetch(
    `http://localhost:8080/api/favourites/${userId}`
     ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getWatchlistMovies = (userId) => {
  return fetch(
    `http://localhost:8080/api/watchlist/${userId}`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const toggleFavorite = (sessionId, movieId, isFavorite) => {
  return fetch(
    `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite: isFavorite, 
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status_code) {
        throw new Error(data.status_message || "Something went wrong");
      }
      return data;
    })
    .catch((error) => {
      console.error("Error toggling favorite:", error);
      throw error;
    });
};

export const toggleWatchlist = (sessionId, movieId, isWatchlist) => {
  return fetch(
    `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: isWatchlist, 
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status_code) {
        throw new Error(data.status_message || "Something went wrong");
      }
      return data;
    })
    .catch((error) => {
      console.error("Error toggling watchlist:", error);
      throw error;
    });
};