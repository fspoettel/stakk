import got from 'got';

export default got.extend({
  prefixUrl: 'https://api.spotify.com/v1/',
  headers: {
    Accept: 'application/json',
  },
});
