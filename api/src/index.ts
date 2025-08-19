import express from "express";
import productRoutes from './routes/products';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!!!!!');
});

app.use('/products',productRoutes);

app.listen(port,() => {
  console.log('Server is running on port 3000');
});