import { useQuery } from '@tanstack/react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductInfo = (id: string) => {
  const {
    data: productInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['activeList'],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/product/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to add product');
      }

      const data = await resp.json();

      return data.product;
    },
  });

  return {
    productInfo,
    isError,
    isLoading,
  };
};
