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
          <div className="sidebar__link">
            <Link to="/">
              <img src="../static/icons/clock.png" />Challenges
            </Link>
          </div>
          <div className="sidebar__link">
            <Link to="/store">
              <img src="../static/icons/cart.png" />Store
            </Link>
          </div>
          <div className="sidebar__link">
            <Link to="/leaderboard">
              <img src="../static/icons/trophy.png" />Leaderboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object.isRequired
};
