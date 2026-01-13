import express, { NextFunction, Request, Response } from 'express';
import productRouter from './routers/products.router';
import actorRouter from './routers/actor.router';
import poolConnection from './config/pool-connection.config';

const port: number = 8000;

const app = express();

// Body Parser (Middleware yang digunakan untuk meng-handle req.body)
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Application Level Middleware');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, World!',
  });
});

app.get('/test', (req: Request, res: Response) => {
  try {
    const isError = true;
    if (isError) {
      throw { status: 400, message: 'Error Self!' };
    }

    res.status(200).json({
      message: 'Test Completed1!',
    });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      message: error?.message || 'Test Failed',
    });
  }
});

app.use('/api/products', productRouter);
app.use('/api/actors', actorRouter);

poolConnection.connect((err, client, release) => {
  if (err) return console.log(`Connection error ${err}`);

  console.log(`Connection successfull`);

  release();
});

app.listen(port, () => {
  console.log(`Application Running on Port ${port}`);
});

// CRUD (Create, Read, Update, Delete)

// Ada 3 method req untuk mengambil data dari request client:
// 1. req.body      -> Client mengirimkan data lewat body JSON
// 2. req.params    -> Client mengirimkan data lewat URL Params -> /products/:id /products/1
// 3. req.query     -> Client mengirimkan data lewat URL Query  -> /products?name=IndomieGoreng

/*
    PUT : Mengharuskan mengirim semua data yang akan di update
    PATCH: Tidak diharuskan mengirim semua data


    {
        name: ..., 
        price: ..., 
        stock: ..., 
        unit: ...
    }
*/
