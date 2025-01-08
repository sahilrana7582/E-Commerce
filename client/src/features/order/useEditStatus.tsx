import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StatusPram } from '../../types';
import { toast } from 'sonner';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useEditOrder = () => {
  const queryClient = useQueryClient();
  const {
    mutate: editOrder,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ id, status }: StatusPram) => {
      const resp = await fetch(`${baseUrl}/product/order/${id}/status`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!resp.ok) {
        throw new Error('Failed to add product');
      }

      const data = await resp.json();

      return data.order;
    },
    onSuccess: (data) => {
      toast.success('Order Edited Successfully');
      queryClient.setQueryData(['All Orders'], (oldData) => {
        return oldData.map((order) =>
          order.id === data.id ? { ...order, status: data.status } : order
        );
      });
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  return {
    editOrder,
    isError,
    isPending,
    isSuccess,
  };
};
