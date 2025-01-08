import { Request, Response } from 'express';
import {
  AddressType,
  OrderSchema,
  orderStatus,
  productSchema,
  ProductType,
} from '../../schemaValidations/productSchema';
import { prisma } from '../../prisma';
import { ProductDetail } from '@prisma/client';

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    const isSafe = productSchema.safeParse(req.body);

    if (!isSafe.success) {
      return res.status(410).json({ message: isSafe.error.errors[0].message });
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
      imgs,
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
        mainImg: imgs[0],
        imgs,
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
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAddress = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.id;

    const address = await prisma.address.findFirst({
      where: {
        userId,
      },
    });
    res.status(201).json({
      address,
    });
  } catch (e) {
    console.log(e);
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
      include: {
        sellerInfo: {
          select: {
            firstName: true,
            email: true,
            lastName: true,
            imageUrl: true,
          },
        },
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

export const editOrderStatus = async (req: Request, res: Response) => {
  try {
    const isSafe = orderStatus.safeParse(req.body);
    console.log(req.body);
    if (!isSafe.success) {
      console.log(isSafe.error.errors);
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const { status } = isSafe.data;

    const { id } = req.params;

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    res.status(201).json({
      message: 'Order Edited Successfully',
      order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const orderProduct = async (req: Request, res: Response) => {
  try {
    const isSafe = OrderSchema.safeParse(req.body);
    console.log(req.body);
    if (!isSafe.success) {
      console.log(isSafe.error.errors);
      return res.status(400).json({ message: isSafe.error.errors[0].message });
    }
    const { buyer, shippingAddress, totalAmount, items } = isSafe.data;

    const order = await prisma.order.create({
      data: {
        buyer,
        totalAmount,
        status: 'ORDERED',
        shippingAddress,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            subTotal: item.subTotal,
          })),
        },
      },
    });

    res.status(201).json({
      message: 'Order Placed Successfully',
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
        buyerInfo: {
          select: {
            firstName: true,
            lastName: true,
            imageUrl: true,
            email: true,
          },
        },
        shippingInfo: {
          select: {
            city: true,
            country: true,
            phoneNumber: true,
            pincode: true,
            streetName: true,
            state: true,
          },
        },
        items: {
          select: {
            product: {
              select: {
                mainImg: true,
                name: true,
                subCategory: true,
              },
            },
            quantity: true,
            size: true,
            subTotal: true,
          },
        },
      },
    });
    res.status(201).json({
      message: 'All Order',
      length: orders.length,
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

export const filterProducts = async (req: Request, res: Response) => {
  try {
    const { genders, sizes, category } = req.query;

    const filters: any = {};

    if (genders) {
      filters.category = { in: (genders as string).split(',') }; // Gender filter
    }

    if (sizes) {
      filters.sizes = { hasSome: (sizes as string).split(',') }; // Size filter
    }

    if (category) {
      filters.subCategory = { in: (category as string).split(',') };
    }

    const products = await prisma.productDetail.findMany({
      where: filters,
    });

    res.status(200).json({
      message: 'Filtered Products Retrieved',
      length: products.length,
      products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
