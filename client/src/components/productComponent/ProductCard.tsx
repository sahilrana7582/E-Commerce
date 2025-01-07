import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Card, CardContent } from '../ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="w-[320px] h-[450px] overflow-hidden hover:scale-105 transition duration-300 ">
        <CardContent className="p-2 flex flex-col h-full justify-between">
          <img
            src={product.mainImg}
            alt={product.name}
            className="w-full h-[350px] object-cover rounded-t-[10px]"
          />

          <h1 className="text-sm mt-2 font-semibold font-lato text-center truncate">
            {product.name}
          </h1>

          <p className="text-sm font-medium text-gray-800 text-center">
            ${product.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
