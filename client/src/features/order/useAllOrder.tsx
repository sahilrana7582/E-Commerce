import { useQuery } from '@tanstack/react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAllOrder = () => {
  const {
    data: allOrders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['All Orders'],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/product/order`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to add product');
      }

      const data = await resp.json();

      return data.orders;
    },
  });

  return {
    allOrders,
    isError,
    isLoading,
  };
};
