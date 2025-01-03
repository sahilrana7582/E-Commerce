import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-full h-full hover:transform hover:scale-105 transition-transform cursor-pointer">
      <img
        src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTiQWpzXLKIH5MqFJjaITu8lobHRN718OaoA-RUt_Do57Risz1_aUl2LgL8Adv56Zyl4oW7Yf774tQNlQe8wSRkCUwwnzGqmwQWuMZkq8OZDI2cFPZ1fPKS0A&usqp=CAE"
        className="rounded-t-[10px] w-full h-[300px] object-cover"
      />
      <div>
        <h1 className="text-base font-lato font-medium">{product.name}</h1>
        <p className="text-sm">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
