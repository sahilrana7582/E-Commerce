import { useParams } from 'react-router-dom';
import ProductImages from './ProductImages';
import { useEffect, useState } from 'react';
import { useProductInfo } from '../../features/productApi/useProductInfo';
import ProductDescription from './ProductDescription';
import ProductSection from '../HomeComponents/BestSeller';
import { useBestSeller } from '../../features/productApi/useAlllProducts';
import { Loader } from 'lucide-react';

const ProductInfo = () => {
  const param = useParams();
  const { isLoading, productInfo } = useProductInfo(param.id || '');
  const { allProducts, isLoading: bestSellerLoad } = useBestSeller();
  const [imgSrc, setImg] = useState('');

  useEffect(() => {
    if (productInfo) {
      setImg(productInfo.mainImg || '');
    }
  }, [productInfo]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="w-[50px] h-[50px] animate-spin text-center" />
      </div>
    );
  }

  if (!productInfo) {
    return <div>No product data available.</div>;
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <div className="max-h-[700px] w-44">
          <ProductImages setImg={setImg} imgs={productInfo.imgs} />
        </div>
        <div className="flex-1 max-h-[700px]">
          <img
            src={
              imgSrc ||
              'https://images.t2online.in/cdn-cgi/image/width=1280,quality=70/https://apis.t2online.in/image/journal/article.jpg?img_id=1161448&t=1727718142659'
            }
            className="object-center w-full h-full rounded-[5px]"
            alt="Product"
          />
        </div>
        <div className="flex-1">
          <ProductDescription productInfo={productInfo} />
        </div>
      </div>

      <div>
        <ProductSection
          type="Best Sellers"
          products={allProducts}
          isLoading={bestSellerLoad}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
