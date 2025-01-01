import express from 'express';
import {
  loadUser,
  logout,
  signIn,
  signUp,
} from '../controllers/authControllers/authcontroller';
import { isAuth } from '../middlewares/isAuth';
import { addNewProduct } from '../controllers/productControllers/productController';
const productRoutes = express.Router();

productRoutes.route('/add').post(addNewProduct);

export default productRoutes;
