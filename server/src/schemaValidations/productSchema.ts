import { string, z } from 'zod';
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
    .array(z.enum(['S', 'M', 'L', 'XL', 'XXL']))
    .min(1, { message: 'At least one size must be selected' }),

  seller: z.string().min(1, { message: 'Seller ID is required' }),
  bestSeller: z.boolean().optional(),
  imgs: z.array(z.string()),
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

const StatusEnum = z.enum(['ORDERED', 'SHIPPED', 'DELIVERED', 'CANCELLED']);

const SizeEnum = z.enum(['S', 'M', 'L', 'XL', 'XXL']);

export const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1),
  size: SizeEnum,
  subTotal: z.number().min(0),
});

export const OrderSchema = z.object({
  buyer: z.string().uuid(),
  totalAmount: z.number().min(0),
  status: StatusEnum.default('ORDERED'),
  shippingAddress: z.string().uuid(),
  items: z.array(OrderItemSchema),
});
