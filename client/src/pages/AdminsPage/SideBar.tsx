import { BaggageClaim, ListCheck, PlusCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="my-10 flex flex-col gap-5">
      <NavLink
        to="add"
        className={({ isActive }) =>
          isActive
            ? 'text-blue-500 bg-gray-200 font-bold transition duration-300 rounded-[5px]'
            : 'text-gray-500'
        }
      >
        <div className="border p-4 rounded-l-[5px] flex justify-center gap-5 items-center cursor-pointer">
          <PlusCircle />
          <h1 className="font-montserrat font-medium"> New Item</h1>
        </div>
      </NavLink>

      <NavLink
        to="list"
        className={({ isActive }) =>
          isActive
            ? 'text-blue-500 bg-gray-200 font-bold transition duration-300 rounded-[5px]'
            : 'text-gray-500'
        }
      >
        <div className="border p-4 rounded-l-[5px] flex justify-center gap-5 items-center cursor-pointer">
          <ListCheck />
          <h1 className="font-montserrat font-medium">List Items</h1>
        </div>
      </NavLink>
      <NavLink
        to="orders"
        className={({ isActive }) =>
          isActive
            ? 'text-blue-500 bg-gray-200 font-bold transition duration-300 rounded-[5px]'
            : 'text-gray-500'
        }
      >
        <div className="border p-4 rounded-l-[5px] flex justify-center gap-5 items-center cursor-pointer">
          <BaggageClaim />
          <h1 className="font-montserrat font-medium">All Orders</h1>
        </div>
      </NavLink>
    </div>
  );
};

export default SideBar;
