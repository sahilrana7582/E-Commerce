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
