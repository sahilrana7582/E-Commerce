import { Request, Response } from 'express';
import { productSchema } from '../../schemaValidations/productSchema';
import { prisma } from '../../prisma';

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    const isSafe = productSchema.safeParse(req.body);
    if (!isSafe.success) {
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const { name, description, category, subCategory, price, sizes, seller } =
      isSafe.data;

    const product = await prisma.productDetail.create({
      data: {
        name,
        description,
        category,
        subCategory,
        price,
        sizes,
        seller,
      },
    });
    res.status(201).json({
      message: 'Product added successfully',
      product,
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
