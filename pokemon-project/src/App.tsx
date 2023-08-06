import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Router from './Router';

const App = () => {
  const queryClient = new QueryClient();

  const loader = document.querySelector('.loader-container');

  useEffect(() => {
    const hideLoader = () => loader?.classList.add('loader--hide');

    hideLoader();
  }, [loader?.classList]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
