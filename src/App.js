import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ForecastController from './ForecastController';

const App = () => {
  return (
    <div>
      <Header />
      <ForecastController />
      <Footer />
    </div>
  );
};

export default App;
