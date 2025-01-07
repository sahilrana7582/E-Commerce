import { useMutation } from '@tanstack/react-query';
import { Order } from '../../types';
import { toast } from 'sonner';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useNewOrder = () => {
  const {
    mutate: orderProduct,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (OrderItem: Order) => {
      const resp = await fetch(`${baseUrl}/product/order`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(OrderItem),
      });

      if (!resp.ok) {
        throw new Error('Failed to add product');
      }

      const data = await resp.json();

      return data.message;
    },
    onSuccess: () => {
      toast.success('Order Placed Successfully');
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  return {
    orderProduct,
    isError,
    isPending,
    isSuccess,
  };
};
