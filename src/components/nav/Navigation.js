import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const activeStyle = {
    borderLeft: 'solid 2px cornflowerblue'
  };

  return (
    <nav className="app-nav">
      <NavLink activeStyle={activeStyle} to="/" exact>
        Forecast
      </NavLink>
      <NavLink activeStyle={activeStyle} to="/about">
        About
      </NavLink>
      <NavLink to="/">Link 1</NavLink>
      <NavLink to="/">Link 2</NavLink>
      <NavLink to="/">Link 3</NavLink>
      <NavLink to="/">Link 4</NavLink>
      <NavLink to="/">Link 5</NavLink>
    </nav>
  );
}

export default Navigation;
