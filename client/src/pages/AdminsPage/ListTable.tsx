import { Loader, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { useActiveList } from '../../features/productApi/useActiveList';
import { ProductList } from '../../types';
import UserAvatar from '../../components/providers/modals/UserAvatar';
import { Avatar, AvatarImage } from '../../components/ui/avatar';

export function ListTable() {
  const { isLoading, productList } = useActiveList();
  return (
    <div className="relative max-h-screen overflow-hidden border ">
      <Table className="table-auto w-full">
        <TableCaption>A list of your active products.</TableCaption>
        <TableHeader className="sticky top-0 bg-gray-200 z-10 border">
          <TableRow>
            <TableHead className="w-[150px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="max-h-screen overflow-y-auto">
        <Table className="table-auto w-full mb-4">
          <TableBody>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <>
                {productList.map((product: ProductList) => (
                  <TableRow key={product.id}>
                    <TableCell className="items-start">
                      <img
                        src="https://github.com/shadcn.png"
                        className="w-12 h-12 rounded-[10px]"
                      />
                    </TableCell>

                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      {product.price}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button>
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
