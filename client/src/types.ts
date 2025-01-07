export type AuthFlow = 'signIn' | 'signUp';

export type ProductType = {
  name: string;
  description: string;
  category: 'Male' | 'Female';
  subCategory: 'TopWear' | 'BottomWear';
  price: number;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  seller: string;
  imgs: string[];
};

export type ProductList = {
  id: string;
  name: string;
  category: 'Male' | 'Female';
  mainImg: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'Male' | 'Female';
  subCategory: 'TopWear' | 'BottomWear';
  price: number;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  seller: string;
  bestSeller: boolean;
  mainImg: string;
};

export type CartProduct = {
  id: string;
  name: string;
  category: 'Male' | 'Female';
  subCategory: 'TopWear' | 'BottomWear';
  price: number;
  sizes: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  seller: string;
  mainImg: string;
  quantity: number;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  subTotal: number;
};

export type Order = {
  buyer: string;
  totalAmount: number;
  status: 'ORDERED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  items: OrderItem[];
};

export type AddressType = {
  id: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phoneNumber: string;
};

export type BuyerInfo = {
  firstName: string;
  lastName: string;
  mainImg: string | null;
  email: string;
};

export type orderResp = {
  product: {
    mainImg: string; // URL to the product image
    name: string; // Product name
    subCategory: string; // Subcategory of the product (e.g., TopWear)
  };
  quantity: number; // Quantity of the product in the order
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL'; // Size of the product
  subTotal: string; // Subtotal cost for this item (as a string)
};

export type orderReceived = {
  id: string; // Unique identifier for the order
  buyer: string; // ID of the buyer
  totalAmount: string; // Total amount for the order (as a string)
  status: 'ORDERED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'; // Status of the order
  shippingAddress: string; // ID of the shipping address
  createdAt: string; // Creation timestamp of the order
  updatedAt: string; // Last update timestamp of the order
  buyerInfo: BuyerInfo; // Information about the buyer
  shippingInfo: AddressType; // Shipping address details
  items: orderResp[];
};

export type OrdersResponse = orderReceived[];
