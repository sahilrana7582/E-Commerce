import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Card, CardContent } from '../ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="w-[350px] h-[500px] overflow-hidden">
        <CardContent className="p-2 flex flex-col h-full justify-between">
          <img
            src={product.mainImg}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-t-[10px]"
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
