import { createContext, useState, useEffect } from 'react';
import { useLoadUser } from '../../../features/authApi/useSign';

type User = {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  id: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error('setUser function must be overridden by a Provider');
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useLoadUser();

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
