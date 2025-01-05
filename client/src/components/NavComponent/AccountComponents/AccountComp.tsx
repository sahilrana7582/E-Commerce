import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '../../ui/button';
import { LoginModal } from '../../providers/modals/LoginModa';
import useAuth from '../../../hooks/useAuth';
import ProfileModal from '../../providers/modals/profileModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

const AccountComp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const count: number = cartItems.length;

  return (
    <div className="w-full flex justify-evenly items-center">
      <Button size="icon" className="mr-2">
        <Search className="min-w-6 min-h-6" />
      </Button>

      {user == null ? (
        <LoginModal>
          <Button className="" variant="destructive">
            Login
          </Button>
        </LoginModal>
      ) : (
        <ProfileModal
          firstName={user.firstName}
          email={user.email}
          imageUrl={user.imageUrl}
        >
          <Button size="icon" className="mr-2">
            <User className="min-w-6 min-h-6" />
          </Button>
        </ProfileModal>
      )}
      <Button
        size="icon"
        className="relative"
        onClick={() => navigate('/cart')}
      >
        <ShoppingCart className="min-w-6 min-h-6 z-10" />
        {count !== 0 && (
          <div className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full border-2 border-white shadow-md">
            {count > 10 ? '10+' : count}
          </div>
        )}
      </Button>
    </div>
  );
};

export default AccountComp;
