import React, { Component, PropTypes } from 'react';
import '../styles/challenge.scss';
import '../styles/user.scss';
import moment from 'moment';

export default class UserInfo extends Component {
  render() {
    const { user, actions } = this.props;

    const carrot = <div className="user__carrot" />;

    return (
      <div className="user">
        <div className="user__date">
          {moment().format('dddd, MMMM Do YYYY')}
        </div>
        {user.name}
        <div className="user__carrot__container">
          {user.points} {carrot}
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
