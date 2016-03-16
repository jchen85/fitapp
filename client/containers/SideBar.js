import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/sidebar.scss';
import { browserHistory } from 'react-router'

export default class SideBar extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="sidebar">
        <div className="sidebar__user__container">
          <div className="sidebar__image">
            <img src={user.avatar} />
          </div>
          <div className="sidebar__name">
            {user.name}, {user.age}
          </div>
          <div className="sidebar__team__info">
            Team: {user.team}
          </div>
          Inventory
          <div className="sidebar__carrots">
            {user.points} <div className="carrot" />
          </div>
        </div>
        <div className="sidebar__nav">
          <Link to="/">
            <div className="sidebar__link">
              <img src="../static/icons/clock.png" />Challenges
            </div>
          </Link>
          <Link to="/store">
            <div className="sidebar__link">
              <img src="../static/icons/cart.png" />Store
            </div>
          </Link>
          <Link to="/leaderboard">
            <div className="sidebar__link">
              <img src="../static/icons/trophy.png" />Leaderboard
            </div>
          </Link>
          <Link to="/help">
            <div className="sidebar__link">
              <img src="../static/icons/help.png" />Help
            </div>
          </Link>
          <a href="/logout">
            <div className="sidebar__link">
              <img src="../static/icons/exit.png" />Logout
            </div>
          </a>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object.isRequired
};
