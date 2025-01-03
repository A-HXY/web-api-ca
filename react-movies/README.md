# Assignment 1 - ReactJS app.

Student Name: Xinyue Huang
Student Number: 20109224

## Overview.

[A brief statement on the content of this repository.]
This repository is a ReactJS movie application which references data from the TMDB API, allowing users to explore, write reviews, rate, and manage the movies they like and want to watch, view detailed information about movies and actors, filter movies by rating, and discover upcoming, now-playing and popular movies. This app includes responsive UI layout, using material UI component to integrated features such as pagination. It is authenticated by a third-party service that allows users to log in and add movies to their favorite lists and watch lists.

### Features.
[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features) .]
 
+ Add Popular Movie page.
+ Add Now-Playing Movie page.
+ Implement paging function in Home page, Upcoming Movie page, Popular Movie page, Now-Playing Movie page and modify API.
+ Add Watch List page.
+ Add Actor Details page and realize movie details contains links to actors; actor details links to movies.
+ Implement third-party authentication to allow users's login and logout.
+ Favourite page and watchlist page can be acquired after login authentication.
+ Polish Favourite page and watchlist page to realize Editing function.
+ Add some buttons to implement the jump between pages.
+ Use new Material UI components such as Pagination, Typography, Drawer, select, etc.
+ Add Rating filter and opions to sort by rating.

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

+ Upcoming movies - movie/upcoming
+ Now playing movies - movie/nowplaying
+ Popular movies - movie/popular
+ Actor Details - actor/:id
+ Actor image - actor/:id/image
+ Actor movie credits - actor/:id/movielist
+ Request token - authentication/token
+ Create session - authentication/session
+ Account details - account
+ Favourite movies - account/favourite
+ Watchlist movies - account/watchlist
+ Toggle favorite - account/favourite(POST)
+ Toggle watchlist - account/watchlist(POST)

## Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ /movies/favourite - displays all the movies added in favourite list - require authentication
+ /movies/upcoming - displays all upcoming movies - public
+ /movies/nowplaying - displays all now playing movies. - public
+ /movies/popular - displays all popular movies - public
+ /actors/:id - displays an actor's detail - public
+ /login - displays a login form - public
+ /movies/watchlist - displays all the movies added in watchlist - require authentication

## Independent learning (If relevant).

I learned how to implement the third-party authentication.
https://www.linkedin.com/advice/0/what-pros-cons-using-third-party-authentication-services
https://developer.themoviedb.org/reference/intro/authentication

I learned how to storage data in frontend.  
https://blog.csdn.net/yyp0304Devin/article/details/104011036?
