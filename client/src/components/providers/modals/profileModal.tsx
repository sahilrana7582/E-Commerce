import { LogOut, User2 } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import UserAvatar from './UserAvatar';
interface ProfileModalProp {
  children: React.ReactNode;
  firstName: string;
  email: string;
  imageUrl: string;
}
const ProfileModal = ({
  children,
  firstName,
  email,
  imageUrl,
}: ProfileModalProp) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-[200px]">
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
        <DropdownMenuItem className="cursor-pointer ">
          <LogOut className="min-w-5 min-h-5 " />
          <small className="text-sm font-medium text-accent-foreground ml-4">
            Logout
          </small>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileModal;
