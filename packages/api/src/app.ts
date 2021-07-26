import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import asyncHandler from './lib/asyncHandler';
import postSpotifyUrl from './routes/postSpotifyPlaylist';
import postMixcloudShow from './routes/postMixcloudShow';
import { errorHandler } from './lib/errorHandler';

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.use(cors({
  origin: process.env.APP_URL
}));

app.post('/api/v1/spotify_playlist', asyncHandler(postSpotifyUrl));
app.post('/api/v1/mixcloud_show', asyncHandler(postMixcloudShow));

app.use(errorHandler);

export default app;
