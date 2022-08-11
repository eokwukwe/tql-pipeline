import dayjs from 'dayjs';
import dotenv from 'dotenv';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import express, { Express, Request, Response } from 'express';

const rateLimit = require('express-rate-limit');

dotenv.config();
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

const app: Express = express();
const port = process.env.PORT || 4001;
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
});

type RequestWithQuery = Request<{}, {}, {}, { dob: string }>;

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json('TalentQL Pipeline Program Backend Assessment');
});

app
  .use(limiter)
  .get('/howold', async (req: RequestWithQuery, res: Response) => {
    const timestampRegex = /^[0-9]*$/;
    const { dob } = req.query;
    const possibleDateFormats = [
      'DD-MM-YYYY',
      'MM-DD-YYYY',
      'YYYY-MM-DD',
      'YYYY-DD-MM',
    ];

    if (!dob) {
      return res.status(400).json({ error: 'dob query param is required' });
    }

    let dateOfBirth: string | number;

    if (timestampRegex.test(dob)) {
      // If the dob is a unix timestamp covert it to number
      dateOfBirth = Number(dob);

      if (!dayjs(dateOfBirth).isValid()) {
        return res
          .status(400)
          .json({ error: 'dob query param is not a valid date or timestamp' });
      }
    } else {
      dateOfBirth = dob;

      // Strict check for date using the possibleDateFormats
      // https://day.js.org/docs/en/parse/is-valid
      if (!dayjs(dateOfBirth, possibleDateFormats, true).isValid()) {
        return res
          .status(400)
          .json({ error: 'dob query param is not a valid date or timestamp' });
      }
    }

    return res.status(200).json({ age: dayjs(dateOfBirth).fromNow(true) });
  });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running port ${port}`);
});
