export type AuthFlow = 'signIn' | 'signUp';

export type ProductType = {
  name: string;
  description: string;
  category: 'Male' | 'Female';
  subCategory: 'TopWear' | 'BottomWear';
  price: number;
  sizes: ('SMALL' | 'MEDIUM' | 'LARGE' | 'XL' | 'XXL')[];
  seller: string;
};

export type ProductList = {
  id: string;
  name: string;
  category: 'Male' | 'Female';
  imageUrl: string;
  price: number;
};

export type Product = {
  name: string;
  description: string;
  category: 'Male' | 'Female';
  subCategory: 'TopWear' | 'BottomWear';
  price: number;
  sizes: ('SMALL' | 'MEDIUM' | 'LARGE' | 'XL' | 'XXL')[];
  seller: string;
  bestSeller: boolean;
};
