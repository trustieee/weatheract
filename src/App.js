import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ForecastController from './components/forecast/ForecastController';
import Navigation from './components/nav/Navigation';
import AboutPage from './components/about/AboutPage';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundPage from './components/common/NotFoundPage';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Router>
        <div className="app-body">
          <Navigation />
          <div className="app-main">
            <Switch>
              <Route path="/" exact component={ForecastController} />
              <Route path="/about" component={AboutPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
