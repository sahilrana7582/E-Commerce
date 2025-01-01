import { z } from 'zod';
import { User, ProductDetail, Order } from '@prisma/client';

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name is required and must be at least 2 characters' }),

  description: z.string().min(2, {
    message: 'Description is required and must be at least 2 characters',
  }),

  category: z.enum(['Male', 'Female']),

  subCategory: z.enum(['TopWear', 'BottomWear']),

  price: z.number().min(0.1, { message: 'Price must be a positive number' }),

  sizes: z
    .array(z.enum(['SMALL', 'MEDIUM', 'LARGE', 'XL', 'XXL']))
    .min(1, { message: 'At least one size must be selected' }),

  seller: z.string().min(1, { message: 'Seller ID is required' }),
  bestSeller: z.boolean(),
});

export type ProductType = z.infer<typeof productSchema>;

export const AddressType = z.object({
  streetName: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
  phoneNumber: z.string(),
});

export const orderSchema = z.object({
  buyer: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  totalAmount: z.number().positive(),
  shippingAddress: z.string(),
});
