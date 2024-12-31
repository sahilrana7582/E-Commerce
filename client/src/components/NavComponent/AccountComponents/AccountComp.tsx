import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '../../ui/button';
import { LoginModal } from '../../providers/modals/LoginModa';
import useAuth from '../../../hooks/useAuth';
import ProfileModal from '../../providers/modals/profileModal';

const AccountComp = () => {
  const { user } = useAuth();

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
      <Button size="icon" className="mr-2">
        <ShoppingCart className="min-w-6 min-h-6" />
      </Button>
    </div>
  );
};

export default AccountComp;
