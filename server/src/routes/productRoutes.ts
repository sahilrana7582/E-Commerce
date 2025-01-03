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
  allOrders,
  bestSellersProducts,
  filterProducts,
  getAllProducts,
  orderProduct,
  productDetail,
} from '../controllers/productControllers/productController';
const productRoutes = express.Router();

productRoutes.route('/add').post(addNewProduct);
productRoutes.route('/').get(getAllProducts).get(filterProducts);
productRoutes.route('/collection/').get(filterProducts);

productRoutes.route('/bestSellers').get(bestSellersProducts);

productRoutes.route('/order').post(orderProduct).get(allOrders);

productRoutes.route('/:id').get(productDetail);
productRoutes.route('/address').post(isAuth, addAddress);

export default productRoutes;
