import { Request, Response } from 'express';
import fs from 'fs'; // File System

export const productsController = {
  create(req: Request, res: Response) {
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

      productsJSON.push({
        id: new Date().getTime(),
        name,
        price,
        stocks,
        unit,
      });
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
  },
  get(req: Request, res: Response) {
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
  },
  update(req: Request, res: Response) {
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
  },
  delete(req: Request, res: Response) {},
};
