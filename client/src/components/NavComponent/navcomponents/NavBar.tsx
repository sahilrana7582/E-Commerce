import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import { navlinks } from '../../../utils/navlinks';
import AccountComp from '../AccountComponents/AccountComp';

const NavBar = () => {
  return (
    <div className="w-full flex justify-between items-center ">
      <Link to="/">
        <div className="cursor-pointer">
          <img src="logo.svg" className="w-36 h-20"></img>
        </div>
      </Link>
      <div>
        <NavLinks navlinks={navlinks} />
      </div>
      <div>
        <AccountComp />
      </div>
    </div>
  );
};

export default NavBar;
