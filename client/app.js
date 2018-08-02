import React from 'react';
import { Navigation } from './components';
import Routes from './routes';

const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Routes />
    </React.Fragment>
  );
};

export default App;
