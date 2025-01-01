import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const Admin = () => {
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <div className=" h-full border-r-2 border-black">
        <SideBar />
      </div>
      <div className="h-full p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
