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
      <div className="grid grid-cols-5 gap-4">
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {data.map((product) => (
              <ProductCard product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
