import React, { Component, PropTypes } from 'react';
import '../styles/user.scss';
import moment from 'moment';
import '@gigwalk/livestamp';

export default class UserInfo extends Component {
  render() {
    const { user, actions } = this.props;

    const carrot = <div className="user__carrot" />;

    return (
      <div className="user">
        <div className="user__statement__container">
          Hi, {user.name}. Today is &nbsp;{moment().format('dddd, MMMM Do YYYY')}. You have until midnight to complete challenges for today!
          <div className="user__achievements__container">
            Progress to next achievement:
          </div>
        </div>
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
