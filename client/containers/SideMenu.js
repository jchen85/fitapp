import React, { Component } from 'react';
import '../styles/sidemenu.scss';

module.exports = class Root extends Component {
  render() {
    return (
      <div id="cont">
      <div id="menu-fixed">
        <div className="notes"><p>Expand the menu!</p></div>
        <a href="#cont">
          <i className="material-icons back">&#xE314;</i>
        </a>
        <a href="#menu-fixed">
          <div className="logo">
            <span></span>
            <p>TITLE</p>
          </div>
          <p className="pmenu">MENU</p>
        </a>
        <hr />
        <ul className="menu">
          <li><i className="material-icons">&#xE88A;</i><p>Home</p></li>
          <li><i className="material-icons">&#xE87A;</i><p>Explore</p></li>
          <li><i className="material-icons">&#xE8CC;</i><p>Shop</p></li>
          <li><i className="material-icons">&#xE8B8;</i><p>Settings</p></li>
          <li><i className="material-icons">&#xE8B6;</i><p>Search</p></li>
        </ul>
        <i className="material-icons info">&#xE88E;</i>
      </div>
      </div>
    );
  }
};
