import { useContext } from 'react';
import { AuthContext } from '../components/providers/authProvider/LoginProvider';

const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
