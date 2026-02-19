import express, {
  type Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import menuRouter from './routers/menu.router';
import authRouter from './routers/auth.router';
import transactionRouter from './routers/transaction.router';
import cors from 'cors';
import { corsOptions } from './configs/cors.config';
import cookieParser from 'cookie-parser';
import { mainJobs } from './jobs/main.job';

const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// app.use('/api/menus', menuRouter);
app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionRouter);

mainJobs();

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.expose === true ? err.statusCode : 500;
  const message = err.expose === true ? err.message : 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
});

export default app;
