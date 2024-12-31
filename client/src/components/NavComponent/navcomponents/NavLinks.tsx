import { NavLink } from 'react-router-dom';

interface NavArray {
  name: string;
  path: string;
}

interface NavLinksProps {
  navlinks: NavArray[];
}

const NavLinks = ({ navlinks }: NavLinksProps) => {
  return (
    <nav className="flex">
      <ul className="flex  space-x-8 items-center">
        {navlinks.map((link) => (
          <NavLink
            key={link.name}
            className={({ isActive }) =>
              isActive
                ? 'text-black underline transition-all duration-500'
                : ' text-zinc-500'
            }
            to={link.path}
          >
            {link.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
