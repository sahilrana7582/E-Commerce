import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ProductType } from '../../types';

const baseUrl = import.meta.env.VITE_BASE_URL;
interface Props {
  setImgs: React.Dispatch<React.SetStateAction<string[]>>;
  reset: () => void;
}

export const useAddProduct = ({ reset, setImgs }: Props) => {
  const {
    mutate: addProduct,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (product: ProductType) => {
      const resp = await fetch(`${baseUrl}/product/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!resp.ok) {
        throw new Error('Failed to add product');
      }

      return resp.json();
    },
    onSuccess: () => {
      toast.success('Product added successfully');
      reset();
      setImgs([]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(`Error: ${(err as Error).message}`);
    },
  });

  return {
    addProduct,
    isError,
    isPending,
    error,
  };
};
