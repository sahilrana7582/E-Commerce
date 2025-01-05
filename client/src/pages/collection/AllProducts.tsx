import { Loader } from 'lucide-react';
import ProductCard from '../../components/productComponent/ProductCard';
import { useCollection } from '../../features/productApi/useCollection';

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
      <div className="flex flex-wrap gap-4">
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {data.map((product) => (
              <div key={product.id} className="flex justify-center">
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
