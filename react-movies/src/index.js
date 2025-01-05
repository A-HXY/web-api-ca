import AddMovieReviewPage from './pages/addMovieReviewPage'
import MoviesContextProvider from "./context/moviesContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import SiteHeader from './components/siteHeader'
import MovieReviewPage from "./pages/movieReviewPage";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingPage from "./pages/upcomingPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import PopularPage from "./pages/popularPage";
import ActorDetailsPage from './pages/actorDetailsPage';
import WatchListPage from './pages/watchlistPage';
import LoginPage from "./pages/loginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />}/>
            <Route path="/movies/watchlist" element={<WatchListPage />}/>
            <Route path="/" element={<HomePage />}/>
            <Route path="/movies/:id" element={<MoviePage />}/>
            <Route path="/movies/upcoming" element={<UpcomingPage />}/>
            <Route path="/movies/nowplaying" element={<NowPlayingPage />}/>
            <Route path="/movies/popular" element={<PopularPage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />}/>
            <Route path="/reviews/:id" element={<MovieReviewPage /> } />
            <Route path="/reviews/form" element={<AddMovieReviewPage /> } />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);