import { Loader } from 'lucide-react';
import ProductCard from '../../components/productComponent/ProductCard';
import { useCollection } from '../../features/productApi/useCollection';
import { Product } from '../../types';

type Filter = {
  genders: string[];
  sizes: string[];
  category: string[];
};

interface AllProductsProp {
  filter: Filter;
}

const AllProducts = ({ filter }: AllProductsProp) => {
  const { data, isLoading } = useCollection({ queries: filter });
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-lato font-medium text-lg">All Category</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 h-screen overflow-auto">
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {data.map((product: Product) => (
              <div key={product.id} className="flex justify-center ">
                <ProductCard product={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
