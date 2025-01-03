import { Loader } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../productComponent/ProductCard';

interface ProductSectionProps {
  products: Product[];
  type: string;
  isLoading: boolean;
}

const ProductSection = ({ products, type, isLoading }: ProductSectionProps) => {
  console.log(products);
  return (
    <div className="w-full ">
      <div className="space-y-6">
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center font-montserrat">
              {type}
            </h1>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3 grid-rows-2">
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
