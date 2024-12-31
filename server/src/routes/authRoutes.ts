import express from 'express';
import {
  loadUser,
  signIn,
  signUp,
} from '../controllers/authControllers/authcontroller';
import { isAuth } from '../middlewares/isAuth';
const authRoutes = express.Router();

authRoutes.route('/signup').post(signUp);
authRoutes.route('/signin').post(signIn);
authRoutes.route('/load').get(isAuth, loadUser);

export default authRoutes;
