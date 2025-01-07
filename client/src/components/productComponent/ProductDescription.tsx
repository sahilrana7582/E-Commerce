import { Product } from '../../types';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import ToolTip from '../providers/extraProviders/ToolTip';
import { useDispatch } from 'react-redux';

import { addItem } from '../../store/cartSlice';
import { useState } from 'react';
import { toast } from 'sonner';

type ProductInfo = Product;

interface ProductProps {
  productInfo: ProductInfo;
}

const ProductDescription = ({ productInfo }: ProductProps) => {
  const dispatch = useDispatch();
  const [sizeSelected, setSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | ''>(
    ''
  );

  const handleAddToCart = () => {
    if (sizeSelected !== '') {
      dispatch(addItem({ ...productInfo, sizes: sizeSelected, quantity: 1 }));
      toast.success('Product Added');
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-2">
        <h2 className="scroll-m-20  font-lato text-3xl font-semibold tracking-tight first:mt-0">
          {productInfo?.name}
        </h2>
        <h4 className="scroll-m-20 text-xl font-medium font-lato tracking-tight ">
          ${productInfo?.price}
        </h4>
      </div>

      <div className=" ">
        <Tabs defaultValue="des" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-[5px] space-x-2">
            <TabsTrigger
              value="des"
              className="bg-black text-white rounded-[5px] border border-black"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="seller"
              className="bg-black text-white rounded-[5px] border border-black"
            >
              Seller
            </TabsTrigger>
          </TabsList>
          <TabsContent value="des">
            <Card className="pb-6 rounded-[5px]">
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[300px] overflow-auto">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {productInfo.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="seller">
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
                <CardDescription>This is our authorized seller</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-4">
                  <div></div>
                  <div></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <small className="text-sm font-medium leading-none">Select Size</small>
        <div className="flex  gap-4">
          {productInfo?.sizes.map((size) => (
            <ToolTip align="center" label={size} side="top" key={size}>
              <div
                className={`flex justify-center items-center p-4 rounded-[5px] cursor-pointer ${
                  size === sizeSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
                onClick={() => setSize(size)}
              >
                <small>{size}</small>
              </div>
            </ToolTip>
          ))}
        </div>
      </div>
      <Button
        className="bg-black/90 text-white hover:bg-black rounded-[5px]"
        onClick={handleAddToCart}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductDescription;
