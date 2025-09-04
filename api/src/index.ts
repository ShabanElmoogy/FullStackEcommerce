import express, { json, urlencoded } from "express";
import productRoutes from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';

const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log('Server is running on port 3000');
});