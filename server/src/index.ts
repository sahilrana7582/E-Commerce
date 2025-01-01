import express from 'express';
import dotenv from 'dotenv';
import { prisma } from './prisma';
import authRoutes from './routes/authRoutes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/product', productRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
