import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useLoadUser = () => {
  const { data, error, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/user/load`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await resp.json();
      return userData.user;
    },
  });

  return {
    data,
    error,
    isError,
  };
};

export const useSignIn = () => {
  const {
    data,
    mutate: singin,
    error,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const resp = await fetch(`${baseUrl}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await resp.json();
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(`Welcome Back`);
    },
  });

  return { data, singin, isPending, error, isSuccess, isError };
};
