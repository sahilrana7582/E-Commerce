import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useLogout = () => {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      const resp = await fetch(`${baseUrl}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error('Failed to Logout');
      }
    },
    onSuccess: () => {
      toast.success('Logged Out');
    },
  });

  return { logout, isPending };
};
