import express, { Request, Response } from 'express';
import fs from 'fs'; // File System

const port: number = 8000;

const app = express();

// Body Parser (Middleware yang digunakan untuk meng-handle req.body)
app.use(express.json());

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

app.post('/products', (req: Request, res: Response) => {
  try {
    const { name, price, stocks, unit } = req.body;
    const products: any = fs.readFileSync('src/db/products.json'); // Buffer
    const productsJSON = JSON.parse(products); // Buffer -> Object JS

    const isProductExist = productsJSON.find((product: any) => {
      return product?.name === name;
    });
    if (isProductExist) {
      return res.status(409).json({
        success: false,
        message: 'Product already exist',
        data: {
          name,
          price,
          stocks,
          unit,
        },
      });
    }

    productsJSON.push({ id: new Date().getTime(), name, price, stocks, unit });
    fs.writeFileSync('src/db/products.json', JSON.stringify(productsJSON));

    res.status(201).json({
      success: true,
      message: 'Create product successfully',
      data: {
        name,
        price,
        stocks,
        unit,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/products', (req: Request, res: Response) => {
  try {
    const products: any = fs.readFileSync('src/db/products.json'); // Buffer
    const productsJSON = JSON.parse(products); // Buffer -> Object JS

    res.status(200).json({
      success: true,
      message: 'Get products successfull',
      data: productsJSON,
    });
  } catch (error) {
    console.log(error);
  }
});

app.put('/products/:productId', (req: Request, res: Response) => {
  try {
    const productId = req?.params?.productId;
    const { name, price, stocks, unit } = req?.body;

    const products: any = fs.readFileSync('src/db/products.json'); // Buffer
    const productsJSON = JSON.parse(products); // Buffer -> Object JS
    // Step-01 Find index dari productId
    const findIndexProduct = productsJSON?.findIndex((product: any) => {
      return product?.id == productId;
    });

    productsJSON[findIndexProduct] = {
      id: productId, 
      name,
      price,
      stocks,
      unit,
    };

    // Write File
    // Send Response
  } catch (error) {
    console.log(error);
  }
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
