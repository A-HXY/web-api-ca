import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './db';
import defaultErrHandler from './errHandler'
import authenticate from './authenticate';
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import reviewsRouter from './api/reviews';
import favouritesRouter from './api/favourites';
import watchlistRouter from './api/watchlist';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);

app.use('/api/favourites', authenticate, favouritesRouter);
app.use('/api/watchlist', authenticate, watchlistRouter);

app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
