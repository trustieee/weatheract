import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="app-nav">
      <Link to="/">Forecast</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navigation;
