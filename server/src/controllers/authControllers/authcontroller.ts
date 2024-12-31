import { Request, Response } from 'express';
import { signInSchema, signUpSchema } from '../../schemaValidations/userSchema';
import { prisma } from '../../prisma';
import { comparePassword, hashPassword } from '../../utils/bcrypt';
import { generateToken } from '../../utils/generateToken';

export const signUp = async (req: Request, res: Response) => {
  try {
    const isSafe = signUpSchema.safeParse(req.body);

    if (!isSafe.success) {
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const { email, firstName, lastName, password } = isSafe.data;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    res.status(200).json({ message: 'User Created Successfully', user });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const isSafe = signInSchema.safeParse(req.body);
    if (!isSafe.success) {
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const { email, password } = isSafe.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (!(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Un-Authorized User' });
    }

    user.password = '';

    generateToken(user, res);
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const loadUser = (req: Request, res: Response) => {
  //@ts-ignore
  res.status(200).json({ user: req.user });
};
