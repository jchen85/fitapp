import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/sidebar.scss';
import { browserHistory } from 'react-router'

export default class SideBar extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="sidebar">
        <div className="sidebar__image">
          <img src={user.avatar} />
        </div>
        {user.name}, {user.age}
        <div className="sidebar__team__info">
          Team: {user.team}
        </div>
        <ul role="nav">
          <li><Link to="/">Challenges</Link></li>
          <li><Link to="/store">Store</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
      </div>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object.isRequired
};
