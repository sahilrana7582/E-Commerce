import { useBestSeller } from '../../features/productApi/useAlllProducts';
import { Caroudal } from '../OverallComponents/Carousal';
import ProductSection from './BestSeller';

const Home = () => {
  const { allProducts, isLoading } = useBestSeller();
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Caroudal />
      <ProductSection
        type={'Latest Products'}
        products={allProducts}
        isLoading={isLoading}
      />

      <ProductSection
        type={'Best Sellers'}
        products={allProducts}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
