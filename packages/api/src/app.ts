import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import asyncHandler from './lib/asyncHandler';
import getAccessToken from './services/spotify/getAccessToken';
import getPlaylist from './services/spotify/getPlaylist';
import { toImageUrl, toStackItem } from './lib/formatSpotifyPlaylist';
import storeImage from './services/backblaze/storeImage';
import getImage from './services/spotify/getImage';

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cors());

app.post('/api/v1/spotify_playlist', asyncHandler(async (req, res) => {
  const url: string = req.body.spotify_url;

  const now = Date.now();

  const { accessToken } = await getAccessToken();
  
  console.log('accessToken', Date.now() - now);
  
  const playlist = await getPlaylist(accessToken, url);

  console.log('playlist', Date.now() - now);

  const stackItem = toStackItem(playlist);
  const imageUrl = toImageUrl(playlist);

  if (!imageUrl) {
    res.status(400);
    res.json({ error: 'bad_request' });
    return;
  }


  const image = await getImage(imageUrl);
  console.log('image_fetch', Date.now() - now);

  const imageId = await storeImage(image);
  console.log('image_store', Date.now() - now);

  res.json({ ...stackItem, imageId });
}));

export default app;
