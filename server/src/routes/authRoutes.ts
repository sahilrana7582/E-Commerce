import express from 'express';
import {
  allusers,
  loadUser,
  logout,
  signIn,
  signUp,
} from '../controllers/authControllers/authcontroller';
import { isAuth } from '../middlewares/isAuth';
const authRoutes = express.Router();

authRoutes.route('/signup').post(signUp).get(allusers);
authRoutes.route('/signin').post(signIn);
authRoutes.route('/logout').post(logout);

authRoutes.route('/load').get(isAuth, loadUser);

export default authRoutes;
