import dayjs from 'dayjs';
import dotenv from 'dotenv';
import relativeTime from 'dayjs/plugin/relativeTime';
import express, { Express, Request, Response } from 'express';

dotenv.config();
dayjs.extend(relativeTime);

const app: Express = express();
const port = process.env.PORT || 4001;

type RequestWithQuery = Request<{}, {}, {}, { dob: string }>;

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json('TalentQL Pipeline Program Backend Assessment');
});

app.get('/howold', async (req: RequestWithQuery, res: Response) => {
  const { dob } = req.query;

  if (!dob) {
    return res.status(400).json({ error: 'dob query param is required' });
  }

  if (isNaN(Number(dob))) {
    return res
      .status(400)
      .json({ error: 'dob query param is not a valid timestamp' });
  }

  return res.status(200).json({ age: dayjs(Number(dob)).fromNow(true) });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running port ${port}`);
});
