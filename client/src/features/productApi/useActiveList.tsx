import { useQuery } from '@tanstack/react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useActiveList = () => {
  const {
    data: productList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['activeList'],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/product/`, {
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
    productList,
    isError,
    isLoading,
  };
};
