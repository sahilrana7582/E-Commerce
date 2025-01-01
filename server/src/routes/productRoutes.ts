import express from 'express';
import {
  loadUser,
  logout,
  signIn,
  signUp,
} from '../controllers/authControllers/authcontroller';
import { isAuth } from '../middlewares/isAuth';
import {
  addAddress,
  addNewProduct,
  getAllProducts,
} from '../controllers/productControllers/productController';
const productRoutes = express.Router();

productRoutes.route('/add').post(addNewProduct);
productRoutes.route('/').get(getAllProducts);
productRoutes.route('/address').post(isAuth, addAddress);

export default productRoutes;
