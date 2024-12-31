import { User } from '@prisma/client';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (user: User, res: Response) => {
  const key: string | undefined = process.env.KEY;
  if (!key) {
    console.error('JWT secret key is not defined in environment variables.');
    throw new Error('Missing JWT secret key');
  }
  const token = jwt.sign(user, key, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PRODUCTION',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 100000,
  });

  res.status(200).json({
    success: true,
    message: 'Logged In',
  });
};
