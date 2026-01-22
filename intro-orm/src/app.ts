import express, { NextFunction, Request, Response } from 'express';
import usersRouter from './routers/users.router';
import 'dotenv/config';
import cors from 'cors'; // npm i --save-dev @types/cors

const port: number = 8000;

const app = express();

/* All origin */
app.use(cors());

app.use(express.json());

app.use('/api/users', usersRouter);

// Centralized Error
// Error Exception Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.expose === true? err.statusCode : 500;
  const message = err.expose === true? err.message : 'Something went wrong'
  
  res.status(statusCode).json({
    success: false, 
    message, 
    data: null
  })
})

app.listen(port, () => {
  console.log(`Application Running on Port ${port}`);
});
