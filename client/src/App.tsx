import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/HomeComponents/Home';
import Admin from './pages/AdminsPage/Admin';
import NewItem from './pages/AdminsPage/NewItems';
import { ListTable } from './pages/AdminsPage/ListTable';
import Collection from './pages/collection/Collection';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/collection',
        element: <Collection />,
      },
      {
        path: '/about',
        element: <div>This is Home</div>,
      },
      {
        path: '/contact',
        element: <div>This is Home</div>,
      },
      {
        path: '/admin',
        element: <Admin />,
        children: [
          {
            path: 'add',
            element: <NewItem />,
          },
          {
            path: 'list',
            element: <ListTable />,
          },
          {
            path: 'orders',
            element: <div>Orders</div>,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
