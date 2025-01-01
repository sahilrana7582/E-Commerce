import { Loader, LogOut, Settings, User2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import UserAvatar from './UserAvatar';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'sonner';
import { useLogout } from '../../../features/authApi/useLogout';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';
interface ProfileModalProp {
  children: React.ReactNode;
  firstName: string;
  email: string;
  imageUrl: string;
}
const ProfileModal = ({ children, firstName, imageUrl }: ProfileModalProp) => {
  const { logout, isPending } = useLogout();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      logout();
      setUser(null);
    } catch (e) {
      console.log(e);
      toast.error('Something Went Wrong!');
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-[200px] px-1 py-2">
        <DropdownMenuGroup>
          <div className="flex items-center">
            <UserAvatar firstName={firstName} imageUrl={imageUrl} />
            <small className="text-sm font-medium leading-none ml-4">
              {firstName}
            </small>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User2 className="min-w-5 min-h-5 " />
          <small className="text-sm font-medium text-accent-foreground ml-4">
            Profile
          </small>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer " onClick={handleLogout}>
          <LogOut className="min-w-5 min-h-5 " />
          {isPending ? (
            <Loader className="min-w-4 min-h-4 animate-spin" />
          ) : (
            <small className="text-sm font-medium text-accent-foreground ml-4">
              Logout
            </small>
          )}
        </DropdownMenuItem>
        {user?.role === 'ADMIN' && (
          <DropdownMenuItem className="cursor-pointer ">
            <Link to="/admin">
              <Button className="bg-blue-500 hover:bg-blue-600 w-full flex items-center rounded-[5px] text-white">
                <Settings className="min-w-5 min-h-5 " />
                {isPending ? (
                  <Loader className="min-w-4 min-h-4 animate-spin" />
                ) : (
                  <small className="text-sm font-medium text-accent-foreground ml-4">
                    Dasboard
                  </small>
                )}
              </Button>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileModal;
