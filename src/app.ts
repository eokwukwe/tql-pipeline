import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4001;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running port ${port}`);
});
