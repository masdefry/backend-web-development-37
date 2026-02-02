import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { openRouter } from './config/open-router.config';

dotenv.config();

const port: number = 8000;

const app = express();

app.use(express.json());

app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages } = req.body;

  const response = await openRouter.chat.send({
    model: 'openai/gpt-3.5-turbo',
    messages,
    stream: false,
  });

  res.status(200).json({
    success: true,
    message: 'Success',
    data: {
      message: response?.choices[0]?.message,
    },
  });
});

// Centralized Error
// Error Exception Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.expose === true ? err.statusCode : 500;
  //   const message = err.expose === true ? err.message : 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message: err?.message,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Application Running on Port ${port}`);
});
