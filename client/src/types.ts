export type AuthFlow = 'signIn' | 'signUp';

export type ProductType = {
  name: string;
  description: string;
  category: 'Male' | 'Female';
  subCategory: 'TopWear' | 'BottomWear';
  price: number;
  sizes: ('SMALL' | 'MEDIUM' | 'LARGE' | 'XL' | 'XXL')[];
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
  sizes: ('SMALL' | 'MEDIUM' | 'LARGE' | 'XL' | 'XXL')[];
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
  sizes: 'SMALL' | 'MEDIUM' | 'LARGE' | 'XL' | 'XXL';
  seller: string;
  mainImg: string;
  quantity: number;
};
