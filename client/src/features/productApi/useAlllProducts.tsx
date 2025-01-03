import { useQuery } from '@tanstack/react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useBestSeller = () => {
  const {
    data: allProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['bestSellers'],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/product/bestSellers`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to add product');
      }

      const data = await resp.json();

      return data.products;
    },
  });

  return {
    allProducts,
    isError,
    isLoading,
  };
};
