import { useQuery } from '@tanstack/react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAddress = () => {
  const {
    data: addressInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['Address'],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/address/`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to add product');
      }

      const data = await resp.json();

      return data.address;
    },
  });

  return {
    addressInfo,
    isError,
    isLoading,
  };
};
