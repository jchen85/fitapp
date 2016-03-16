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
          <h3>Hi, {user.name}. Today you'll be playing for {user.team} Team.</h3> 
          You have until midnight to complete challenges for&nbsp;{moment().format('dddd, MMMM Do YYYY')}. At midnight, all carrots are reset to 1000 and everyone is randomly placed on a new team. You only keep your powerups, so spend your carrots wisely!
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
