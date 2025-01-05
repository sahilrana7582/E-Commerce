import express from 'express';
import { isAuth } from '../middlewares/isAuth';
import {
  addAddress,
  getAddress,
} from '../controllers/productControllers/productController';
const addressRoutes = express.Router();

addressRoutes.route('/').post(isAuth, addAddress).get(isAuth, getAddress);

export default addressRoutes;
