# Assignment 2 - Web API.

Name: Xinyue Huang

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Add to favourite movies
 + Get favourite movies list 
 + Delete from favourite movies 
 + Add to watchlist
 + Get favourite watchlist
 + Delete from watchlist
 + Add review
 + Fully integrated APIs, all fetches from frontend app go to the web-api
 + Simple signup and login authentication
 + Favourite and watchlist routes are protected.
 + Improved validation of usernames/passwords; error messages displayed on frontend 


## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REACT_APP_TMDB_KEY=873734c393c6f652f83f196df28d673f
FAST_REFRESH=false

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://Xinyue:Hxy030228@tasky.mekwt.mongodb.net/tasky?retryWrites=true&w=majority&appName=tasky
TMDB_KEY=873734c393c6f652f83f196df28d673f
SECRET=ilikecake
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieId} | GET | Get movie details
- /api/movies/tmdb/upcoming | GET | Get Upcoming movies
- /api/movies/tmdb/genres | GET | Get movies' genres
- /api/movies/tmdb/now_playing | GET | Get NowPlaying movies
- /api/movies/search | GET | Search movies
- /api/movies//movies/search/{title} | GET | Search movies by title
- /api/movies/tmdb/popular | GET | Get popular movies
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/reviews | GET | Get all reviews from database
- /api/reviews/{movieId} | GET | Get movies' reviews from TMDB 
- /api/reviews | POST | Add new review
- /api/reviews/{reviewId} | DELETE| Delet review
- /api/users | GET | Get all users
- /api/users | POST | Register (Create) / Authenticate User
- /api/users/{userId} | PUT | Update a user
- /api/users/profile | GET | Get current user's profile
- /api/favourites/{username} | GET | Get all favourite movies for a specific user
- /api/favourites/{username} | POST | Add a movie to favourites
- /api/favourites/{username} | DELETE | Delete a movie from favourites
- /api/watchlist/{userId} | GET | Get Watchlist
- /api/watchlist | POST | Add to Watchlist
- /api/watchlist/{username}/{movieid} | DELETE | Delete from Watchlist 

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

After login, the API use JWT authentication to generate a token to store in Sessionstorage.

- /api/users
- /api/users/{userId} | PUT | Update a user
- /api/favourites/{username} | GET | Get all favourite movies for a specific user
- /api/favourites/{username} | POST | Add a movie to favourites
- /api/favourites/{username} | DELETE | Delete a movie from favourites
- /api/watchlist/{userId} | GET | Get Watchlist
- /api/watchlist | POST | Add to Watchlist
- /api/watchlist/{username}/{movieid} | DELETE | Delete from Watchlist 

Favourite and watchlist routes are protected, they are only visible when logged in.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

In assignment2, I create users, movies, favourites, reviews, watchlist database and write the API of them in get, post, delete, put.
In assignment1, I use third authentication, but in assignment2, instead, I use JWT token to do the authentication and add the signupPage and loginPage. Additionally, I use fetchAPI function to fetch the movies and users API in the back-end, instead of the previously used TMDB API.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   

ProtectedRoute:
https://www.angularminds.com/blog/protected-routes-in-react-router-authentication-and-authorization