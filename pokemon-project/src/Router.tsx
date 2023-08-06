import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PokemonList from './pages/PokemonList';
import PokemonDetails from './pages/PokemonDetails';
import NotFound from './pages/NotFound';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PokemonList />,
    },
    {
      path: '/pokedex/:keyword',
      element: <PokemonDetails />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
