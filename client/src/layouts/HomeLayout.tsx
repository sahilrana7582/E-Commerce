import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavComponent/navcomponents/NavBar';
const HomeLayout = () => {
  return (
    <>
      <div className="px-36 pb-20">
        <NavBar />
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HomeLayout;
