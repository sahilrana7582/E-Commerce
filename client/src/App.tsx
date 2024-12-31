import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/HomeComponents/Home';

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
        element: <div>This is Home</div>,
      },
      {
        path: '/about',
        element: <div>This is Home</div>,
      },
      {
        path: '/contact',
        element: <div>This is Home</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
