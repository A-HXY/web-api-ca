import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    const data = await response.json();
    return data; 
};

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getReviews = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) { 
            const errorData = await response.json();
            console.error(`TMDB API Error: ${errorData.status_message}`);
            throw new Error(errorData.status_message || "Failed to fetch reviews");
        }
        return await response.json();
    } catch (error) {
        console.error(`Error in getReviews: ${error.message}`);
        throw error;
    }
};

export const getKeywords = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPopularMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getNowPlaying = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};