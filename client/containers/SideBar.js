import React, { Component, PropTypes } from 'react';
import '../styles/sidebar.scss';

export default class SideBar extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="sidebar">
        <div className="sidebar__image">
          <img src={user.avatar} />
        </div>
        {user.name}, {user.age}
      </div>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object.isRequired
};
