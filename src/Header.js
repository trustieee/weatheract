import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ForecastController from './ForecastController';

function Header() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <Route path="/" exact component={ForecastController} />
      </div>
    </Router>
  );
}

export default Header;
