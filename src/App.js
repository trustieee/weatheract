import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ForecastController from './components/forecast/ForecastController';
import Navigation from './components/nav/Navigation';
import AboutPage from './components/about/AboutPage';
import NotFoundPage from './components/common/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <div id="app-body">
          <Navigation />
          <main className="app-main">
            <Switch>
              <Route path="/" exact component={ForecastController} />
              <Route path="/about" component={AboutPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </Router>
      <Footer />
    </>
  );
};

export default App;
