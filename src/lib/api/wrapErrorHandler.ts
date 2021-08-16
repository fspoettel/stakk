import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from './errors';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const ERRORS = {
  INTERNAL: 'An internal server error has occured. Please try again later.'
};

export default function wrapErrorHandler(handler: Handler): Handler {
  return async (req, res) => {
    return handler(req, res)
      .catch((err) => {
        console.error(err);
        if (err instanceof ValidationError) {
          res.status(400);
          res.json({ error: err.message });
        } else {
          res.status(500);
          res.json({ error: ERRORS.INTERNAL });
        }
      });
  };
}