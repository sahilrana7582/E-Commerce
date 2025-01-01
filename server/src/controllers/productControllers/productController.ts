import { Request, Response } from 'express';
import {
  AddressType,
  productSchema,
} from '../../schemaValidations/productSchema';
import { prisma } from '../../prisma';

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    const isSafe = productSchema.safeParse(req.body);
    if (!isSafe.success) {
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const {
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      seller,
      bestSeller,
    } = isSafe.data;

    const product = await prisma.productDetail.create({
      data: {
        name,
        description,
        category,
        subCategory,
        price,
        sizes,
        seller,
        bestSeller,
      },
    });
    res.status(201).json({
      message: 'Product added successfully',
      product,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.productDetail.findMany();
    res.status(201).json({
      message: 'All Products',
      products,
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  try {
    const isSafe = AddressType.safeParse(req.body);
    if (!isSafe.success) {
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const { city, country, phoneNumber, pincode, state, streetName } =
      isSafe.data;

    //@ts-ignore
    const userId = req.user.id;

    const address = await prisma.address.create({
      data: {
        city,
        country,
        phoneNumber,
        pincode,
        state,
        streetName,
        userId,
      },
    });
    res.status(201).json({
      message: 'Address added successfully',
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
