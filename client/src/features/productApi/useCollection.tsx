import { useQuery } from '@tanstack/react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface Props {
  queries: {
    genders: string[];
    sizes: string[];
    category: string[];
  };
}

export const useCollection = ({ queries }: Props) => {
  const queryParams = new URLSearchParams();

  Object.entries(queries).forEach(([key, value]) => {
    if (value.length > 0) {
      queryParams.append(key, value.join(','));
    }
  });

  console.log(queryParams.toString());
  const { data, isError, isLoading } = useQuery({
    queryKey: ['AllCollection', queryParams.toString()],
    queryFn: async () => {
      const url = queryParams.toString()
        ? `${baseUrl}/product/collection?${queryParams.toString()}`
        : `${baseUrl}/product/collection`;
      const resp = await fetch(url, { method: 'GET', credentials: 'include' });

      if (!resp.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await resp.json();
      return data.products;
    },
    enabled: true,
  });

  return { data, isError, isLoading };
};
