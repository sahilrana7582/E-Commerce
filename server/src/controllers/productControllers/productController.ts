import { Request, Response } from 'express';
import {
  AddressType,
  orderSchema,
  productSchema,
  ProductType,
} from '../../schemaValidations/productSchema';
import { prisma } from '../../prisma';
import { ProductDetail } from '@prisma/client';

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

export const productDetail = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await prisma.productDetail.findUnique({
      where: {
        id: productId,
      },
    });

    res.status(201).json({
      message: 'Product Detail',
      product,
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const orderProduct = async (req: Request, res: Response) => {
  try {
    const isSafe = orderSchema.safeParse(req.body);
    if (!isSafe.success) {
      console.log(isSafe.error);
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const { buyer, quantity, shippingAddress, totalAmount, productId } =
      isSafe.data;

    const order = await prisma.order.create({
      data: {
        productId,
        quantity,
        totalAmount,
        status: 'ORDERED',
        buyer,
        shippingAddress,
      },
    });
    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const allOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        product: {
          select: {
            name: true,
            description: true,
            price: true,
            sizes: true,
            seller: true,
            bestSeller: true,
          },
        },
        shippingInfo: {
          select: {
            city: true,
            country: true,
            pincode: true,
            phoneNumber: true,
            state: true,
            streetName: true,
          },
        },
        buyerInfo: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.status(201).json({
      message: 'Order placed successfully',
      orders,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const bestSellersProducts = async (req: Request, res: Response) => {
  try {
    console.log('Running');
    const products = await prisma.productDetail.findMany({
      where: {
        bestSeller: true,
      },
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(201).json({
      message: 'Best Sellers',
      length: products.length,
      products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
