import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/HomeComponents/Home';
import Admin from './pages/AdminsPage/Admin';
import NewItem from './pages/AdminsPage/NewItems';
import { ListTable } from './pages/AdminsPage/ListTable';
import Collection from './pages/collection/Collection';
import ProductInfo from './components/productComponent/ProductInfo';
import Cart from './pages/cartPage/cart';
import Orders from './pages/AdminsPage/Orders';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/product/:id',
        element: <ProductInfo />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
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
            element: <Orders />,
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
