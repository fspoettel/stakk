import got from 'got';
import { authTokenApp } from './auth';

type TokenResponse = {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
};

type Token = {
  accessToken: string;
  tokenType: 'bearer';
  expiresIn: number;
};

function getAccessToken(): Promise<Token> {
  return got
    .post<TokenResponse>('https://accounts.spotify.com/api/token', {
      headers: {
        Authorization: authTokenApp(),
      },
      form: {
        grant_type: 'client_credentials',
      },
      resolveBodyOnly: true,
      responseType: 'json',
    })
    .then((res) => ({
      accessToken: res.access_token,
      tokenType: res.token_type,
      expiresIn: res.expires_in,
    }));
}

export default getAccessToken;
