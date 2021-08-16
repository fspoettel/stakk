export function authTokenBearer(token: string) {
  return `Bearer ${token}`;
}

export function authTokenApp() {
  return `Basic ${Buffer.from(`${process.env.SPOTIFY_APP_KEY}:${process.env.SPOTIFY_APP_SECRET}`).toString('base64')}`;
}
