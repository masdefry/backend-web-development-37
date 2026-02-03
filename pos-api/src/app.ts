import express, { type Express } from 'express';
import menuRouter from './routers/menu.router';

const app: Express = express();
const port = 8080;
app.use(express.json());

app.use('/api/menus', menuRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
