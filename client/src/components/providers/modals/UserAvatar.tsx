import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const UserAvatar = ({
  imageUrl,
  firstName,
}: {
  imageUrl: string;
  firstName: string;
}) => {
  return (
    <Avatar>
      <AvatarImage
        src={imageUrl || 'https://github.com/shadcn.png'}
        alt="@shadcn"
      />
      <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
